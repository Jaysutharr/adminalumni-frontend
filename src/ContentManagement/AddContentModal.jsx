import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddContentModal.css";

const AddContentModal = ({ onClose, contentToEdit }) => {
    const [formData, setFormData] = useState({
        contentId: "",
        title: "",
        DatePosted: new Date().toISOString().split('T')[0], // Default to current date YYYY-MM-DD
        Author: "",
        Category: "",
        Engagement: "",
        Status: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (contentToEdit) {
            setFormData({
                contentId: contentToEdit.contentId || "",
                title: contentToEdit.title || "",
                DatePosted: contentToEdit.DatePosted ? new Date(contentToEdit.DatePosted).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                Author: contentToEdit.Author || "",
                Category: contentToEdit.Category || "",
                Engagement: contentToEdit.Engagement || "",
                Status: contentToEdit.Status || ""
            });
        }
    }, [contentToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            let response;
            if (contentToEdit) {
                response = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/updatecontent/${contentToEdit._id}`, formData, {
                    headers: { 'Content-Type': 'application/json' }
                });
            } else {
                response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/addcontent`, formData, {
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            if (response.status === 200 || response.status === 201) {
                setSuccess(true);
                setTimeout(() => {
                    onClose(); // Close modal on success after a brief delay
                }, 1500);
            }
        } catch (err) {
            setError(err.message || "An error occurred while adding content.");
            console.error("Error adding content:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-card">
                <div className="modal-header">
                    <h3>{contentToEdit ? "Edit Content" : "Add Content"}</h3>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                {success ? (
                    <div className="success-message">Content {contentToEdit ? "updated" : "added"} successfully! Closing...</div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <label>Content ID<span>*</span></label>
                        <input
                            type="text"
                            name="contentId"
                            value={formData.contentId}
                            onChange={handleChange}
                            placeholder="Enter Content ID"
                            required
                        />

                        <label>Title<span>*</span></label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter Title"
                            required
                        />

                        <label>Date Posted</label>
                        <input
                            type="date"
                            name="DatePosted"
                            value={formData.DatePosted}
                            onChange={handleChange}
                        />

                        <label>Author<span>*</span></label>
                        <input
                            type="text"
                            name="Author"
                            value={formData.Author}
                            onChange={handleChange}
                            placeholder="Enter Author Name"
                            required
                        />

                        <label>Category<span>*</span></label>
                        <input
                            type="text"
                            name="Category"
                            value={formData.Category}
                            onChange={handleChange}
                            placeholder="e.g. Blog, News"
                            required
                        />

                        <label>Engagement<span>*</span></label>
                        <input
                            type="text"
                            name="Engagement"
                            value={formData.Engagement}
                            onChange={handleChange}
                            placeholder="e.g. 1200 views"
                            required
                        />

                        <label>Status<span>*</span></label>
                        <input
                            type="text"
                            name="Status"
                            value={formData.Status}
                            onChange={handleChange}
                            placeholder="e.g. Published"
                            required
                        />

                        {error && <div className="error-message">{error}</div>}

                        <div className="modal-actions">
                            <button type="button" className="discard-btn" onClick={onClose} disabled={loading}>
                                Discard
                            </button>
                            <button type="submit" className="create-btn" disabled={loading}>
                                {loading ? "Saving..." : (contentToEdit ? "Update Content" : "Add Content")}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AddContentModal;
