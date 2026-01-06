import React, { useState } from "react";
import "./AddJobModal.css";
import axios from "axios";

const AddJobModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        title: "",
        DatePosted: new Date().toISOString().split('T')[0], // Default to today
        JobType: "Full-Time",
        Required: "",
        Status: "Posted",
        Companyname: "",
        CompanyOverview: "",
        RoleAndResposiblity: "",
        CandidateQualification: "",
        RequiredSkills: ""
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/jobs`, {
                ...formData,
                Required: Number(formData.Required)
            });

            if (response.status === 201) {
                alert("Job posted successfully!");
                onClose();
                // You might want to trigger a refresh of the job list here
            }
        } catch (err) {
            console.error("Error adding job:", err);
            setError("Failed to post job. Please try again.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-contents">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>Post a New Job</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Job Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Software Engineer"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Company Name</label>
                        <input
                            type="text"
                            name="Companyname"
                            value={formData.Companyname}
                            onChange={handleChange}
                            placeholder="e.g. Tech Corp"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Date Posted</label>
                        <input
                            type="date"
                            name="DatePosted"
                            value={formData.DatePosted}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Job Type</label>
                        <select
                            name="JobType"
                            value={formData.JobType}
                            onChange={handleChange}
                        >
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Remote">Remote</option>
                            <option value="On-site">On-site</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Positions Required</label>
                        <input
                            type="number"
                            name="Required"
                            value={formData.Required}
                            onChange={handleChange}
                            placeholder="e.g. 5"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Status</label>
                        <select
                            name="Status"
                            value={formData.Status}
                            onChange={handleChange}
                        >
                            <option value="Posted">Posted</option>
                            <option value="Draft">Draft</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Company Overview</label>
                        <textarea
                            name="CompanyOverview"
                            value={formData.CompanyOverview}
                            onChange={handleChange}
                            placeholder="Brief description of the company"
                        />
                    </div>

                    <div className="form-group">
                        <label>Role and Responsibility</label>
                        <textarea
                            name="RoleAndResposiblity"
                            value={formData.RoleAndResposiblity}
                            onChange={handleChange}
                            placeholder="What will the candidate do?"
                        />
                    </div>

                    <div className="form-group">
                        <label>Candidate Qualification</label>
                        <textarea
                            name="CandidateQualification"
                            value={formData.CandidateQualification}
                            onChange={handleChange}
                            placeholder="Required qualifications"
                        />
                    </div>

                    <div className="form-group">
                        <label>Required Skills</label>
                        <textarea
                            name="RequiredSkills"
                            value={formData.RequiredSkills}
                            onChange={handleChange}
                            placeholder="e.g. React, Node.js, Python"
                        />
                    </div>

                    <div className="button-group">
                        <button type="button" className="cancel-button" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="submit-button">
                            Published
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddJobModal;
