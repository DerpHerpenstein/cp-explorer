import logo from './logo.svg';
import Compose from './tabs/compose';
import Issuances from './tabs/issuances';
import MyAssets from './tabs/myassets';
import Mempool from './tabs/mempool';
import WalletConnect from './components/walletconnect';
import './App.css';
import React, { useState } from 'react';


function App() {
  const [apiEndpoint, setApiEndpoint] = useState('https://api.counterparty.io:4000/v2/');
  const [activeTab, setActiveTab] = useState(0);
  const [walletState, setWalletState] = useState({});

  const tabs = [
    { label: 'Issuances', content: <Issuances apiEndpoint={apiEndpoint}/>  },
    { label: 'Mempool', content: <Mempool apiEndpoint={apiEndpoint}/> },
    { label: 'My Assets', content: <MyAssets walletState={walletState} apiEndpoint={apiEndpoint}/>, requireConnected:true },
    { label: 'Compose', content: <Compose walletState={walletState} apiEndpoint={apiEndpoint}/>, requireConnected:true }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow w-full h-16">
        <div className="container mx-auto h-full flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold text-gray-800">Counterparty Explorer</h1>
          <WalletConnect walletState={walletState} setWalletState={setWalletState}></WalletConnect>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        <div className="tabs">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`tab ${activeTab === index ? 'tab-active' : ''} 
                          ${(tab?.requireConnected) ? (walletState?.connected ? '' : 'hidden') : ''}`}
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
