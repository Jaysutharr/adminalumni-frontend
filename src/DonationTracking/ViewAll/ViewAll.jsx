import React, { useState, useEffect } from "react";
import axios from "axios";
import "../DonationTrackingDashboard.css"; // Reuse dashboard styles

const ViewAllDonations = ({ onBack }) => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      // Fetch ALL donations
      const response = await axios.get("http://localhost:13417/api/v1/donations");
      setDonations(response.data);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  const getFormattedDate = (id) => {
    if (!id) return "N/A";
    const timestamp = parseInt(id.substring(0, 8), 16) * 1000;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="manage-wrapper">
      {/* Header */}
      <div className="manage-header d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-link text-decoration-none" onClick={onBack} style={{ color: '#58a4b0', fontWeight: 'bold' }}>← Back</button>
        <h2>View All Donations</h2>
        <div style={{ width: '100px' }}></div> {/* Spacer */}
      </div>

      <div className="content-card">
        <div className="card-header">
          <h4>All Campaigns</h4>
        </div>

        <table className="article-table">
          <thead>
            <tr>
              <th>Campaign Name</th>
              <th>Date Posted</th>
              <th>Posted By (User ID)</th>
              <th>Category</th>
              <th>Goal Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {donations.length > 0 ? (
              donations.map((donation) => (
                <tr key={donation._id || donation.DonationId}>
                  <td>{donation.CampaignTitle}</td>
                  <td>{getFormattedDate(donation._id)}</td>
                  <td>{donation.userId}</td>
                  <td>{donation.Categories}</td>
                  <td>₹{donation.GoalAmount}</td>
                  <td>
                    <span className="status-pill">Published</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>No donations found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllDonations;
