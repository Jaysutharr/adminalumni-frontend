import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, InputGroup, Button, Container, Row, Col, Dropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';  // Make sure Bootstrap is imported
import 'bootstrap-icons/font/bootstrap-icons.css';
// import { FaSearch } from 'react-icons/fa';
import EventDashboard from './EventDashboard';
import { BsCalendar, BsChevronUp, BsChevronLeft, BsChevronDown } from "react-icons/bs";
import UpdateEventModel from "./CreateEvent/UpdateEventModel";


const EventManage = () => {
  // State for events data
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isOpen, setIsOpen] = useState({}); // Changed to object for individual dropdowns
  const [showEventType, setShowEventType] = useState(false);
  const [showEventStatus, setShowEventStatus] = useState(false);

  // Update Modal State
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const baseUrl = (process.env.REACT_APP_API_BASE_URL || "http://localhost:13417").replace(/\/$/, "");
        const response = await axios.get(`${baseUrl}/api/v1/vieweventDetails`);


        if (response.data && Array.isArray(response.data)) {
          setEvents(response.data);
        } else if (response.data && response.data.data) {
          setEvents(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const toggleMenu = (index) => {
    setIsOpen(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setShowUpdateModal(true);
    // Close dropdown
    setIsOpen({});
  };

  const handleBack = () => { window.history.back(); };

  return (
    <>

      <EventDashboard />

      {showUpdateModal && (
        <UpdateEventModel
          onClose={() => setShowUpdateModal(false)}
          eventData={selectedEvent}
        />
      )}

      <div style={{ marginLeft: '280px', marginTop: '20px' }}>
        <svg onClick={handleBack}
          marginLeft='320px' width="25" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.75 18.75H33.75C34.0815 18.75 34.3995 18.8817 34.6339 19.1161C34.8683 19.3505 35 19.6685 35 20C35 20.3315 34.8683 20.6495 34.6339 20.8839C34.3995 21.1183 34.0815 21.25 33.75 21.25H8.75C8.41848 21.25 8.10054 21.1183 7.86612 20.8839C7.6317 20.6495 7.5 20.3315 7.5 20C7.5 19.6685 7.6317 19.3505 7.86612 19.1161C8.10054 18.8817 8.41848 18.75 8.75 18.75Z" fill="#1B1B1E" />
          <path d="M9.26973 19.9996L19.6372 30.3646C19.8719 30.5993 20.0038 30.9177 20.0038 31.2496C20.0038 31.5816 19.8719 31.8999 19.6372 32.1346C19.4025 32.3693 19.0842 32.5012 18.7522 32.5012C18.4203 32.5012 18.1019 32.3693 17.8672 32.1346L6.61723 20.8846C6.50083 20.7685 6.40847 20.6306 6.34545 20.4787C6.28244 20.3268 6.25 20.164 6.25 19.9996C6.25 19.8352 6.28244 19.6724 6.34545 19.5205C6.40847 19.3687 6.50083 19.2307 6.61723 19.1146L17.8672 7.86463C18.1019 7.62991 18.4203 7.49805 18.7522 7.49805C19.0842 7.49805 19.4025 7.62991 19.6372 7.86463C19.8719 8.09934 20.0038 8.41769 20.0038 8.74963C20.0038 9.08156 19.8719 9.39991 19.6372 9.63463L9.26973 19.9996Z" fill="#1B1B1E" />
        </svg>
      </div>
      <Container

        style={{
          padding: '10px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          width: '100%',
          maxWidth: '1070px',
          marginLeft: '300px',
          borderRadius: '12px',
          marginTop: '-26px',
          marginLeft: '320px'
        }}
      >
        {/* Header Section */}
        <Row className="align-items-center mb-3">
          <Col>
            <h3 style={{ color: '#58a4b0' }}>Manage Events</h3>
          </Col>
          <Col className="d-flex justify-content-end">
            <InputGroup>
              {/* <FaSearch
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#58a4b0',
              }}
              ></FaSearch> */}
              <Form.Control
                type="text"
                placeholder="Search by event name"
                aria-label="Search by event name"
                style={{ borderRadius: '12px', marginRight: '10px' }}

              />
            </InputGroup>

            <Dropdown drop="down" style={{ position: "relative", width: '200px', }}>
              {/* Filter Button */}
              <Dropdown.Toggle
                variant="light"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: '12px',
                  height: '35px'
                }}
              >
                <span >Filter</span>
              </Dropdown.Toggle>

              {/* Main Dropdown Menu */}
              <Dropdown.Menu
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  width: "100px",
                }}
              >
                {/* Start Date */}
                <Form.Group>
                  <Form.Label style={{ display: "flex", alignItems: "center" }}>
                    Start date <BsCalendar style={{ marginLeft: "auto" }} />
                  </Form.Label>
                  <Form.Control type="date" />
                </Form.Group>

                {/* Event Type */}
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onClick={() => setShowEventType(!showEventType)} // Toggle Event Type menu
                >
                  <BsChevronLeft style={{ marginRight: "5px" }} />
                  <span>Event type</span>

                  {/* Event Type Submenu */}
                  {showEventType && (
                    <div
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "100%", // Position to the left of the parent menu
                        background: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        width: "150px",
                        padding: "10px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div style={{ cursor: "pointer", marginBottom: "5px" }}>
                        In-person
                      </div>
                      <div style={{ cursor: "pointer", marginBottom: "5px" }}>Online</div>
                      <div style={{ cursor: "pointer" }}>Hybrid</div>
                    </div>
                  )}
                </div>

                {/* Event Status */}
                <div
                  style={{
                    marginTop: "3px",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onClick={() => setShowEventStatus(!showEventStatus)} // Toggle Event Status menu
                >
                  <BsChevronLeft style={{ marginRight: "5px" }} />
                  <span>Event Status</span>

                  {/* Event Status Submenu */}
                  {showEventStatus && (
                    <div
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "100%", // Position to the left of the parent menu
                        background: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        width: "150px",
                        padding: "10px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div style={{ cursor: "pointer", marginBottom: "2px" }}>
                        Published
                      </div>
                      <div style={{ cursor: "pointer", marginBottom: "2px" }}>
                        Draft
                      </div>
                      <div style={{ cursor: "pointer" }}>Cancelled</div>
                    </div>
                  )}
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        {/* Table Header */}
        <Row className="fw-bold border-bottom py-2 text-center" >
          <Col xs={12} sm={6} md={3} lg={2}>Event Name</Col>
          <Col xs={12} sm={6} md={3} lg={2}>Date/Time</Col>
          <Col xs={12} sm={6} md={3} lg={2}>Event Type</Col>
          <Col xs={12} sm={6} md={3} lg={2}>Attendees</Col>
          <Col xs={12} sm={6} md={3} lg={2}>Status</Col>
          <Col xs={12} sm={6} md={3} lg={2}>Action</Col>
        </Row>

        {/* Scrollable Grid List */}
        <div
          style={{
            maxHeight: '420px', // Limit the height for scrolling
            overflowY: 'auto', // Enable vertical scrolling
            overflowX: 'hidden',
            scrollbarWidth: 'none', // For Firefox
            msOverflowStyle: 'none',
          }}
        >
          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p>Loading events...</p>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
              <p>Error: {error}</p>
              <button onClick={() => window.location.reload()} className="btn btn-primary">Retry</button>
            </div>
          ) : events.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p>No events found.</p>
            </div>
          ) : (
            events.map((event, index) => (
              <Row
                key={event.eventId || index}
                className="py-2 align-items-center border-bottom text-center"
                style={{ fontSize: '14px' }}>
                <Col xs={12} sm={6} md={3} lg={2}>{event.EventName || event.name || 'N/A'}</Col>
                <Col xs={12} sm={6} md={3} lg={2}>{event.DateTime || event.dateTime || 'N/A'}</Col>
                <Col xs={12} sm={6} md={3} lg={2}>{event.EventType || event.type || 'N/A'}</Col>
                <Col xs={12} sm={6} md={3} lg={2}>{event.NoOfAttendees || event.attendees || 'N/A'}</Col>
                <Col xs={12} sm={6} md={3} lg={2}>{event.Status || event.status || 'N/A'}</Col>
                <Col xs={12} sm={6} md={3} lg={2}>
                  <div className="dropdown-container" style={{ position: 'relative' }}>
                    {/* Button with Three Dots Icon */}
                    <button
                      onClick={() => toggleMenu(index)}
                      className="text-muted p-0"
                      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <i className="bi bi-three-dots-vertical" style={{ fontSize: '24px' }}></i>
                    </button>

                    {/* Conditionally render the dropdown menu */}
                    {isOpen[index] && (
                      <div
                        className="dropdown-menu show"
                        style={{
                          position: 'absolute',
                          top: '30px',
                          right: '0',
                          border: '1px solid #ddd',
                          background: 'white',
                          borderRadius: '5px',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                          zIndex: 10,
                        }}
                      >
                        <div
                          className="dropdown-item"
                          style={{ padding: '10px', cursor: 'pointer' }}
                          onClick={() => handleEdit(event)}
                        >
                          Edit
                        </div>
                        <div className="dropdown-item" style={{ padding: '10px', cursor: 'pointer' }}>
                          Delete
                        </div>
                        <div className="dropdown-item" style={{ padding: '10px', cursor: 'pointer' }}>
                          View
                        </div>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            ))
          )}
        </div>
      </Container>


    </>
  );
};

export default EventManage;
