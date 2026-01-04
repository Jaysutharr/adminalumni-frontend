import React, { useState, useEffect } from "react";
import "./ViewAll.css";
import axios from "axios";

const ViewAllJobs = ({ onBack }) => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:13417/api/v1/jobs");
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        setJobs(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="manage-wrapper">
      {/* Header */}
      <div className="manage-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2>View All Jobs</h2>

        <div className="manage-actions">
          <input
            type="text"
            placeholder="Search by title"
            className="search-input"
          />
          <button className="filter-btn">
            Filter <span>▾</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Date posted</th>
              <th>Job type</th>
              <th>Required</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job, i) => (
              <tr key={job._id || i}>
                <td>{job.title}</td>
                <td>{job.DatePosted}</td>
                <td>{job.JobType}</td>
                <td>{job.Required}</td>
                <td>
                  <span className="status-pill">{job.Status}</span>
                </td>
                <td>
                  <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#58a4b0' }}>View</button>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>No jobs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllJobs;
