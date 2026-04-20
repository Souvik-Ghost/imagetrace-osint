import React from 'react';

function ReportView({ data }) {
  if (!data) return null;

  return (
    <div className="glass-card full-width" style={{ textAlign: 'center' }}>
      <h2>5. Investigation Report</h2>
      <p style={{ color: 'var(--text-secondary)' }}>Automated report generated successfully.</p>
      <button className="btn-primary" style={{ width: 'auto', background: '#10b981' }} onClick={() => alert(`Downloading ${data}`)}>
        Download PDF Report
      </button>
    </div>
  );
}

export default ReportView;
