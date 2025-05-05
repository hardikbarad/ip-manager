import React from 'react';
import CMDBList from './components/CMDBList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>IP Manager</h1>
        </div>
      </header>

      <main className="app-main">
        <CMDBList />
      </main>
    </div>
  );
};

export default App;