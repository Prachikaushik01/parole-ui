import { useState } from 'react'
import './App.css'

const activities = [
  { time: '10:42:08', action: 'Read project file', risk: 'Low', status: 'Allowed', tier: 'Tier 0', reason: 'Routine file access in the demo.' },
  { time: '10:43:15', action: 'Execute terminal command', risk: 'High', status: 'Blocked', tier: 'Tier 1', reason: 'Sample high-risk command flagged for review.' },
  { time: '10:44:02', action: 'Access environment file', risk: 'High', status: 'Blocked', tier: 'Tier 2', reason: 'Sample sensitive-file access flagged for review.' },
  { time: '10:45:21', action: 'Search documentation', risk: 'Low', status: 'Allowed', tier: 'Tier 0', reason: 'Routine documentation search in the demo.' },
]

const navItems = [
  { label: 'Overview', icon: '▦' },
  { label: 'Activity Logs', icon: '◷' },
  { label: 'Threats', icon: '⚠' },
  { label: 'Audit Logs', icon: '▤' },
]

function Logo() {
  return (
    <div className="brand">
      <span className="brand-icon">
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path d="M20 3 L34 9 V19 C34 28 28 34 20 38 C12 34 6 28 6 19 V9 Z" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M15 28 V12 H22 C27 12 29 15 29 19 C29 23 26 25 22 25 H15 M15 19 H22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span>parole<span className="dot">.</span></span>
    </div>
  )
}

function Metric({ label, value, note, icon }) {
  return (
    <div className="metric-card">
      <div className="metric-top"><span>{label}</span><span className="metric-icon">{icon}</span></div>
      <strong className="metric-value">{value}</strong>
      <span className="metric-note">{note}</span>
    </div>
  )
}

function ActivityTable({ items, onSelect }) {
  if (items.length === 0) {
    return <p className="muted">No matching demo events found.</p>
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr><th>TIME</th><th>AGENT ACTION</th><th>SECURITY TIER</th><th>RISK</th><th>DECISION</th></tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.time} className="clickable-row" onClick={() => onSelect(item)} tabIndex={0} onKeyDown={(event) => event.key === 'Enter' && onSelect(item)}>
              <td className="time-cell">{item.time}</td>
              <td>{item.action}</td>
              <td>{item.tier}</td>
              <td><span className={`risk ${item.risk.toLowerCase()}`}>{item.risk}</span></td>
              <td><span className={`decision ${item.status.toLowerCase()}`}><span className="decision-dot" />{item.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="table-hint">Select a row to view event details.</p>
    </div>
  )
}

function App() {
  const [activePage, setActivePage] = useState('Overview')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [search, setSearch] = useState('')

  const threats = activities.filter((item) => item.status === 'Blocked')
  const visibleActivities = (activePage === 'Threats' ? threats : activities).filter((item) =>
    `${item.action} ${item.risk} ${item.status} ${item.tier}`.toLowerCase().includes(search.toLowerCase())
  )

  function navigate(page) {
    setActivePage(page)
    setSelectedEvent(null)
    setSearch('')
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <Logo />
        <p className="menu-label">WORKSPACE</p>

        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`nav-item ${activePage === item.label ? 'active' : ''}`}
            onClick={() => navigate(item.label)}
          >
            <span>{item.icon}</span><span>{item.label}</span>
          </button>
        ))}

        <div className="sidebar-bottom">
          <span className="status-dot" />
          <div><strong>Protection preview</strong><small>Demo data only</small></div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <span>Workspace <span className="breadcrumb">/ {activePage}</span></span>
          <span className="top-status"><span className="status-dot" /> DEMO MODE</span>
        </header>

        {selectedEvent ? (
          <section className="detail-page">
            <button className="outline-button back-button" onClick={() => setSelectedEvent(null)}>← Back to {activePage}</button>
            <p className="eyebrow">EVENT INSPECTION</p>
            <h1>Action Details</h1>
            <p className="muted">Illustrative event from the frontend prototype.</p>
            <div className="panel detail-panel">
              <div className="panel-heading">
                <h2>{selectedEvent.action}</h2>
                <span className={`decision ${selectedEvent.status.toLowerCase()}`}>{selectedEvent.status}</span>
              </div>
              <div className="detail-grid">
                <div><span>Timestamp</span><strong>{selectedEvent.time}</strong></div>
                <div><span>Security tier</span><strong>{selectedEvent.tier}</strong></div>
                <div><span>Risk level</span><strong><span className={`risk ${selectedEvent.risk.toLowerCase()}`}>{selectedEvent.risk}</span></strong></div>
                <div><span>Decision</span><strong>{selectedEvent.status}</strong></div>
              </div>
              <div className="reason-box"><strong>Reason / demo explanation</strong><p>{selectedEvent.reason}</p></div>
              <p className="muted">This event is sample data. It does not represent a live security decision.</p>
            </div>
          </section>
        ) : (
          <>
            <section className="welcome">
              <div>
                <p className="eyebrow">AI AGENT GOVERNANCE</p>
                <h1>{activePage === 'Overview' ? 'Security Overview' : activePage}</h1>
                <p className="muted">
                  {activePage === 'Overview' && 'Monitor agent activity and review security decisions.'}
                  {activePage === 'Activity Logs' && 'Review illustrative actions and their decisions.'}
                  {activePage === 'Threats' && 'Inspect sample events marked as blocked.'}
                  {activePage === 'Audit Logs' && 'Review the sample event history for this prototype.'}
                </p>
              </div>
              <span className="date-label">FRONTEND PROTOTYPE</span>
            </section>

            {activePage === 'Overview' && (
              <>
                <section className="metrics">
                  <Metric label="Total Actions" value="1,284" note="Sample actions inspected" icon="↗" />
                  <Metric label="Allowed" value="1,192" note="Sample allowed actions" icon="✓" />
                  <Metric label="Blocked" value="92" note="Sample blocked actions" icon="⊘" />
                  <Metric label="High Risk" value="07" note="Sample alerts" icon="!" />
                </section>

                <section className="content-grid">
                  <div className="panel">
                    <div className="panel-heading"><div><h2>Security Pipeline</h2><p className="muted">Three-tier decision flow</p></div><span className="live-tag">DEMO</span></div>
                    <div className="tier"><span className="tier-number">01</span><div className="tier-info"><strong>Tier 0 · Local Cache</strong><p>Check known safe actions</p></div><span className="tier-state">FAST</span></div>
                    <div className="tier"><span className="tier-number">02</span><div className="tier-info"><strong>Tier 1 · Risk Classifier</strong><p>Assess action risk</p></div><span className="tier-state">ANALYZE</span></div>
                    <div className="tier"><span className="tier-number">03</span><div className="tier-info"><strong>Tier 2 · Deep Analysis</strong><p>Review complex cases</p></div><span className="tier-state">AI REVIEW</span></div>
                    <div className="pipeline-note">Agent action <span>→</span> Security checks <span>→</span> Decision</div>
                  </div>

                  <div className="panel">
                    <div className="panel-heading"><div><h2>Protection Status</h2><p className="muted">Prototype system overview</p></div><span className="status-label">PREVIEW</span></div>
                    <div className="protection"><div className="shield">✓</div><h3>Dashboard is ready</h3><p>This is a frontend prototype. Real security enforcement requires backend integration.</p></div>
                    <div className="mini-row"><span>Prompt injection checks</span><strong>Planned</strong></div>
                    <div className="mini-row"><span>Secret leakage checks</span><strong>Planned</strong></div>
                    <div className="mini-row"><span>Command risk checks</span><strong>Planned</strong></div>
                  </div>
                </section>

                <section className="panel activity-panel">
                  <div className="panel-heading"><div><h2>Recent Activity</h2><p className="muted">Illustrative sample events</p></div><button className="outline-button" onClick={() => navigate('Activity Logs')}>View all ↗</button></div>
                  <ActivityTable items={activities} onSelect={setSelectedEvent} />
                </section>
              </>
            )}

            {activePage === 'Activity Logs' && (
              <section className="panel page-panel">
                <div className="panel-heading"><div><h2>All Activity</h2><p className="muted">Select an event for its details.</p></div><span className="live-tag">4 DEMO EVENTS</span></div>
                <input className="search-input" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search actions, risk, tier..." />
                <ActivityTable items={visibleActivities} onSelect={setSelectedEvent} />
              </section>
            )}

            {activePage === 'Threats' && (
              <section className="panel page-panel">
                <div className="panel-heading"><div><h2>Flagged Events</h2><p className="muted">Sample blocked events for the demo.</p></div><span className="risk high">2 SAMPLE ALERTS</span></div>
                <input className="search-input" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search flagged events..." />
                <ActivityTable items={visibleActivities} onSelect={setSelectedEvent} />
              </section>
            )}

            {activePage === 'Audit Logs' && (
              <section className="panel page-panel">
                <div className="panel-heading"><div><h2>Audit Trail</h2><p className="muted">Chronological sample event record.</p></div><span className="live-tag">DEMO</span></div>
                <ActivityTable items={visibleActivities} onSelect={setSelectedEvent} />
              </section>
            )}
          </>
        )}

        <footer><span>PAROLE <span className="footer-dot">●</span> AI AGENT SECURITY</span><span>Frontend prototype · Sample data only</span></footer>
      </main>
    </div>
  )
}

export default App