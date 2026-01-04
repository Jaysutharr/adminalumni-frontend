import React from "react";
import "./ViewAll.css";

const ManageArticles = ({ onBack, contents }) => {
  return (
    <div className="manage-wrapper">
      {/* Header */}
      <div className="manage-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2>View All articles/blogs</h2>

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
              <th>Title</th>
              <th>Date posted</th>
              <th>Category</th>
              <th>Engage.</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {contents && contents.length > 0 ? (
              contents.map((content) => (
                <tr key={content._id || content.contentId}>
                  <td>{content.title}</td>
                  <td>{content.DatePosted}</td>
                  <td>{content.Category}</td>
                  <td>{content.Engagement}</td>
                  <td className="status">{content.Status}</td>
                  <td className="dots">⋮</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>No content found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageArticles;
