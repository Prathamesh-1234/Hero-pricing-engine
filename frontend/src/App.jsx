import React, { useState } from 'react';
import './App.css';
import PartManager from './components/PartManager';
import CycleManager from './components/CycleManager';
import QuoteGenerator from './components/QuoteGenerator';
import QuoteHistory from './components/QuoteHistory';

function App() {
  const [activeTab, setActiveTab] = useState('parts');

  return (
    <div className="App">
      <header className="app-header">
        <h1>🚲 Hero Cycles – Pricing Engine</h1>
        <nav className="tab-nav">
          {['parts', 'cycles', 'quote', 'history'].map(tab => (
            <button
              key={tab}
              className={activeTab === tab ? 'active' : ''}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'parts' && 'Parts'}
              {tab === 'cycles' && 'Configurations'}
              {tab === 'quote' && 'Generate Quote'}
              {tab === 'history' && 'Quote History'}
            </button>
          ))}
        </nav>
      </header>
      <main className="app-main">
        {activeTab === 'parts' && <PartManager />}
        {activeTab === 'cycles' && <CycleManager />}
        {activeTab === 'quote' && <QuoteGenerator />}
        {activeTab === 'history' && <QuoteHistory />}
      </main>
    </div>
  );
}

export default App;