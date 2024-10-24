import React from 'react';
import RuleForm from './components/RuleForm';  // Import RuleForm component
import RuleEvaluation from './components/RuleEvaluation';  // Import RuleEvaluation component
import './App.css';  // Import the CSS file

function App() {
  return (
    <div className="App" style={{ 
      backgroundImage: `url(/backgroundimage.png)`,  // Reference the image in the public folder
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      textAlign: 'center',
    }}>
      <h1 style={{ color: 'white', marginTop: '150px'}}>Rule Engine with AST</h1>
      <RuleForm />
      <RuleEvaluation />
    </div>
  );
}

export default App;