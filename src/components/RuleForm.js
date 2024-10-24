import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RuleForm = () => {
  const [rule, setRule] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);  // Loading state

  const createRule = async (ruleString) => {
    try {
      const response = await axios.post('http://localhost:5000/create_rule', { rule: ruleString });
      return response.data.message;
    } catch (error) {
      console.error("Error Creating Rule:", error);
      // Show custom alert on error
      toast.error('Invalid input: Please enter a valid rule', {
        position: 'top-right'  // Corrected position reference
      });
      throw new Error('Error Creating Rule');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true
    try {
      const successMessage = await createRule(rule);
      setMessage(successMessage);
      // Optionally, show success notification
      toast.success('Rule created successfully!', {
        position: 'top-right'  // Corrected position reference
      });
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);  // Set loading to false
    }
  };

  return (
    <div>
      <ToastContainer /> {/* Container for toast notifications */}
      <h2 className="form-heading">Create Rule</h2>
      <form className='form-container' onSubmit={handleSubmit}>
        <label className="form-label">Rule:</label>
        {/* <input
          className="form-input"
          type="text"
          value={rule}
          onChange={(e) => setRule(e.target.value)}
          placeholder="Enter rule (e.g., age > 30 AND salary > 50000)"
          required
        /> */}
        <input
          className="form-input"
          type="text"
          value={rule}
          onChange={(e) => {
              setRule(e.target.value);
              console.log(e.target.value); // Debugging to see what value is being entered
          }}
          placeholder="Enter rule (e.g., age > 30 AND salary > 50000)"
          required
        />
        <button type="submit" className="form-button" disabled={loading}> 
          {loading ? 'Creating...' : 'Create Rule'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RuleForm;