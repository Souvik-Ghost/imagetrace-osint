# 🌐 ImageTrace OSINT Platform

**ImageTrace OSINT Platform** is a fully web-based, open-source OSINT platform.

## 🧠 Core Capabilities
1. Social media image collection
2. Metadata extraction
3. Reverse image search
4. Location detection (geo inference)
5. Similar image matching
6. Timeline reconstruction
7. Automated report generation

## 🏗️ System Architecture
- Frontend (React Dashboard)
- FastAPI Backend
- Multi-Agent Engine (Collector, Metadata, Reverse Search, Geo-Location, Matcher, Report Generator)

## 🧱 Setup Instructions

### 🐳 Using Docker (Recommended)
1. Ensure Docker Desktop is installed.
2. Run `docker-compose up --build` from the root directory.

### 💻 Local Setup
#### Backend Setup:
1. `cd backend`
2. `pip install -r requirements.txt`
3. `uvicorn main:app --reload`
#### Frontend Setup:
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## 🔎 Investigation Workflow
Upload image / paste URL -> Collector Agent -> Metadata Agent -> Reverse Search Agent -> Geo Location Agent -> Image Matching Agent -> Report Agent -> Web Dashboard + PDF
