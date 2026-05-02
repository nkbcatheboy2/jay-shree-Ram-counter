import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [limit, setLimit] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Login user ka naam (Abhi dummy rakha hai, aap change kar sakte hain)
  const [currentUser] = useState("Sushil Kumar");
  
  // History track karne ke liye state
  const [history, setHistory] = useState([]);

  const handleSpeak = () => {
    if (!text) return alert("Kuch toh likho bhai!");
    
    setIsSpeaking(true);

    // History update karna
    const newEntry = {
      text: text,
      count: limit,
      time: new Date().toLocaleTimeString()
    };
    setHistory([newEntry, ...history]);

    // Voice logic
    for (let i = 0; i < limit; i++) {
      const utterance = new SpeechSynthesisUtterance(text);
      if (i === limit - 1) {
        utterance.onend = () => setIsSpeaking(false);
      }
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="main-wrapper">
      {/* --- Navigation Bar --- */}
      <nav className="navbar">
        <div className="nav-logo">🚩 SoundApp</div>
        <div className="nav-user">
          <span>Welcome, <strong>{currentUser}</strong></span>
          <div className="user-badge">Admin</div>
        </div>
      </nav>

      <div className="container">
        <div className="content-grid">
          
          {/* --- Main Control Card --- */}
          <div className="card">
            <h1>Voice Controller</h1>
            <div className="input-group">
              <label>Message</label>
              <input 
                type="text" 
                placeholder="Jay Shree Ram..." 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
              />
            </div>
            <div className="input-group">
              <label>Repeat Count</label>
              <input 
                type="number" 
                value={limit} 
                onChange={(e) => setLimit(e.target.value)} 
                min="1" 
              />
            </div>
            <div className="btn-container">
              <button className="btn-start" onClick={handleSpeak} disabled={isSpeaking}>
                {isSpeaking ? "Speaking..." : "Start Voice"}
              </button>
              <button className="btn-stop" onClick={handleStop}>Stop</button>
            </div>
          </div>

          {/* --- History Sidebar --- */}
          <div className="history-card">
            <h2>Recent Activity</h2>
            <div className="history-list">
              {history.length === 0 ? (
                <p className="no-data">No activity yet</p>
              ) : (
                history.map((item, index) => (
                  <div key={index} className="history-item">
                    <div className="item-info">
                      <span className="item-text">"{item.text}"</span>
                      <span className="item-time">{item.time}</span>
                    </div>
                    <div className="item-count">{item.count} Times</div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;