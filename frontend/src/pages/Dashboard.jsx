import React, { useState } from "react";
import Navbar from "../components/Navbar";
import UploadPanel from "../components/UploadPanel";
import MetadataView from "../components/MetadataView";
import MapView from "../components/MapView";
import SimilarImages from "../components/SimilarImages";
import TimelinePanel from "../components/TimelinePanel";
import ReportView from "../components/ReportView";

export default function Dashboard() {
  const [analysisData, setAnalysisData] = useState(null);

  const handleUploadSuccess = (data) => {
    setAnalysisData(data);
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      
      <UploadPanel onUploadSuccess={handleUploadSuccess} />
      
      {analysisData && (
        <>
          <div className="dashboard-grid">
            <MetadataView data={analysisData.metadata} />
            <MapView data={analysisData.location} />
          </div>

          <div className="dashboard-grid">
            <SimilarImages data={analysisData.similar_images} />
            <TimelinePanel data={analysisData.timeline} />
          </div>

          <ReportView data={analysisData.report_url} />
        </>
      )}
    </div>
  )
}
