import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import "./DonationTrackingDashboard.css"; // Reuse dashboard styles

const DonationTrackingManage = ({ onBack }) => {
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        fetchDonations();
    }, []);

    const fetchDonations = async () => {
        try {
            const response = await axios.get("http://localhost:13417/api/v1/getbyuserdonations/85201");
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

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this donation?")) {
            try {
                await axios.delete(`http://localhost:13417/api/v1/deletedonations/${id}`);
                alert("Donation deleted successfully!");
                fetchDonations();
            } catch (error) {
                console.error("Error deleting donation:", error);
                alert("Failed to delete donation.");
            }
        }
    };

    return (
        <div className="manage-wrapper">
            {/* Header */}
            <div className="manage-header d-flex justify-content-between align-items-center mb-4">
                <button className="btn btn-link text-decoration-none" onClick={onBack} style={{ color: '#58a4b0', fontWeight: 'bold' }}>← Back</button>
                <h2>Manage Donation</h2>
                <div style={{ width: '100px' }}></div> {/* Spacer */}
            </div>

            <div className="content-card">
                <div className="card-header">
                    <h4>Your Donations</h4>
                </div>

                <table className="article-table">
                    <thead>
                        <tr>
                            <th>Campaign Name</th>
                            <th>Date Posted</th>
                            <th>Category</th>
                            <th>Goal Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.length > 0 ? (
                            donations.map((donation) => (
                                <tr key={donation._id || donation.DonationId}>
                                    <td>{donation.CampaignTitle}</td>
                                    <td>{getFormattedDate(donation._id)}</td>
                                    <td>{donation.Categories}</td>
                                    <td>₹{donation.GoalAmount}</td>
                                    <td>
                                        <span className="status-pill">Published</span>
                                    </td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="link" id={`dropdown-${donation._id}`} className="p-0 text-dark">
                                                ⋮
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => alert("Edit functionality to be implemented")}>Edit</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleDelete(donation.DonationId || donation._id)} className="text-danger">Delete</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
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

export default DonationTrackingManage;
