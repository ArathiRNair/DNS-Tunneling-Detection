import { useState } from 'react';
import './App.css';

// --- Icons ---
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const ActivityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
);
const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
);
const HashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>
);
const MaximizeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
);
const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);
const AlertTriangleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);
const LoaderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="spin"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
);

const NetworkShieldSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M80 80 L35 45 M80 80 L125 45 M80 80 L35 115 M80 80 L125 115 M80 80 L140 80 M80 80 L20 80" stroke="#0ea5e9" strokeOpacity="0.3" strokeWidth="1.5" />
    <circle cx="35" cy="45" r="4" fill="#0ea5e9" fillOpacity="0.5" />
    <circle cx="125" cy="45" r="4" fill="#0ea5e9" fillOpacity="0.5" />
    <circle cx="35" cy="115" r="4" fill="#0ea5e9" fillOpacity="0.5" />
    <circle cx="125" cy="115" r="4" fill="#0ea5e9" fillOpacity="0.5" />
    <circle cx="140" cy="80" r="3" fill="#0ea5e9" fillOpacity="0.5" />
    <circle cx="20" cy="80" r="3" fill="#0ea5e9" fillOpacity="0.5" />
    <circle cx="80" cy="80" r="32" fill="#e0f2fe" opacity="0.6" />
    <g transform="translate(68, 68) scale(1)">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="#0284c7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="9 12 11 14 15 10" fill="none" stroke="#0284c7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

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

    // EXACT Day 8/12 functionality preserved
    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain: domain.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Server error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      setStatus('success');
    } catch (err) {
      console.error("API Connection Error:", err);
      setErrorMsg(err.message === "Failed to fetch" 
        ? "Unable to connect to the backend server. Please ensure the FastAPI server is running." 
        : err.message);
      setStatus('error');
    }
  };

  const formatValue = (val) => {
    if (typeof val === 'number' && !Number.isInteger(val)) return val.toFixed(4);
    return val;
  };

  const getFeatureIcon = (key) => {
    if (key.includes('length') || key.includes('ratio')) return <MaximizeIcon />;
    if (key.includes('count')) return <HashIcon />;
    return <ActivityIcon />;
  };

  return (
    <div className="app-layout">
      {/* TOP HEADER (Navy) */}
      <header className="top-header">
        <div className="header-left">
          <div className="header-icon"><ShieldIcon /></div>
          <div className="header-titles">
            <h1>DNS Tunneling Detection System</h1>
            <p>ML-powered detection of suspicious DNS domain patterns</p>
          </div>
        </div>
        <div className="system-status">
          <div className="status-dot"></div> System Online
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="content-area">
        <div className="content-container">
          
          {/* HERO BANNER */}
          <section className="hero-banner">
            <div className="hero-text">
              <div className="welcome">Welcome to</div>
              <h2>DNS Tunneling Detection System</h2>
              <p>Enter a domain name to analyze its DNS characteristics and detect potential tunneling behavior using machine learning.</p>
            </div>
            <div className="hero-visual">
              <NetworkShieldSVG />
            </div>
          </section>

          {/* DOMAIN ANALYSIS CARD */}
          <section className="card">
            <div className="card-header">
              <h2 className="card-title"><GlobeIcon /> Domain Analysis</h2>
              <p className="card-subtitle">Enter a domain name to check for DNS tunneling</p>
            </div>

            <div className="analysis-input-group">
              <div className="input-container">
                <GlobeIcon className="input-icon" />
                <input 
                  type="text" 
                  className="domain-input"
                  placeholder="e.g. google.com" 
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleDetect()}
                />
              </div>
              <button 
                className="detect-btn"
                onClick={handleDetect} 
                disabled={status === 'loading'}
              >
                {status === 'loading' ? <><LoaderIcon /> Analyzing</> : <><SearchIcon /> Detect Domain</>}
              </button>
            </div>

            {/* Status Messages */}
            {status === 'error' && (
              <div className="status-banner status-error">
                <AlertTriangleIcon /> {errorMsg}
              </div>
            )}
            {status === 'loading' && (
              <div className="status-banner status-loading">
                <LoaderIcon /> Analyzing domain characteristics and running Random Forest inference...
              </div>
            )}
            
            {/* INITIAL PIPELINE EXPLAINER (Shown only when idle) */}
            {status === 'idle' && (
              <div className="pipeline-explainer">
                <span>How the analysis works:</span>
                <div className="pipeline-step">Domain Input</div>
                <ArrowRightIcon className="pipeline-arrow" />
                <div className="pipeline-step">8 DNS Features</div>
                <ArrowRightIcon className="pipeline-arrow" />
                <div className="pipeline-step">Random Forest</div>
                <ArrowRightIcon className="pipeline-arrow" />
                <div className="pipeline-step">Detection</div>
              </div>
            )}
          </section>

          {/* RESULT SECTION (Only visible on success) */}
          {status === 'success' && result && (
            <>
              <section className="result-card">
                {/* Verdict */}
                <div className={`verdict-box ${result.prediction === 1 ? 'tunnel' : 'benign'}`}>
                  <div className="verdict-icon-container">
                    {result.prediction === 1 ? <AlertTriangleIcon /> : <CheckCircleIcon />}
                  </div>
                  <div className="verdict-label">
                    {result.prediction === 1 ? 'TUNNEL' : 'BENIGN'}
                  </div>
                  <div className="verdict-desc">
                    {result.prediction === 1 
                      ? 'Potential DNS tunneling pattern detected.' 
                      : 'No tunneling pattern detected.'}
                  </div>
                </div>

                {/* Confidence */}
                <div className="confidence-box">
                  <div className="conf-top">
                    <span className="conf-title">Tunnel Confidence</span>
                    <span className="conf-value">{(result.confidence_tunnel * 100).toFixed(2)}%</span>
                  </div>
                  <div className="conf-track">
                    <div 
                      className={`conf-fill ${result.prediction === 1 ? 'tunnel' : 'benign'}`}
                      style={{ width: `${result.confidence_tunnel * 100}%` }}
                    ></div>
                  </div>
                </div>
              </section>

              {/* EXTRACTED FEATURES */}
              <section className="card">
                <div className="card-header">
                  <h2 className="card-title"><HashIcon /> Extracted DNS Features</h2>
                  <p className="card-subtitle">Eight lexical and entropy-based characteristics extracted from the analyzed domain.</p>
                </div>
                
                <div className="features-grid">
                  {Object.entries(result.features).map(([key, value]) => (
                    <div className="feature-item" key={key}>
                      <div className="feature-icon-title">
                        {getFeatureIcon(key)}
                        <span className="feature-title">{key}</span>
                      </div>
                      <div className="feature-value">{formatValue(value)}</div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* SHAP EXPLAINABILITY */}
          <section className="card">
            <div className="card-header">
              <h2 className="card-title"><ActivityIcon /> Model Explainability</h2>
              <p className="card-subtitle">SHAP analysis shows how each feature contributes to the model's predictions.</p>
            </div>

            <p className="shap-intro">
              The charts below present the <strong>global explanation</strong> of the Random Forest model across the validation dataset. They do not dynamically change for individual domain queries.
            </p>

            <div className="shap-grid">
              <div className="shap-plot-card">
                <h4>Global Feature Importance</h4>
                <p>Shows the overall influence of each of the 8 features.</p>
                <div className="shap-img-container">
                  <img src="/shap_feature_importance_bar.png" alt="SHAP Bar Chart" />
                </div>
              </div>
              
              <div className="shap-plot-card">
                <h4>SHAP Beeswarm Plot</h4>
                <p>Shows how feature values distribute across validation samples.</p>
                <div className="shap-img-container">
                  <img src="/shap_beeswarm.png" alt="SHAP Beeswarm" />
                </div>
              </div>
            </div>

            {/* SHAP INSIGHT */}
            <div className="shap-insight-panel">
              <div className="insight-text">
                <h4><ShieldIcon /> Global Analysis Insight</h4>
                <p>Based on validation data, the strongest contributors influencing predictions are:</p>
              </div>
              <div className="insight-tags">
                <span className="insight-tag">subdomain_length</span>
                <span className="insight-tag">domain_length</span>
                <span className="insight-tag">label_count</span>
                <span className="insight-tag">subdomain_entropy</span>
                <span className="insight-tag">domain_entropy</span>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

export default App;
