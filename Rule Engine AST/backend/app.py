from flask import Flask, request, jsonify 
import mysql.connector

app = Flask(__name__)

# MySQL connection setup
def get_db_connection():
    conn = mysql.connector.connect(
        host='localhost',  # Replace with your DB host
        user='root',       # Replace with your MySQL username
        password='#Proteus@0416',  # Replace with your MySQL password
        database='rule_engine'
    )
    return conn

# API to create rule and store AST in MySQL
@app.route('/create_rule', methods=['POST'])
def create_rule():
    rule_string = request.json.get('rule')
    
    try:
        ast = create_ast(rule_string)  # Generate AST from rule
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO rules (rule_string, ast) VALUES (%s, %s)", (rule_string, str(ast)))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Rule created successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/evaluate_rule', methods=['POST'])
def evaluate_rule():
    data = request.json
    rule_id = data.get('rule_id', 1)  # Get the rule ID from the request
    
    print(f"Received rule_id: {rule_id}")  # Debugging statement

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT ast FROM rules WHERE id=%s", (rule_id,))
    rule_ast = cursor.fetchone()
    
    print(f"Fetched rule_ast: {rule_ast}")  # Debugging statement

    if rule_ast:
        rule_ast = rule_ast[0]
        cursor.close()
        conn.close()
        result = evaluate_ast(rule_ast, data['data'])  # Pass the nested 'data' dictionary for evaluation
        return jsonify({"result": result}), 200
    else:
        cursor.close()
        conn.close()
        return jsonify({"error": "Rule not found"}), 404

def create_ast(rule_string):
    # For now, we will create a simple AST based on the logical operators
    # This is a placeholder; a real implementation would need a proper parser
    if 'AND' in rule_string:
        parts = rule_string.split('AND')
        return {
            "type": "AND",
            "left": create_ast(parts[0].strip()),
            "right": create_ast(' AND '.join(parts[1:]).strip()) if len(parts) > 1 else None
        }
    elif 'OR' in rule_string:
        parts = rule_string.split('OR')
        return {
            "type": "OR",
            "left": create_ast(parts[0].strip()),
            "right": create_ast(' OR '.join(parts[1:]).strip()) if len(parts) > 1 else None
        }
    else:
        # If we reach here, it's a base operand
        return {"type": "operand", "value": rule_string.strip()}

def evaluate_ast(ast, data):
    try:
        if ast['type'] == 'AND':
            left_result = evaluate_ast(ast['left'], data)
            right_result = evaluate_ast(ast['right'], data)
            return left_result and right_result
        elif ast['type'] == 'OR':
            left_result = evaluate_ast(ast['left'], data)
            right_result = evaluate_ast(ast['right'], data)
            return left_result or right_result
        elif ast['type'] == 'operand':
            # Evaluate the simple expressions, like "age > 30"
            expression = ast['value']

            # Replace variable names with corresponding data dictionary values
            for key, value in data.items():
                # Check if the key exists in the expression and replace it
                expression = expression.replace(key, str(value))

            # Now eval can evaluate a direct comparison
            return eval(expression)
    except Exception as e:
        print(f"Evaluation error: {str(e)}")  # For debugging purposes
        return True

if __name__ == '__main__':
    app.run(debug=True, port=5000)