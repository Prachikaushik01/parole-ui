
import { useState } from 'react'
import './Landing.css'

export default function Landing({ onOpenDashboard }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="landing" id="home">
      <header className="landing-nav">
        <a className="landing-brand" href="#home" aria-label="Parole home">
          <span className="brand-mark">P</span>
          <span>parole<span className="blue-dot">.</span></span>
        </a>

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav className={`landing-links ${menuOpen ? 'menu-open' : ''}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#technology" onClick={() => setMenuOpen(false)}>Technology</a>
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
        </nav>

        <button className="open-dashboard" onClick={onOpenDashboard}>
          Open Dashboard <span>↗</span>
        </button>
      </header>

      <main>
        <section className="landing-hero">
          <div className="hero-copy">
            <p className="blue-eyebrow">AI AGENT SECURITY</p>
            <h1>
              Secure
              <br />Every Agent
              <br /><span>Every Action</span>
            </h1>

            <p className="hero-description">
              Parole is an AI-agent security layer designed to monitor
              agent activity, identify risky actions and provide
              visibility into security decisions.
            </p>

            <div className="hero-actions">
              <button className="primary-cta" onClick={onOpenDashboard}>
                Explore Dashboard <span>→</span>
              </button>
              <a className="secondary-cta" href="#technology">
                Discover Technology <span>↓</span>
              </a>
            </div>
          </div>

          <div className="ribbon-scene" aria-hidden="true">
            <div className="ribbon-orbit orbit-one" />
            <div className="ribbon-orbit orbit-two" />
            <div className="ribbon ribbon-back" />
            <div className="ribbon ribbon-main" />
            <div className="ribbon ribbon-inner" />
            <div className="ribbon ribbon-thread" />
            <span className="ribbon-light light-one" />
            <span className="ribbon-light light-two" />
            <span className="ribbon-light light-three" />
          </div>

          <div className="hero-points">
            <p><i /> Real-time Monitoring</p>
            <p><i /> Risk Detection</p>
            <p><i /> Policy Enforcement</p>
            <p><i /> Complete Visibility</p>
          </div>

          <div className="hero-bottom-note">
            <span className="pulse-dot" />
            A SECURITY LAYER FOR AI AGENTS
          </div>
        </section>

        <section className="technology-section" id="technology">
          <p className="technology-label">WHY US</p>
          <h2>Our Technology</h2>
          <p className="section-description">
            Visibility, intelligent risk analysis and control—designed
            for autonomous agent workflows.
          </p>

          <div className="technology-grid">
            <article className="technology-card">
              <div className="technology-icon">◈</div>
              <h3>AgentShield<br />Core</h3>
              <div className="card-line" />
              <p>
                A security layer designed to monitor, analyze and
                control AI-agent actions with clear security decisions.
              </p>
            </article>

            <article className="technology-card">
              <div className="technology-icon">⬡</div>
              <h3>Intelligent<br />Risk Engine</h3>
              <div className="card-line" />
              <p>
                Evaluate potentially harmful behaviour across
                commands, files and agent workflows.
              </p>
            </article>

            <article className="technology-card">
              <div className="technology-icon">⌘</div>
              <h3>Secure<br />Agent Network</h3>
              <div className="card-line" />
              <p>
                Bring agent activity and security decisions into
                one clear monitoring interface.
              </p>
            </article>
          </div>
        </section>

        <section className="landing-stats" id="features">
          <div><strong>3-Tier</strong><span>Security Pipeline Design</span></div>
          <div><strong>Risk-aware</strong><span>Action Assessment</span></div>
          <div><strong>Unified</strong><span>Activity Visibility</span></div>
          <div><strong>24/7</strong><span>Protection Goal</span></div>
        </section>

        <section className="landing-cta">
          <div>
            <p className="blue-eyebrow">EXPLORE PAROLE</p>
            <h2>See your security workspace.</h2>
            <p>Review sample events, risks and security decisions.</p>
          </div>
          <button className="primary-cta" onClick={onOpenDashboard}>
            Enter Dashboard <span>→</span>
          </button>
        </section>

        <footer className="landing-footer">
          <span>PAROLE<span className="blue-dot">.</span> AI AGENT SECURITY</span>
          <span>Frontend prototype · Sample data only</span>
        </footer>
      </main>
    </div>
  )
}
