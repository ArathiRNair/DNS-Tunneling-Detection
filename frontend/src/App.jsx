import { useState } from 'react';
import './App.css';

function App() {
  const [domain, setDomain] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [result, setResult] = useState(null);

  const handleDetect = async () => {
    if (!domain.trim()) {
      setErrorMsg('Please enter a domain string.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');
    setResult(null);

    // DAY 8: Real asynchronous request to the FastAPI endpoint
    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain: domain.trim() }),
      });

      if (!response.ok) {
        // Handle non-200 responses (e.g., 400 Bad Request if validation fails on the backend)
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Server error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      setStatus('success');
    } catch (err) {
      // Handles network failure, backend unavailability, or thrown errors
      console.error("API Connection Error:", err);
      setErrorMsg(err.message === "Failed to fetch" 
        ? "Unable to connect to the backend server. Please ensure the FastAPI server is running." 
        : err.message);
      setStatus('error');
    }
  };

  return (
    <div className="App">
      <header className="hero">
        <h1>DNS Tunneling Detection System</h1>
        <p>A machine learning system for detecting DNS tunneling in domain names.</p>
      </header>

      <main>
        {/* DOMAIN DETECTION CARD */}
        <section className="card">
          <h2 className="section-title">Domain Analysis</h2>
          <div className="input-group">
            <input 
              type="text" 
              className="domain-input"
              placeholder="Enter domain (e.g., google.com or encoded.tunnel.org)" 
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleDetect()}
            />
            <button 
              className="detect-btn"
              onClick={handleDetect} 
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Analyzing...' : 'Detect Domain'}
            </button>
          </div>

          {status === 'loading' && (
            <div className="status-message status-loading">
              Processing domain features and running model inference...
            </div>
          )}

          {status === 'error' && (
            <div className="status-message status-error">
              {errorMsg}
            </div>
          )}
        </section>

        {/* PREDICTION RESULT CARD */}
        {status === 'success' && result && (
          <section className="card prediction-card">
            <h2 className="section-title" style={{marginBottom: 0}}>Detection Results</h2>
            
            <div className={`prediction-banner ${result.prediction === 1 ? 'prediction-tunnel' : 'prediction-benign'}`}>
              Result: {result.status.toUpperCase()}
            </div>
            
            <div className={`confidence-section ${result.prediction === 1 ? 'confidence-tunnel' : 'confidence-benign'}`}>
              <div className="confidence-header">
                <span>Model Confidence (Tunnel Probability)</span>
                <span className="confidence-value">{(result.confidence_tunnel * 100).toFixed(2)}%</span>
              </div>
              <div className="confidence-bar-container">
                <div 
                  className="confidence-bar" 
                  style={{ width: `${result.confidence_tunnel * 100}%` }}
                ></div>
              </div>
            </div>

            {/* EXTRACTED FEATURES SECTION */}
            <div className="features-container">
              <h3 className="section-title" style={{fontSize: '1.1rem', marginTop: '1rem'}}>Extracted Lexical Features</h3>
              <div className="features-grid">
                {Object.entries(result.features).map(([key, value]) => (
                  <div className="feature-card" key={key}>
                    <div className="feature-name">{key.replace('_', ' ')}</div>
                    <div className="feature-value">
                      {typeof value === 'number' && !Number.isInteger(value) 
                        ? value.toFixed(4) 
                        : value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SHAP MODEL EXPLAINABILITY CARD */}
        <section className="card">
          <h2 className="section-title">Model Explainability (SHAP)</h2>
          <p className="shap-intro">
            These global visualizations demonstrate the mathematical feature importance driving the Random Forest model's decisions across the validation dataset.
          </p>
          
          <div className="shap-grid">
            <div className="shap-card">
              <h3>Global Feature Importance</h3>
              <p>Mean absolute SHAP values highlighting the most influential features.</p>
              <img src="/shap_feature_importance_bar.png" alt="SHAP Feature Importance Bar Plot" />
            </div>
            <div className="shap-card">
              <h3>Feature Impact Directionality</h3>
              <p>Beeswarm plot illustrating how specific feature values push predictions toward Benign or Tunnel.</p>
              <img src="/shap_beeswarm.png" alt="SHAP Beeswarm Plot" />
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default App;
