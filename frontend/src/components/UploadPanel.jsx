import React, { useState } from 'react';
import axios from 'axios';

function UploadPanel({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/upload", form);
      onUploadSuccess(response.data);
    } catch (err) {
      console.error("Backend connection failed:", err);
      // Fallback mock in case backend is down
      alert("Failed to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card full-width" style={{ marginBottom: '1.5rem' }}>
      <h2>1. Target Upload</h2>
      <p style={{ color: 'var(--text-secondary)' }}>Upload an image or paste a social media URL to extract metadata and find traces.</p>
      <input 
        type="text" 
        placeholder="https://instagram.com/p/..." 
      />
      <input 
        type="file" 
        onChange={e => setFile(e.target.files[0])}
      />
      <button className="btn-primary" onClick={upload} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Image 🚀"}
      </button>
    </div>
  );
}

export default UploadPanel;
