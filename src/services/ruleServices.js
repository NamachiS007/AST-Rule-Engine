import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Flask API

const ruleService = {
    createRule: async (ruleString) => {
        const response = await axios.post(`${API_URL}/create_rule`, { rule: ruleString });
        return response.data;
    },

    evaluateRule: async (data) => {
        const response = await axios.post(`${API_URL}/evaluate_rule`, data);
        return response.data;
    }
};

export default ruleService;