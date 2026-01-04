import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UpdateEventModel.css";

const UpdateEventModel = ({ onClose, eventData }) => {
    const [formData, setFormData] = useState({
        eventId: "",
        EventName: "",
        DateTime: "",
        EventType: "In-person",
        NoOfAttendees: "",
        Status: "published",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (eventData) {
            // Mapping potential incoming data to our form structure
            // Adjust keys if whatever `eventData` passed has different casing
            setFormData({
                eventId: eventData.eventId || eventData.id || 1, // Fallback to 1 for testing if no ID
                EventName: eventData.EventName || eventData.name || "",
                DateTime: eventData.DateTime || eventData.dateTime || "",
                EventType: eventData.EventType || eventData.type || "In-person",
                NoOfAttendees: eventData.NoOfAttendees || eventData.attendees || "",
                Status: eventData.Status || eventData.status || "published",
            });
        }
    }, [eventData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        // Validate required fields
        if (!formData.EventName || !formData.DateTime || !formData.NoOfAttendees) {
            setError("Please fill in all required fields.");
            setLoading(false);
            return;
        }

        if (!formData.eventId) {
            setError("Event ID is missing. Cannot update event.");
            setLoading(false);
            return;
        }

        const payload = {
            EventName: formData.EventName,
            DateTime: formData.DateTime,
            EventType: formData.EventType,
            NoOfAttendees: String(formData.NoOfAttendees),
            Status: formData.Status,
        };

        try {
            const response = await axios.put(
                `http://localhost:13417/api/v1/updateeventDetails/${formData.eventId}`,
                payload
            );

            // Success handling
            if (response.status === 200 && response.data) {
                alert(`Event updated successfully!\n\nEvent: ${response.data.EventName}\nDate: ${response.data.DateTime}\nStatus: ${response.data.Status}`);
                onClose();
                // Optionally refresh the parent component
                if (window.location) {
                    window.location.reload();
                }
            }
        } catch (err) {
            console.error("Error updating event:", err);

            // Comprehensive error handling
            if (err.response) {
                // Server responded with an error status
                const status = err.response.status;
                const errorData = err.response.data;

                if (status === 400) {
                    // Validation error
                    setError(errorData.message || "Invalid input data. Please check your fields.");
                } else if (status === 404) {
                    // Event not found
                    setError("Event not found. It may have been deleted.");
                } else if (status === 500) {
                    // Server error
                    setError("Server error occurred. Please try again later.");
                } else {
                    // Other errors
                    setError(errorData.message || `Error: ${status}. Unable to update event.`);
                }
            } else if (err.request) {
                // Request made but no response received
                setError("Network error. Please check your connection and try again.");
            } else {
                // Something else happened
                setError("An unexpected error occurred while updating the event.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-card">
                {/* Header */}
                <div className="modal-header">
                    <h3>Update Event</h3>
                    <button className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                {/* Body */}
                <div className="modal-body">
                    {error && <p className="text-danger">{error}</p>}

                    {/* Event ID (Hidden or Read-only) */}
                    {/* <input type="hidden" name="eventId" value={formData.eventId} /> */}

                    {/* Event name */}
                    <div className="form-group">
                        <label>
                            Event name<span>*</span>
                        </label>
                        <input
                            type="text"
                            name="EventName"
                            value={formData.EventName}
                            onChange={handleChange}
                            placeholder="Event Name"
                        />
                    </div>

                    {/* Date Time */}
                    <div className="form-group">
                        <label>
                            Date & Time<span>*</span>
                        </label>
                        <input
                            type="date"
                            name="DateTime"
                            value={formData.DateTime}
                            onChange={handleChange}
                        />
                    </div>

                    {/* No Of Attendees */}
                    <div className="form-group">
                        <label>
                            No Of Attendees<span>*</span>
                        </label>
                        <input
                            type="number"
                            name="NoOfAttendees"
                            value={formData.NoOfAttendees}
                            onChange={handleChange}
                            placeholder="100"
                        />
                    </div>

                    {/* Category */}
                    <div className="form-group">
                        <label>
                            Event Type<span>*</span>
                        </label>
                        <select name="EventType" value={formData.EventType} onChange={handleChange}>
                            <option value="In-person">In-person</option>
                            <option value="Online">Online</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div className="form-group">
                        <label>
                            Status<span>*</span>
                        </label>
                        <select name="Status" value={formData.Status} onChange={handleChange}>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="Upcoming">Upcoming</option>
                        </select>
                    </div>

                    <div className="form-footer" style={{ textAlign: 'right', marginTop: '20px' }}>
                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Event"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UpdateEventModel;
