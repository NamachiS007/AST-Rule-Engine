Here's a `README.md` file and a `requirements.txt` file for your Rule Engine application:

### README.md

```markdown
# Rule Engine with AST

## Objective

The Rule Engine application aims to determine user eligibility based on various attributes such as age, department, income, and experience. It utilizes an Abstract Syntax Tree (AST) to represent conditional rules, enabling dynamic creation, combination, and modification of these rules.

## Project Flow

1. **Frontend**: A simple user interface allows users to input rules and user data. your need to install node modules for the frontend
2. **Backend**: A Flask API handles requests to create rules, combine them, and evaluate the rules against user data. The backend interacts with a MySQL database to store the rules and their AST representations.
3. **Data Storage**: The application utilizes a MySQL database to persist rules and their metadata, allowing for easy retrieval and manipulation.

## Technologies Used

- **Frontend**: React.js for building the user interface.
- **Backend**: Flask as the web framework, with Python for business logic and MySQL for data storage.

## How to Start and Run the Application

### Backend Setup

1. **Install Dependencies**:
   Ensure you have Python installed (version 3.6 or higher). Install the necessary packages by running:
   ```bash
   pip install -r requirements.txt
   ```

2. **Database Setup**:
   - Create a MySQL database named `rule_engine`.
   - Execute the following SQL commands to create the necessary table:
     ```sql
     CREATE TABLE rules (
         id INT AUTO_INCREMENT PRIMARY KEY,
         rule_string TEXT NOT NULL,
         ast JSON NOT NULL,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     ```

3. **Run the Flask Server**:
   - Navigate to the backend directory and run:
     ```bash
     python app.py
     ```
   - The server will start on `http://localhost:5000`.

### Frontend Setup

1. **Install Node.js**:
   Make sure you have Node.js and npm (Node Package Manager) installed.

2. **Navigate to the Frontend Directory**:
   ```bash
   cd frontend
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run the React Application**:
   ```bash
   npm start
   ```
   - The application will run on `http://localhost:3000`.

## API Endpoints

1. **Create Rule**:
   - **Endpoint**: `/create_rule`
   - **Method**: `POST`
   - **Payload**:
     ```json
     {
       "rule": "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)"
     }
     ```

2. **Evaluate Rule**:
   - **Endpoint**: `/evaluate_rule`
   - **Method**: `POST`
   - **Payload**:
     ```json
     {
       "rule_id": 10,
       "data": {
         "age": 24,
         "department": "Sales",
         "salary": 40000,
         "experience": 3
       }
     }
     ```

## Test Cases

- Create individual rules and verify their AST representations.
- Combine rules and ensure the resulting AST reflects the combined logic.
- Test the evaluation of rules against sample user data.

## Bonus Features

- Error handling for invalid rule strings.
- Validations for attribute existence.
- Modification capabilities for existing rules.
- Potential user-defined functions support for advanced conditions.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests.
