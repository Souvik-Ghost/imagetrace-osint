import os
import shutil
import uuid
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from agents.metadata_agent import extract_metadata
from agents.matcher_agent import get_image_fingerprint

app = FastAPI(
    title="ImageTrace OSINT Platform",
    description="Real-world OSINT investigative backend.",
    version="1.1.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads")
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@app.get("/api")
def read_root():
    return {"message": "ImageTrace OSINT API is Online (v1.1)."}

@app.post("/api/upload")
async def run_investigation(file: UploadFile = File(...)):
    """
    Primary endpoint for image-based investigations.
    Saves file, runs agents, and returns consolidated intelligence.
    """
    try:
        # 1. Save uploaded file to disk
        file_ext = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_ext}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # 2. Invoke Metadata Agent
        metadata = extract_metadata(file_path)
        
        # 3. Invoke Matcher Agent (Fingerprinting)
        fingerprint = get_image_fingerprint(file_path)
        
        # 4. Synthesize Location (If Metadata found GPS)
        location = {
            "lat": 13.0827, # Default fallback if no GPS
            "lng": 80.2707,
            "name": "Default (Chennai, India)",
            "found": False
        }
        
        if metadata.get("gps"):
            location = {
                "lat": metadata["gps"]["lat"],
                "lng": metadata["gps"]["lng"],
                "name": "Extracted from EXIF",
                "found": True
            }
            
        return {
            "status": "success",
            "job_id": str(uuid.uuid4()),
            "filename": file.filename,
            "fingerprint": fingerprint,
            "metadata": {
                "camera": metadata.get("camera", "Unknown"),
                "model": metadata.get("model", "Unknown"),
                "software": metadata.get("software", "None"),
                "timestamp": metadata.get("timestamp", "Unknown"),
                "gps": str(metadata.get("gps", "Not Found"))
            },
            "location": location,
            "similar_images": {
                "fingerprint_match": fingerprint,
                "matches": [
                    "https://via.placeholder.com/150/0f172a/3b82f6?text=Orig",
                    "https://via.placeholder.com/150/334155/60a5fa?text=Sim-1"
                ]
            },
            "timeline": [
                {"date": "2024-01-10", "event": "Simulated: Archive check result"},
                {"date": metadata.get("timestamp", "2025"), "event": "Actual: Image Capture Metadata"}
            ],
            "report_url": f"/reports/{unique_filename}.pdf"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Optional: cleanup file or keep for further analysis
        pass
