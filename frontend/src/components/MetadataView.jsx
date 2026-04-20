import React from 'react';

function MetadataView({ data }) {
  if (!data) return null;

  return (
    <div className="glass-card">
      <h2>2. EXIF Metadata</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><strong>Camera:</strong> {data.camera}</li>
        <li><strong>Date:</strong> {data.timestamp}</li>
        <li><strong>Software:</strong> {data.software}</li>
        <li><strong>GPS:</strong> {data.gps}</li>
      </ul>
    </div>
  );
}

export default MetadataView;
