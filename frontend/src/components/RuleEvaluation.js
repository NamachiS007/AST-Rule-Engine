import React, { useState } from 'react'; 
import ruleService from '../services/ruleServices.js';  

const RuleEvaluation = () => {
  const [data, setData] = useState({ age: '', department: '', salary: '', experience: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);  // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true
    try {
      const response = await ruleService.evaluateRule(data);
      setResult(response.result ? 'Eligible' : 'Not Eligible');
    } catch (error) {
      setResult('Error evaluating rule');
    } finally {
      setLoading(false);  // Set loading to false
    }
  };

  return (
    <div className="evaluate-rule-container">
        <h2 className="form-heading" style={{ color: 'white' }}>Evaluate Rule</h2>
        <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-row">
            <label className="form-label" style={{ color: 'white' }}>Age:</label>
            <input className="form-input" type="number" value={data.age} onChange={(e) => setData({ ...data, age: e.target.value })} required />
            </div>
            <div className="form-row">
            <label className="form-label" style={{ color: 'white' }}>Department:</label>
            <input className="form-input" type="text" value={data.department} onChange={(e) => setData({ ...data, department: e.target.value })} required />
            </div>
            <div className="form-row">
            <label className="form-label" style={{ color: 'white' }}>Salary:</label>
            <input className="form-input" type="number" value={data.salary} onChange={(e) => setData({ ...data, salary: e.target.value })} required />
            </div>
            <div className="form-row">
            <label className="form-label" style={{ color: 'white' }}>Experience:</label>
            <input className="form-input" type="number" value={data.experience} onChange={(e) => setData({ ...data, experience: e.target.value })} required />
            </div>
            <button type="submit" className="form-button" disabled={loading} >
            {loading ? 'Evaluating...' : 'Evaluate Rule'}
            </button>
        </form>
        {result && <p>Result: {result}</p>}
    </div>
  );    
};

export default RuleEvaluation;