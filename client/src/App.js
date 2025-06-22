import React from 'react';
import Chat from './components/Chat';
import AdminUpload from './components/AdminUpload';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        AI-Powered Customer Support Chat Application
      </nav>
      <div className="main-content">
        <div className="admin-section">
          <AdminUpload />
        </div>
        <div className="chat-section">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default App;
