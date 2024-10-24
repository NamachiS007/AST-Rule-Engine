-- Create the database
CREATE DATABASE IF NOT EXISTS rule_engine;

-- Use the rule_engine database
USE rule_engine;

-- Create the rules table
CREATE TABLE IF NOT EXISTS rules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rule_string TEXT NOT NULL,
    ast TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample rules into the rules table
INSERT INTO rules (rule_string, ast, created_at)
VALUES 
(
    '((age > 30 AND department = ''Sales'') OR (age < 25 AND department = ''Marketing'')) AND (salary > 50000 OR experience > 5)', 
    '{"type": "AND", "left": {"type": "OR", "left": {"type": "AND", "left": {"type": "operand", "value": "age > 30"}, "right": {"type": "operand", "value": "department = ''Sales''"}}, "right": {"type": "AND", "left": {"type": "operand", "value": "age < 25"}, "right": {"type": "operand", "value": "department = ''Marketing''"}}}, "right": {"type": "OR", "left": {"type": "operand", "value": "salary > 50000"}, "right": {"type": "operand", "value": "experience > 5"}}}',
    '2024-10-22 10:11:48'
),
(
    '((age > 30 AND department = ''Marketing'')) AND (salary > 20000 OR experience > 5)', 
    '{"type": "AND", "left": {"type": "AND", "left": {"type": "operand", "value": "age > 30"}, "right": {"type": "operand", "value": "department = ''Marketing''"}}, "right": {"type": "OR", "left": {"type": "operand", "value": "salary > 20000"}, "right": {"type": "operand", "value": "experience > 5"}}}',
    '2024-10-22 10:11:48'
);