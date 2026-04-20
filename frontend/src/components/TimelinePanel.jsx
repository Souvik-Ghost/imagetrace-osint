import React from 'react';

export default function TimelinePanel({ data }) {
  if (!data) return null;

  return (
    <div className="glass-card">
      <h2>5. Timeline</h2>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem', color: 'var(--text-secondary)' }}>
        {data.map((item, index) => (
          <li key={index} style={{ padding: '0.5rem 0', borderBottom: index < data.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
            <strong style={{ color: 'var(--text-primary)' }}>{item.date}</strong> - {item.event}
          </li>
        ))}
      </ul>
    </div>
  )
}
