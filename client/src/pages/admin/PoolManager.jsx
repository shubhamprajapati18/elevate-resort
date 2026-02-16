import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import SectionEditor from "../../components/admin/SectionEditor";
import "./RoomsManager.css";

const PoolManager = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <header className="admin-header">
          <h1>Manage Pool & Leisure</h1>
        </header>

        <div
          className="content-container"
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "8px",
          }}
        >
          <SectionEditor sectionId="pool" title="Pool & Leisure Content" />
        </div>
      </div>
    </div>
  );
};

export default PoolManager;
