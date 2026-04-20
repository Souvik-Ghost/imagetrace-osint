import React from 'react';

function SimilarImages({ data }) {
  if (!data) return null;

  return (
    <div className="glass-card full-width">
      <h2>4. Reverse Search & Matching</h2>
      <div className="image-grid" style={{ marginTop: '1rem' }}>
        {data.images.map((img, i) => (
          <img key={i} src={img} alt={`match-${i}`} />
        ))}
      </div>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div style={{ background: '#334155', flex: 1, padding: '1rem', borderRadius: '0.5rem' }}>
          <p><strong>Yandex:</strong> {data.yandex_matches} matches</p>
        </div>
        <div style={{ background: '#334155', flex: 1, padding: '1rem', borderRadius: '0.5rem' }}>
          <p><strong>Google:</strong> {data.google_matches} matches</p>
        </div>
        <div style={{ background: '#334155', flex: 1, padding: '1rem', borderRadius: '0.5rem' }}>
          <p><strong>pHash:</strong> {data.duplicates_found} Manipulated Duplicates found</p>
        </div>
      </div>
    </div>
  );
}

export default SimilarImages;
