import React, { useState } from 'react';
import axios from 'axios';

function UploadPanel({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    if (selected) {
      setPreview(URL.createObjectURL(selected));
    } else {
      setPreview(null);
    }
  };

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
      alert("Failed to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card full-width" style={{ marginBottom: '1.5rem' }}>
      <h2>1. Target Upload</h2>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <p style={{ color: 'var(--text-secondary)' }}>Upload an image or paste a social media URL to extract metadata and find traces.</p>
          <input 
            type="text" 
            placeholder="https://instagram.com/p/..." 
            style={{ marginTop: '1rem' }}
          />
          <input 
            type="file" 
            onChange={handleFileChange}
          />
          <button className="btn-primary" onClick={upload} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Image 🚀"}
          </button>
        </div>
        
        {preview && (
          <div style={{ width: '200px', textAlign: 'center' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Source Preview</p>
            <img 
              src={preview} 
              alt="Preview" 
              style={{ width: '100%', borderRadius: '0.5rem', border: '1px solid var(--border-color)', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }} 
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadPanel;
