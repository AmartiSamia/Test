import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>DevOps Test App v1.0</h1>
        <p>Pipeline Status: Deployed Successfully!</p>
        <p>Build Time: {new Date().toISOString()}</p>
      </header>
    </div>
  );
}

export default App;