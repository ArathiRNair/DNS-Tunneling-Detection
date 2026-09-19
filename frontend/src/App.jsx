import { useState } from 'react';
import './App.css';

function App() {
  const [domain, setDomain] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [result, setResult] = useState(null);

  const handleDetect = () => {
    if (!domain.trim()) {
      setErrorMsg('Please enter a domain string.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');
    setResult(null);

    // DAY 7: Simulate backend latency. 
    // The actual fetch to POST /predict will be implemented in Day 8.
    setTimeout(() => {
      // Mock data for UI demonstration purposes
      const isTunnel = domain.length > 20; // Simple mock logic for demonstration
      
      setResult({
        sanitized_domain: domain.trim(),
        prediction: isTunnel ? 1 : 0,
        status: isTunnel ? "Tunnel" : "Benign",
        confidence_tunnel: isTunnel ? 0.98 : 0.02,
        features: {
          domain_length: domain.length,
          subdomain_length: Math.max(0, domain.length - 10),
          label_count: domain.split('.').length,
          digit_count: (domain.match(/\d/g) || []).length,
          digit_ratio: (domain.match(/\d/g) || []).length / (domain.length || 1),
          special_char_count: (domain.match(/[^a-zA-Z0-9.]/g) || []).length,
          domain_entropy: 3.45,
          subdomain_entropy: 2.15
        }
      });
      setStatus('success');
    }, 1000);
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
