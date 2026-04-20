from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import time

app = FastAPI(
    title="ImageTrace OSINT Platform",
    description="Backend API for the ImageTrace OSINT Platform",
    version="1.0.0"
)

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the ImageTrace OSINT Platform API"}

@app.post("/upload")
async def run_investigation(file: UploadFile = File(...)):
    # Simulate processing time
    time.sleep(1.5)
    
    # This will eventually orchestrate the Multi-Agent Engine
    return {
        "status": "success",
        "job_id": "12345",
        "filename": file.filename,
        "metadata": {
            "camera": "Canon EOS",
            "timestamp": "2025-04-12 14:30:00",
            "gps": "13.0827, 80.2707",
            "software": "Adobe Photoshop (Warning: Edited)"
        },
        "location": {
            "lat": 13.0827,
            "lng": 80.2707,
            "name": "Chennai, India"
        },
        "similar_images": {
            "yandex_matches": 12,
            "google_matches": 5,
            "duplicates_found": 2,
            "images": [
                "https://via.placeholder.com/150/0f172a/3b82f6?text=Orig",
                "https://via.placeholder.com/150/334155/60a5fa?text=Match+1",
                "https://via.placeholder.com/150/1e293b/93c5fd?text=Match+2"
            ]
        },
        "timeline": [
            {"date": "2024-01-10", "event": "First seen on deep web"},
            {"date": "2025-04-12", "event": "Shared on Twitter (Viral)"},
            {"date": "2026-02-20", "event": "Re-uploaded with manipulation"}
        ],
        "report_url": "/reports/sample_report_12345.pdf"
    }
