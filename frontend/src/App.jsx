import { useState } from 'react';
import './App.css';

// --- SVG Icons ---
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const ActivityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
);
const BarChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
);
const LightbulbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path></svg>
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
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const DatabaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
);
const LayersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="22 17 12 22 2 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
);
const CpuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
);
const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
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

// --- Actual Saved Benchmark Data (from results/model_comparison.csv) ---
const MODEL_COMPARISON_DATA = [
  {
    model: 'Random Forest',
    accuracy: 1.0,
    precision: 1.0,
    recall: 1.0,
    f1: 1.0,
    tn: 1000,
    fp: 0,
    fn: 0,
    tp: 4000,
    status: 'Deployed (Best)',
    cmImage: '/random_forest_cm.png',
    notes: 'Chosen for live deployment due to 100% precision & recall with zero false positives.'
  },
  {
    model: 'Hist Gradient Boosting',
    accuracy: 0.9998,
    precision: 0.99975,
    recall: 1.0,
    f1: 0.99988,
    tn: 999,
    fp: 1,
    fn: 0,
    tp: 4000,
    status: 'Candidate',
    cmImage: '/hist_gradient_boosting_cm.png',
    notes: 'Near-perfect performance with only 1 false positive out of 5,000 validation samples.'
  },
  {
    model: 'Gradient Boosting',
    accuracy: 0.9990,
    precision: 0.99875,
    recall: 1.0,
    f1: 0.99938,
    tn: 995,
    fp: 5,
    fn: 0,
    tp: 4000,
    status: 'Candidate',
    cmImage: '/gradient_boosting_cm.png',
    notes: 'Strong candidate with 5 false positives, 100% recall on tunneling attacks.'
  }
];

// --- Actual SHAP Global Importance (from results/shap_feature_importance.csv) ---
const SHAP_FEATURE_DATA = [
  { feature: 'subdomain_length', importance: 0.14619, role: 'Payload Encapsulation', desc: 'Tunneling tools pack base32/base64 encoded exfiltration data into subdomains.' },
  { feature: 'domain_length', importance: 0.11277, role: 'Total Query Size', desc: 'Total character length of the full domain; tunnel queries are significantly longer.' },
  { feature: 'label_count', importance: 0.08869, role: 'Label Stacking', desc: 'Number of dot-separated labels; tunneling often stacks multiple sub-labels.' },
  { feature: 'subdomain_entropy', importance: 0.05647, role: 'Payload Randomness', desc: 'Shannon entropy of the subdomain; encoded ciphertext exhibits high randomness.' },
  { feature: 'domain_entropy', importance: 0.04756, role: 'Overall Entropy', desc: 'Shannon entropy across full domain; indicates non-dictionary random strings.' },
  { feature: 'digit_count', importance: 0.02823, role: 'Numerical Content', desc: 'Total count of numerical digits (0-9) present in the domain name.' },
  { feature: 'digit_ratio', importance: 0.02266, role: 'Digit Density', desc: 'Ratio of numeric characters to total length; hex/encoded data contains more digits.' },
  { feature: 'special_char_count', importance: 0.00436, role: 'Separator Frequency', desc: 'Count of hyphens or allowed symbols used as delimiters in query payloads.' }
];

function App() {
  // Navigation State: 'dashboard' | 'detection' | 'workflow' | 'evaluation' | 'explainability'
  const [activePage, setActivePage] = useState('dashboard');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Domain Detection State (Preserved from Day 8/12)
  const [domain, setDomain] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [result, setResult] = useState(null);

  const handleDetect = async (domainOverride) => {
    const targetDomain = (typeof domainOverride === 'string' ? domainOverride : domain).trim();
    if (!targetDomain) {
      setErrorMsg('Please enter a domain string.');
      setStatus('error');
      return;
    }

    if (typeof domainOverride === 'string') {
      setDomain(domainOverride);
    }

    setStatus('loading');
    setErrorMsg('');
    setResult(null);

    // EXACT real FastAPI endpoint preserved
    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain: targetDomain }),
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

  const navigateTo = (page) => {
    setActivePage(page);
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-layout">
      {/* Mobile Backdrop */}
      <div
        className={`sidebar-backdrop ${mobileNavOpen ? 'active' : ''}`}
        onClick={() => setMobileNavOpen(false)}
      />

      {/* --- SIDEBAR NAVIGATION (Desktop & Mobile Drawer) --- */}
      <aside className={`sidebar ${mobileNavOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-icon">
              <ShieldIcon />
            </div>
            <div className="brand-text">
              <h2>DNS-TDS</h2>
              <span>Security Analyzer</span>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">Navigation</div>

          <button
            className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
            onClick={() => navigateTo('dashboard')}
          >
            <ActivityIcon />
            <span>Dashboard</span>
          </button>

          <button
            className={`nav-item ${activePage === 'detection' ? 'active' : ''}`}
            onClick={() => navigateTo('detection')}
          >
            <SearchIcon />
            <span>Domain Detection</span>
          </button>

          <button
            className={`nav-item ${activePage === 'workflow' ? 'active' : ''}`}
            onClick={() => navigateTo('workflow')}
          >
            <LayersIcon />
            <span>Workflow & Architecture</span>
          </button>

          <button
            className={`nav-item ${activePage === 'evaluation' ? 'active' : ''}`}
            onClick={() => navigateTo('evaluation')}
          >
            <BarChartIcon />
            <span>Model Evaluation</span>
          </button>

          <button
            className={`nav-item ${activePage === 'explainability' ? 'active' : ''}`}
            onClick={() => navigateTo('explainability')}
          >
            <LightbulbIcon />
            <span>Explainability (SHAP)</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="active-model-card">
            <span className="active-model-label">Deployed Model</span>
            <div className="active-model-name">
              <span className="model-status-indicator"></span>
              Random Forest
            </div>
            <span className="active-model-meta">100 Trees • 8 Lexical Features</span>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="main-wrapper">

        {/* TOP HEADER */}
        <header className="top-header">
          <div className="header-left">
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Toggle Navigation"
            >
              {mobileNavOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

            <div className="header-breadcrumbs">
              <span className="breadcrumb-app">DNS-TDS</span>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-current">
                {activePage === 'dashboard' && 'Dashboard Overview'}
                {activePage === 'detection' && 'Live Domain Detection'}
                {activePage === 'workflow' && 'Workflow & System Architecture'}
                {activePage === 'evaluation' && 'Model Benchmark & Evaluation'}
                {activePage === 'explainability' && 'SHAP Interpretability'}
              </span>
            </div>
          </div>

          <div className="header-right">
            <div className="system-status">
              <span className="status-dot"></span>
              <span>FastAPI Engine</span>
            </div>
            <span className="api-badge">POST /predict</span>
          </div>
        </header>

        {/* SCROLLABLE PAGE CONTAINER */}
        <main className="content-area">
          <div className="page-container">

            {/* ======================================================== */}
            {/* PAGE 1: DASHBOARD                                       */}
            {/* ======================================================== */}
            {activePage === 'dashboard' && (
              <>
                <section className="hero-banner">
                  <div className="hero-text">
                    <div className="hero-badge">
                      <ShieldIcon /> Project Review Ready • Machine Learning Defense
                    </div>
                    <h2>DNS Tunneling Detection System</h2>
                    <p>
                      An intelligent cyber-defense system that analyzes DNS domain lexical characteristics
                      and entropy to identify covert DNS data exfiltration channels and C2 communications in real time.
                    </p>
                    <div className="hero-actions">
                      <button className="hero-btn-primary" onClick={() => navigateTo('detection')}>
                        <SearchIcon /> Analyze a Domain <ArrowRightIcon />
                      </button>
                      <button className="hero-btn-secondary" onClick={() => navigateTo('workflow')}>
                        <LayersIcon /> View System Architecture
                      </button>
                    </div>
                  </div>
                  <div className="hero-visual">
                    <NetworkShieldSVG />
                  </div>
                </section>

                {/* Performance Summary Metrics */}
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-header">
                      <span className="stat-title">Validation Accuracy</span>
                      <ShieldIcon className="stat-icon" />
                    </div>
                    <div className="stat-value">100.0%</div>
                    <span className="stat-desc">Random Forest on 5,000 samples</span>
                  </div>

                  <div className="stat-card">
                    <div className="stat-header">
                      <span className="stat-title">Detection Recall</span>
                      <CheckCircleIcon className="stat-icon" />
                    </div>
                    <div className="stat-value">100.0%</div>
                    <span className="stat-desc">4,000/4,000 tunnels caught</span>
                  </div>

                  <div className="stat-card">
                    <div className="stat-header">
                      <span className="stat-title">False Positive Rate</span>
                      <AlertTriangleIcon className="stat-icon" />
                    </div>
                    <div className="stat-value">0.00%</div>
                    <span className="stat-desc">0 false alarms on benign set</span>
                  </div>

                  <div className="stat-card">
                    <div className="stat-header">
                      <span className="stat-title">Feature Schema</span>
                      <HashIcon className="stat-icon" />
                    </div>
                    <div className="stat-value">8</div>
                    <span className="stat-desc">Deterministic lexical & entropy</span>
                  </div>
                </div>

                {/* DNS Tunneling Threat Explanation */}
                <section className="card">
                  <div className="card-header">
                    <div>
                      <h2 className="card-title"><GlobeIcon /> Understanding DNS Tunneling Threats</h2>
                      <p className="card-subtitle">Why traditional perimeter defenses fail and how machine learning solves detection</p>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-dark)' }}>
                        The Threat: Covert Communication Channel
                      </h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                        DNS tunneling abuses the fundamental Domain Name System protocol (port 53 UDP/TCP) to transmit arbitrary non-DNS data.
                        Attackers encapsulate command-and-control instructions or stolen confidential files into encoded subdomain queries (e.g., base32/base64 chunks),
                        bypassing standard firewalls and content filters that permit unrestricted DNS resolution.
                      </p>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-dark)' }}>
                        The Solution: Domain-Level Lexical Analysis
                      </h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                        Rather than requiring deep packet inspection or unencrypted payload inspection, this system evaluates
                        <strong> eight deterministic lexical and Shannon entropy features</strong> derived exclusively from the domain name string
                        to provide a prediction and confidence score.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Quick Navigation Cards */}
                <div className="quick-nav-grid">
                  <div className="quick-nav-card" onClick={() => navigateTo('detection')}>
                    <div className="quick-nav-top">
                      <div className="quick-nav-icon"><SearchIcon /></div>
                      <div className="quick-nav-content">
                        <h3>Live Domain Detection</h3>
                        <p>Analyze any candidate domain query against the running FastAPI model in real time.</p>
                      </div>
                    </div>
                    <div className="quick-nav-action">Launch Detector <ArrowRightIcon /></div>
                  </div>

                  <div className="quick-nav-card" onClick={() => navigateTo('workflow')}>
                    <div className="quick-nav-top">
                      <div className="quick-nav-icon"><LayersIcon /></div>
                      <div className="quick-nav-content">
                        <h3>Workflow & Architecture</h3>
                        <p>Explore the 5-stage processing pipeline from input sanitization to RF prediction.</p>
                      </div>
                    </div>
                    <div className="quick-nav-action">View Architecture <ArrowRightIcon /></div>
                  </div>

                  <div className="quick-nav-card" onClick={() => navigateTo('evaluation')}>
                    <div className="quick-nav-top">
                      <div className="quick-nav-icon"><BarChartIcon /></div>
                      <div className="quick-nav-content">
                        <h3>Model Evaluation</h3>
                        <p>Review comparative benchmark tables and confusion matrices across RF, GB, and HistGB.</p>
                      </div>
                    </div>
                    <div className="quick-nav-action">View Evaluation <ArrowRightIcon /></div>
                  </div>

                  <div className="quick-nav-card" onClick={() => navigateTo('explainability')}>
                    <div className="quick-nav-top">
                      <div className="quick-nav-icon"><LightbulbIcon /></div>
                      <div className="quick-nav-content">
                        <h3>Model Explainability (SHAP)</h3>
                        <p>Explore global feature importance bar charts and beeswarm plots explaining predictions.</p>
                      </div>
                    </div>
                    <div className="quick-nav-action">Explore SHAP <ArrowRightIcon /></div>
                  </div>
                </div>
              </>
            )}

            {/* ======================================================== */}
            {/* PAGE 2: DOMAIN DETECTION                                */}
            {/* ======================================================== */}
            {activePage === 'detection' && (
              <>
                <div className="page-header">
                  <h1 className="page-title">Live Domain Detection</h1>
                  <p className="page-subtitle">
                    Enter a domain query to execute the live 8-feature extraction pipeline and Random Forest inference via FastAPI.
                  </p>
                </div>

                {/* Detection Input Card */}
                <section className="card">
                  <div className="card-header">
                    <div>
                      <h2 className="card-title"><GlobeIcon /> Domain Analysis Query</h2>
                      <p className="card-subtitle">Connects to real FastAPI backend at http://127.0.0.1:8000/predict</p>
                    </div>
                  </div>

                  <div className="analysis-input-group">
                    <div className="input-container">
                      <GlobeIcon className="input-icon" />
                      <input
                        type="text"
                        className="domain-input"
                        placeholder="e.g. google.com or encoded.tunnel.domain.com"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleDetect()}
                        aria-label="Domain name to analyze"
                      />
                    </div>
                    <button
                      className="detect-btn"
                      onClick={() => handleDetect()}
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? <><LoaderIcon /> Analyzing...</> : <><SearchIcon /> Detect Domain</>}
                    </button>
                  </div>

                  {/* Sample Domain Quick-Fills */}
                  <div className="demo-samples-wrapper">
                    <span className="demo-samples-label">Quick Test Samples:</span>
                    <button
                      className="demo-pill benign-pill"
                      onClick={() => handleDetect('google.com')}
                      type="button"
                    >
                      ✓ google.com (Benign)
                    </button>
                    <button
                      className="demo-pill benign-pill"
                      onClick={() => handleDetect('api.github.com')}
                      type="button"
                    >
                      ✓ api.github.com (Benign)
                    </button>
                    <button
                      className="demo-pill tunnel-pill"
                      onClick={() => handleDetect('1234567890abcdef1234567890abcdef.tunnel.hidemyself.org')}
                      type="button"
                    >
                      ⚠ Hex Encoded Tunnel
                    </button>
                    <button
                      className="demo-pill tunnel-pill"
                      onClick={() => handleDetect('dGVzdGluZ3RoaXNkbnN0dW5uZWxleGZpbHRyYXRpb24xMjM0NTY3ODk.badactor.net')}
                      type="button"
                    >
                      ⚠ Base64 Exfiltration
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
                      <LoaderIcon /> Sanitizing domain, calculating Shannon entropy, and executing Random Forest inference...
                    </div>
                  )}
                </section>

                {/* RESULT DISPLAY (Rendered when success) */}
                {status === 'success' && result && (
                  <>
                    <section className="result-card">
                      {/* Verdict Box */}
                      <div className={`verdict-box ${result.prediction === 1 ? 'tunnel' : 'benign'}`}>
                        <div className="verdict-icon-container">
                          {result.prediction === 1 ? <AlertTriangleIcon /> : <CheckCircleIcon />}
                        </div>
                        <div className="verdict-label">
                          {result.prediction === 1 ? 'TUNNEL' : 'BENIGN'}
                        </div>
                        <div className="verdict-desc">
                          {result.prediction === 1
                            ? 'Malicious DNS tunneling characteristics identified. Payload pattern detected.'
                            : 'Standard legitimate domain. No tunneling anomalies detected.'}
                        </div>
                        <div className="verdict-analyzed-domain">
                          Analyzed: <strong>{result.sanitized_domain || result.original_domain}</strong>
                        </div>
                      </div>

                      {/* Confidence Box */}
                      <div className="confidence-box">
                        <div className="conf-top">
                          <span className="conf-title">Tunnel Probability Confidence</span>
                          <span className="conf-value">{(result.confidence_tunnel * 100).toFixed(2)}%</span>
                        </div>
                        <div className="conf-track">
                          <div
                            className={`conf-fill ${result.prediction === 1 ? 'tunnel' : 'benign'}`}
                            style={{ width: `${Math.max(result.confidence_tunnel * 100, 2)}%` }}
                          ></div>
                        </div>
                        <span className="conf-caption">
                          {result.prediction === 1
                            ? 'High probability of covert channel exfiltration.'
                            : 'Benign probability: ' + ((1 - result.confidence_tunnel) * 100).toFixed(2) + '%'}
                        </span>
                      </div>
                    </section>

                    {/* Extracted 8 Features Grid */}
                    <section className="card">
                      <div className="card-header">
                        <div>
                          <h2 className="card-title"><HashIcon /> Extracted DNS Lexical Features</h2>
                          <p className="card-subtitle">Exact 8 features extracted from "{result.sanitized_domain || result.original_domain}" and fed into the Random Forest</p>
                        </div>
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
              </>
            )}

            {/* ======================================================== */}
            {/* PAGE 3: WORKFLOW & ARCHITECTURE                         */}
            {/* ======================================================== */}
            {activePage === 'workflow' && (
              <>
                <div className="page-header">
                  <h1 className="page-title">Workflow & System Architecture</h1>
                  <p className="page-subtitle">
                    Complete architectural breakdown of the live processing pipeline from raw domain input to classification verdict.
                  </p>
                </div>

                {/* Architecture Flow Diagram Card */}
                <section className="arch-diagram-card">
                  <div className="card-header">
                    <div>
                      <h2 className="card-title"><LayersIcon /> End-to-End Detection Architecture</h2>
                      <p className="card-subtitle">Real-time inference pipeline implemented across preprocessing, feature extraction, and Random Forest inference</p>
                    </div>
                  </div>

                  <div className="arch-flow-container">
                    {/* Node 1 */}
                    <div className="arch-node">
                      <div className="arch-node-badge">1</div>
                      <GlobeIcon className="arch-node-icon" />
                      <div className="arch-node-title">Domain Input</div>
                      <span className="arch-node-sub">Raw Query String</span>
                    </div>

                    <div className="arch-arrow">
                      <ArrowRightIcon />
                    </div>

                    {/* Node 2 */}
                    <div className="arch-node">
                      <div className="arch-node-badge">2</div>
                      <FilterIcon className="arch-node-icon" />
                      <div className="arch-node-title">Sanitization</div>
                      <span className="arch-node-sub">src/preprocessing.py</span>
                    </div>

                    <div className="arch-arrow">
                      <ArrowRightIcon />
                    </div>

                    {/* Node 3 */}
                    <div className="arch-node">
                      <div className="arch-node-badge">3</div>
                      <HashIcon className="arch-node-icon" />
                      <div className="arch-node-title">Eight-Feature Extraction</div>
                      <span className="arch-node-sub">src/feature_extraction.py</span>
                    </div>

                    <div className="arch-arrow">
                      <ArrowRightIcon />
                    </div>

                    {/* Node 4 */}
                    <div className="arch-node">
                      <div className="arch-node-badge">4</div>
                      <CpuIcon className="arch-node-icon" />
                      <div className="arch-node-title">Random Forest Prediction</div>
                      <span className="arch-node-sub">models/rf_model.joblib</span>
                    </div>

                    <div className="arch-arrow">
                      <ArrowRightIcon />
                    </div>

                    {/* Node 5 */}
                    <div className="arch-node">
                      <div className="arch-node-badge">5</div>
                      <CheckCircleIcon className="arch-node-icon" />
                      <div className="arch-node-title">Result & Confidence</div>
                      <span className="arch-node-sub">FastAPI POST Response</span>
                    </div>
                  </div>
                </section>

                {/* Detailed Stage-by-Stage Explanations */}
                <div className="stage-cards-grid">
                  {/* Stage 1 */}
                  <div className="stage-card">
                    <div className="stage-card-header">
                      <div className="stage-card-title-group">
                        <div className="arch-node-badge" style={{ marginBottom: 0 }}>1</div>
                        <h3 className="stage-card-title">Domain Input</h3>
                      </div>
                      <span className="code-module-badge">Client / UI Input</span>
                    </div>
                    <p className="stage-card-desc">
                      The user submits a domain through the React frontend to the FastAPI HTTP API, which extracts eight features and predicts a class using the saved Random Forest model.
                    </p>
                    <div className="stage-card-details">
                      <strong>Implementation:</strong> Handles standard domains (e.g. <code>google.com</code>), subdomains (e.g. <code>api.github.com</code>), and tunneling strings (e.g. <code>1234567890abcdef.tunnel.hidemyself.org</code>).
                    </div>
                  </div>

                  {/* Stage 2 */}
                  <div className="stage-card">
                    <div className="stage-card-header">
                      <div className="stage-card-title-group">
                        <div className="arch-node-badge" style={{ marginBottom: 0 }}>2</div>
                        <h3 className="stage-card-title">Sanitization</h3>
                      </div>
                      <span className="code-module-badge">src/preprocessing.py</span>
                    </div>
                    <p className="stage-card-desc">
                      Cleans and standardizes the domain string before feature extraction by trimming whitespace and stripping trailing root dots.
                    </p>
                    <div className="stage-card-details">
                      <strong>Implementation:</strong> Trims leading and trailing whitespace, collapses repeated internal whitespace, removes trailing DNS root dots (e.g. <code>domain.com.</code> → <code>domain.com</code>), and rejects empty input with HTTP 400.
                    </div>
                  </div>

                  {/* Stage 3 */}
                  <div className="stage-card">
                    <div className="stage-card-header">
                      <div className="stage-card-title-group">
                        <div className="arch-node-badge" style={{ marginBottom: 0 }}>3</div>
                        <h3 className="stage-card-title">Eight-Feature Extraction</h3>
                      </div>
                      <span className="code-module-badge">src/feature_extraction.py</span>
                    </div>
                    <p className="stage-card-desc">
                      Extracts exactly 8 deterministic lexical and Shannon entropy features derived exclusively from the domain string.
                    </p>
                    <div className="stage-card-details">
                      <strong>Features:</strong> <code>domain_length</code>, <code>subdomain_length</code>, <code>label_count</code>, <code>digit_count</code>, <code>digit_ratio</code>, <code>special_char_count</code>, <code>domain_entropy</code>, and <code>subdomain_entropy</code> (via <code>src/entropy.py</code>).
                    </div>
                  </div>

                  {/* Stage 4 */}
                  <div className="stage-card">
                    <div className="stage-card-header">
                      <div className="stage-card-title-group">
                        <div className="arch-node-badge" style={{ marginBottom: 0 }}>4</div>
                        <h3 className="stage-card-title">Random Forest Prediction</h3>
                      </div>
                      <span className="code-module-badge">models/rf_model.joblib</span>
                    </div>
                    <p className="stage-card-desc">
                      Loads the pre-trained Random Forest classifier (100 decision trees) and runs inference on the extracted 8-feature vector.
                    </p>
                    <div className="stage-card-details">
                      <strong>Implementation:</strong> Orchestrated by <code>src/predict.py</code>. Aggregates ensemble tree votes to provide a prediction and confidence score.
                    </div>
                  </div>

                  {/* Stage 5 */}
                  <div className="stage-card">
                    <div className="stage-card-header">
                      <div className="stage-card-title-group">
                        <div className="arch-node-badge" style={{ marginBottom: 0 }}>5</div>
                        <h3 className="stage-card-title">Result & Confidence</h3>
                      </div>
                      <span className="code-module-badge">src/api.py</span>
                    </div>
                    <p className="stage-card-desc">
                      FastAPI wraps the inference pipeline and returns a structured JSON payload over HTTP POST to the client.
                    </p>
                    <div className="stage-card-details">
                      <strong>Response Payload:</strong> Formats binary classification (<code>prediction: 0</code> for Benign, <code>1</code> for Tunnel), <code>confidence_tunnel</code> (0.00 to 1.00), and the complete 8-feature dictionary.
                    </div>
                  </div>
                </div>

                {/* Call-to-Action Card */}
                <section className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                      Ready to Test the Live Architecture?
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      Navigate to Domain Detection to submit real queries against this pipeline.
                    </p>
                  </div>
                  <button className="hero-btn-primary" onClick={() => navigateTo('detection')}>
                    <SearchIcon /> Launch Domain Detection <ArrowRightIcon />
                  </button>
                </section>
              </>
            )}

            {/* ======================================================== */}
            {/* PAGE 4: MODEL EVALUATION                                 */}
            {/* ======================================================== */}
            {activePage === 'evaluation' && (
              <>
                <div className="page-header">
                  <h1 className="page-title">Model Performance & Comparative Evaluation</h1>
                  <p className="page-subtitle">
                    Comprehensive benchmark comparing Random Forest, Gradient Boosting, and HistGradientBoosting
                    evaluated across 5,000 holdout validation domain samples.
                  </p>
                </div>

                {/* Metric Definitions Card */}
                <section className="card">
                  <div className="card-header">
                    <div>
                      <h2 className="card-title"><BarChartIcon /> Evaluation Metrics Guide</h2>
                      <p className="card-subtitle">Key performance indicators for evaluating cybersecurity detection algorithms</p>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                    <div>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary-blue-hover)', marginBottom: '0.25rem' }}>
                        Accuracy
                      </h3>
                      <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                        Overall ratio of correct classifications (both benign and tunnel) over the entire validation dataset.
                      </p>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary-blue-hover)', marginBottom: '0.25rem' }}>
                        Precision
                      </h3>
                      <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                        Fraction of predicted tunnels that were genuine attacks. Critical in SOC environments to minimize false alarms.
                      </p>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary-blue-hover)', marginBottom: '0.25rem' }}>
                        Recall
                      </h3>
                      <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                        Fraction of total actual tunneling attacks detected. Essential to ensure zero data exfiltration channels slip past.
                      </p>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary-blue-hover)', marginBottom: '0.25rem' }}>
                        F1-Score
                      </h3>
                      <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                        Harmonic mean of Precision and Recall. Balances false positive avoidance against high detection sensitivity.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Actual Saved Model Comparison Table */}
                <section className="card">
                  <div className="card-header">
                    <div>
                      <h2 className="card-title"><DatabaseIcon /> Model Benchmark Comparison</h2>
                      <p className="card-subtitle">Saved validation results loaded directly from <code>results/model_comparison.csv</code></p>
                    </div>
                  </div>

                  <div className="benchmark-table-wrapper">
                    <table className="benchmark-table">
                      <thead>
                        <tr>
                          <th>Model Algorithm</th>
                          <th>Accuracy</th>
                          <th>Precision</th>
                          <th>Recall</th>
                          <th>F1-Score</th>
                          <th>Confusion Matrix (TN / FP / FN / TP)</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {MODEL_COMPARISON_DATA.map((item) => (
                          <tr key={item.model} className={item.model === 'Random Forest' ? 'best-model-row' : ''}>
                            <td className="model-name-cell">
                              {item.model === 'Random Forest' && <ShieldIcon style={{ width: 16, height: 16, color: 'var(--primary-blue)' }} />}
                              {item.model}
                            </td>
                            <td className="metric-mono">{(item.accuracy * 100).toFixed(2)}%</td>
                            <td className="metric-mono">{(item.precision * 100).toFixed(2)}%</td>
                            <td className="metric-mono">{(item.recall * 100).toFixed(2)}%</td>
                            <td className="metric-mono">{(item.f1 * 100).toFixed(2)}%</td>
                            <td className="metric-mono">
                              TN: {item.tn} | FP: {item.fp} | FN: {item.fn} | TP: {item.tp}
                            </td>
                            <td>
                              <span className={`status-badge ${item.model === 'Random Forest' ? 'deployed' : 'candidate'}`}>
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Confusion Matrices Grid */}
                <section className="card">
                  <div className="card-header">
                    <div>
                      <h2 className="card-title"><LayersIcon /> Model Confusion Matrices</h2>
                      <p className="card-subtitle">Empirical confusion matrices generated during Day 4 evaluation</p>
                    </div>
                  </div>

                  <div className="cm-grid">
                    {MODEL_COMPARISON_DATA.map((item) => (
                      <div className="cm-card" key={item.model}>
                        <div className="cm-card-header">
                          <h3 className="cm-card-title">{item.model}</h3>
                          <span className={`status-badge ${item.model === 'Random Forest' ? 'deployed' : 'candidate'}`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="cm-img-container">
                          <img src={item.cmImage} alt={`${item.model} Confusion Matrix`} />
                        </div>
                        <div className="cm-details">
                          <div className="cm-detail-item">
                            <span>True Negatives (TN):</span>
                            <span className="cm-detail-value">{item.tn}</span>
                          </div>
                          <div className="cm-detail-item">
                            <span>False Positives (FP):</span>
                            <span className="cm-detail-value">{item.fp}</span>
                          </div>
                          <div className="cm-detail-item">
                            <span>False Negatives (FN):</span>
                            <span className="cm-detail-value">{item.fn}</span>
                          </div>
                          <div className="cm-detail-item">
                            <span>True Positives (TP):</span>
                            <span className="cm-detail-value">{item.tp}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* ======================================================== */}
            {/* PAGE 5: EXPLAINABILITY (SHAP)                            */}
            {/* ======================================================== */}
            {activePage === 'explainability' && (
              <>
                <div className="page-header">
                  <h1 className="page-title">Model Explainability (SHAP Analysis)</h1>
                  <p className="page-subtitle">
                    Shapley Additive exPlanations (SHAP) provide game-theoretic insight into how the 8 lexical features
                    drive Random Forest predictions across the validation cohort.
                  </p>
                </div>

                {/* SHAP Concept Card */}
                <div className="notice-box">
                  <LightbulbIcon className="notice-icon" />
                  <div className="notice-content">
                    <h4>Interpretability Principle: SHAP is an Explainability Method, Not an ML Model</h4>
                    <p>
                      SHAP calculates the fair marginal contribution of each feature to the model's output using cooperative game theory.
                      <strong> Important distinction:</strong> The charts below represent a <em>global explanation</em> of the trained Random Forest classifier
                      across the entire validation dataset (computed using <code>shap.TreeExplainer</code>).
                      They provide architectural transparency into model decision boundaries and are not recalculated per individual query.
                    </p>
                  </div>
                </div>

                {/* SHAP Visualizations Grid */}
                <div className="shap-grid">
                  <div className="shap-plot-card">
                    <div className="shap-plot-header">
                      <h3 className="shap-plot-title">Global Feature Importance (Bar Chart)</h3>
                      <p className="shap-plot-desc">
                        Ranks the 8 features by mean absolute SHAP value (<code>mean(|SHAP value|)</code>), revealing overall feature influence.
                      </p>
                    </div>
                    <div className="shap-img-container">
                      <img src="/shap_feature_importance_bar.png" alt="SHAP Feature Importance Bar Chart" />
                    </div>
                  </div>

                  <div className="shap-plot-card">
                    <div className="shap-plot-header">
                      <h3 className="shap-plot-title">SHAP Beeswarm Distribution Plot</h3>
                      <p className="shap-plot-desc">
                        Illustrates both magnitude and direction of feature impact (red = high feature value, blue = low feature value).
                      </p>
                    </div>
                    <div className="shap-img-container">
                      <img src="/shap_beeswarm.png" alt="SHAP Beeswarm Plot" />
                    </div>
                  </div>
                </div>

                {/* Eight Features Purpose & Role Breakdown */}
                <section className="card">
                  <div className="card-header">
                    <div>
                      <h2 className="card-title"><HashIcon /> Eight Lexical Features: Purpose & Importance</h2>
                      <p className="card-subtitle">Detailed breakdown of the 8 deterministic features sorted by empirical SHAP importance</p>
                    </div>
                  </div>

                  <div className="feature-table-wrapper">
                    <table className="feature-table">
                      <thead>
                        <tr>
                          <th>Feature Name</th>
                          <th>Mean |SHAP|</th>
                          <th>Security Significance</th>
                          <th>Analytical Rationale</th>
                        </tr>
                      </thead>
                      <tbody>
                        {SHAP_FEATURE_DATA.map((item) => (
                          <tr key={item.feature}>
                            <td>
                              <span className="feature-name-badge">{item.feature}</span>
                            </td>
                            <td className="metric-mono">
                              <strong>{item.importance.toFixed(5)}</strong>
                            </td>
                            <td style={{ fontWeight: 600, color: 'var(--text-dark)' }}>
                              {item.role}
                            </td>
                            <td style={{ color: 'var(--text-muted)' }}>
                              {item.desc}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Key Insight Takeaways */}
                <section className="card">
                  <div className="card-header">
                    <div>
                      <h2 className="card-title"><ShieldIcon /> Key Interpretability Takeaway</h2>
                      <p className="card-subtitle">Synthesizing the SHAP findings for executive presentation</p>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                    <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.35rem' }}>
                        1. Length Metrics Dominate Separation
                      </h4>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                        <code>subdomain_length</code> and <code>domain_length</code> contribute over 50% of the cumulative model decision weight.
                        Because exfiltration utilities must maximize bandwidth within DNS payload constraints, long subdomains are a hallmark of tunneling.
                      </p>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.35rem' }}>
                        2. Entropy Confirms Encryption
                      </h4>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                        High Shannon entropy in <code>subdomain_entropy</code> directly correlates with encrypted or base-encoded data payloads.
                        Natural language domains (e.g., brand names) have predictable, low-entropy vowel/consonant sequences.
                      </p>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.35rem' }}>
                        3. Label Stacking Signatures
                      </h4>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                        A high <code>label_count</code> reflects adversaries splitting long binary chunks into dot-separated labels
                        to conform to the 63-character per-label DNS RFC specification while exfiltrating maximum payload data.
                      </p>
                    </div>
                  </div>
                </section>
              </>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
