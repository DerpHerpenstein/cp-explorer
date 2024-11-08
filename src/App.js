import logo from './logo.svg';
import Issuances from './tabs/issuances';
import Mempool from './tabs/mempool';
import './App.css';

import React, { useState } from 'react';

function App() {
  const [apiEndpoint, setApiEndpoint] = useState('https://api.counterparty.io:4000/v2/');
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: 'Issuances', content: <Issuances apiEndpoint={apiEndpoint}/>  },
    { label: 'Mempool', content: <Mempool apiEndpoint={apiEndpoint}/> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow w-full h-16">
        <div className="container mx-auto h-full flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold text-gray-800">CP-Explorer</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Connect</button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        <div className="tabs">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`tab ${activeTab === index ? 'tab-active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="mt-4 p-4 bg-white shadow rounded">
          {tabs[activeTab].content}
        </div>
      </main>
    </div>
  );
}

export default App;
