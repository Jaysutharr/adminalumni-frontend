// Import necessary modules
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Dropdown, Badge, Button, Card, Modal, Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EventHome.css'; // Custom CSS for exact styling
import EventDashboard from './EventDashboard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { FaEllipsisV } from "react-icons/fa"; // Importing the 3 dots icon

const EventHome = () => {
  // State to hold the numbers fetched from the API

  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true); // Show modal
  const handleClose = () => setShow(false); // Close modal
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const handleManage = () => {
    navigate('/event-management/manage')
  }
  const handleView = () => {
    navigate('/event-management/quick-view')
  }
  const handleAnnounceView = () => {
    navigate('/event-management/announce-view')
  }

  // ======================
  const [eventListings, setEventListings] = useState([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    ongoing: 0,
    upcoming: 0,
    completed: 0,
  });
  const [eventData, setEventData] = useState({
    EventName: '',
    DateTime: '',
    EventType: '',
    NoOfAttendees: '',
    Status: '',
  });
  const [eventLoading, setEventLoading] = useState(true);
  const [eventError, setEventError] = useState(null);
  const [updatedEvent, setUpdatedEvent] = useState(null);
  const [currentEvent, setCurrentEvent] = useState(null);

  // Fetch event listings from the API
  const fetchEventListings = async () => {
    try {
      // const response = await axios.get("http://13.235.100.222:13417/api/v1/vieweventDetails");
      const response = await axios.get("/api/v1/vieweventDetails");
      console.log("Response data:", response.data);
      const events = Array.isArray(response.data.data) ? response.data.data : [];
      setEventListings(events);

      const totalEvents = events.length;
      const ongoing = events.filter(
        (event) => event.Status === "published" && new Date(event.DateTime) <= new Date()
      ).length;
      const upcoming = events.filter(
        (event) => event.Status === "published" && new Date(event.DateTime) > new Date()
      ).length;
      const completed = events.filter((event) => event.Status === "completed").length;

      setStats({ totalEvents, ongoing, upcoming, completed });
    } catch (err) {
      console.error("Error fetching events:", err);
      setEventError("Error fetching events. Please try again later.");
    } finally {
      setEventLoading(false);
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEventListings();
  }, []);

  // Delete Event
  const handleDelete = (eventId) => {
    if (!eventId) {
      console.error("No eventId received in handleDelete");
      return;
    }
    console.log(`Deleting event with ID: ${eventId}`);

    // Call your API to delete the event
    axios
      // .delete(`http://13.235.100.222:13417/api/v1/deleteeventDetails/${eventId}`) // Replace with your actual API endpoint
      .delete(process.env.REACT_APP_localUrl+'/api/v1/deleteeventDetails/eventId')
      .then((response) => {
        console.log("Event deleted successfully:", response.data);

        // Optionally, update the local state to remove the deleted event
        setEventListings((prev) => prev.filter((event) => event.eventId !== eventId));
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
        alert("Failed to delete event. Please try again.");
      });
  };
  // Open Update Modal

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [isShow, setIsShow] = useState(false);
  const [editEvent, setEditEvent] = useState({
    EventName: '',
    Status: '',
    EventType: '',
    DateTime: '',
    eventId: null, // To store the event ID for the PUT request
  });

  const handleCloseUpdate = () => setShow(false);
  
  const handleUpdate = (event) => {
    setEditEvent({
      EventName: event.EventName || "Untitled Event",
      Status: event.Status || "unknown",
      EventType: event.EventType || "Unknown",
      DateTime: new Date(event.DateTime).toISOString().slice(0, 16), // For datetime-local input format
      eventId: event.eventId, // Store the event ID for the PUT request
    });
    setIsShow(true);
  };

  const handleSave = async () => {
    try {
      // Make the PUT request to update the event
      // const response = await axios.post(`http://13.235.100.222:13417/api/v1/updateeventDetails${editEvent.eventId}`, {
      const response = await axios.post(process.env.REACT_APP_localUrl+'/api/v1/updateeventDetails/'+editEvent.eventId, {
        EventName: editEvent.EventName,
        Status: editEvent.Status,
        EventType: editEvent.EventType,
        DateTime: editEvent.DateTime,
      });

      console.log('Event updated:', response.data);
      handleClose();

      // Optionally, refresh the event list or update state to reflect the changes
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };


  // Render Badge
  const renderBadge = (status) => {
    switch (status.toLowerCase()) {
      case "published":
        return <span className="badge bg-success">upcoming</span>;
      case "draft":
        return <span className="badge bg-secondary">ongoing</span>;
      default:
        return <span className="badge bg-warning">completed</span>;
    }
  };
  // =============================

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update the window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Clean up the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Inline styles based on the window width
  const containerStyle = {
    marginLeft: windowWidth > 1200 ? "290px" : windowWidth > 768 ? "20px" : "0px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    backgroundColor: "white",
    width: windowWidth > 1200 ? "980px" : windowWidth > 768 ? "90%" : "100%",
    borderRadius: "12px",
    height: windowWidth <= 768 ? "auto" : "270px", // Adjust height for 
    marginTop:'-10px'
  };


  // Fetch data from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // const response = await fetch('https://api.example.com/event-stats'); // Replace with your API URL
        const response = await fetch(process.env.REACT_APP_localUrl+'/api/event-stats');
        const data = await response.json();
        setStats({
          totalEvents: data.totalEvents,
          ongoing: data.ongoing,
          upcoming: data.upcoming,
          completed: data.completed,
        });
      } catch (error) {
        console.error('Error fetching event stats:', error);
      }
    };

    fetchStats();
  }, []);
  useEffect(() => {
    document.body.style.backgroundColor = "#FbFbFb";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);
  const handleView1 = (id) => {
    alert(`Viewing campaign with ID: ${id}`);
  };



  // Fetch events data from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // const response = await axios.get("https://your-api-endpoint.com/events");
        const response = await axios.get(process.env.REACT_APP_localUrl+"/api/events"); // Replace with your API endpoint
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }


  return (
    <>
      <EventDashboard />
      <div style={{overflow:'hidden'}}>

      
      <Container className="event-stats-container" style={{ marginLeft: '220px', marginTop: '-10px' }}>
        <Row className="g-0 justify-content-center">
          {/* Total Events */}
          <Col xs={12} sm={6} md={4} lg={3} >
            <div className="event-card" style={{ height: '60px', width: '220px', margin: '5px' }}>
              <p style={{ fontSize: '19px' }}>
                Total events
                <span className="event-number item-right ">{stats.totalEvents}</span>
              </p>
            </div>
          </Col>

          {/* Ongoing Events */}
          <Col xs={12} sm={6} md={4} lg={3} style={{ marginLeft: '-40px' }}>
            <div className="event-card" style={{ height: '60px', width: '220px', margin: '5px' }}>
              <p style={{ fontSize: '19px' }}>
                Ongoing
                <span className="event-number">{stats.ongoing}</span>
              </p>
            </div>
          </Col>

          {/* Upcoming Events */}
          <Col xs={12} sm={6} md={4} lg={3} style={{ marginLeft: '-40px' }}>
            <div className="event-card" style={{ height: '60px', width: '220px', margin: '5px' }}>
              <p style={{ fontSize: '19px' }}>
                Upcoming
                <span className="event-number">{stats.upcoming}</span>
              </p>
            </div>
          </Col>

          {/* Completed Events */}
          <Col xs={12} sm={6} md={4} lg={3} style={{ marginLeft: '-40px' }}>
            <div className="event-card" style={{ height: '60px', width: '220px', margin: '5px' }}>
              <p style={{ fontSize: '19px' }}>
                Completed
                <span className="event-number">{stats.completed}</span>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      {/* ==================================================== */}
      <Container  style={containerStyle} >
      <Row>
        <Col>
          {/* Header Row */}
          <Row className="justify-content-between align-items-center mb-3">
            <Col xs={12} md={6}>
              <h3 className="table-title" style={{ color: "#58a4b0" }}>
                Recently Posted Events
              </h3>
            </Col>
            <Col xs="auto">
  <Button
    className="filter-button bg-white d-flex align-items-center"
    style={{
      color: "black",
      border: "1px solid white",
      fontSize: "17px",
    }}
  >
    <svg
      width="20"
      height="17"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginRight: "8px" }} /* Add margin to create space between SVG and text */
    >
      <path
        d="M5.75 11.5H17.25M2.875 5.75H20.125M8.625 17.25H14.375"
        stroke="#344054"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    Filters
  </Button>
</Col>

          </Row>

          {/* Event Listings */}
          {eventLoading ? (
            <p>Loading events...</p>
          ) : eventError ? (
            <p>{eventError}</p>
          ) : (
            <div
              style={{
                maxHeight: "200px",
                overflowY: "auto",
                marginTop: "-20px",
              }}
            >
              <div className="table-responsive">
                <table className="table" style={{ width: "100%" }}>
                  <thead
                    style={{
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                      zIndex: 1,
                    }}
                  >
                    <tr>
                      <th>#</th>
                      <th>Event Name</th>
                      <th>Date & Time</th>
                      <th>Event Type</th>
                      <th>No. of Attendees</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {eventListings.map((event, index) => (
                      <tr key={event.eventId || index}>
                        <td>{index + 1}</td>
                        <td>{event.EventName || "Untitled Event"}</td>
                        <td>{new Date(event.DateTime).toLocaleString() || "N/A"}</td>
                        <td>{event.EventType || "Unknown"}</td>
                        <td>{event.NoOfAttendees || "0"}</td>
                        <td>{renderBadge(event.Status || "unknown")}</td>
                        <td>
                          <Dropdown align="end">
                            <Dropdown.Toggle
                              style={{
                                backgroundColor: "white",
                                color: "black",
                                border: "1px solid white",
                              }}
                            >
                              
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => handleUpdate(event)}>
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item >
                               View
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => handleDelete(event.eventId)}
                              >
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
    <Modal show={isShow} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEventName">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                value={editEvent.EventName}
                onChange={(e) =>
                  setEditEvent({ ...editEvent, EventName: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formEventStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={editEvent.Status}
                onChange={(e) =>
                  setEditEvent({ ...editEvent, Status: e.target.value })
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="unknown">Unknown</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formEventType">
              <Form.Label>Event Type</Form.Label>
              <Form.Control
                type="text"
                value={editEvent.EventType}
                onChange={(e) =>
                  setEditEvent({ ...editEvent, EventType: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formDateTime">
              <Form.Label>Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={editEvent.DateTime}
                onChange={(e) =>
                  setEditEvent({ ...editEvent, DateTime: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdate}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ================================================================= */}

      <Container className="mt-1 ">
        <Row className=" g-1">
          <Col xs={12} md={6} style={{ marginLeft: '169px' }}>
            <Container style={{ width: '490px' }}>
              <Card className=" border-1 " style={{ borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', height: '140px' }}>
                <Card.Body>
                  <h6 style={{ color: '#58a4b0', fontFamily: 'poppins' }}>Quick settings</h6>
                  <Row className="text-center">
                    <Col className="mt-2" xs={4} sm={4} md={4} lg={4}>
                      <div className=" ml-[30px]" onClick={togglePopup}>
                        <svg width="44" height="50" viewBox="0 0 84 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="13" y="15" width="58" height="59" rx="10" fill="#58A4B0" fill-opacity="0.2" />
                          <path d="M20.5909 16.6453C20.5909 15.8713 20.5909 15.1639 20.5909 14.4565C20.6161 13.0084 21.5491 12.0346 22.9276 12.0096C24.2809 11.993 25.2812 12.9501 25.3484 14.3733C25.382 15.1057 25.3484 15.838 25.3484 16.6453H30.0723C30.0723 15.9462 30.0723 15.2721 30.0723 14.6063C30.1059 13.0167 31.0726 11.993 32.5267 12.0096C33.9472 12.0263 34.8298 13.025 34.8382 14.6229C34.8382 15.2721 34.8382 15.9296 34.8382 16.6537H39.6042C39.6042 15.9296 39.6042 15.2222 39.6042 14.5231C39.621 13.0583 40.596 12.0263 41.9661 12.0096C43.3698 11.993 44.3785 13.0416 44.3953 14.5397C44.3953 15.2388 44.3953 15.9379 44.3953 16.6703H49.1612C49.1612 15.8963 49.1612 15.1639 49.1612 14.4398C49.178 13.025 50.0858 12.0429 51.4055 12.0013C52.8176 11.9597 53.8179 12.9085 53.9019 14.3733C53.9019 14.4315 53.9019 14.4815 53.9019 14.5397C53.9524 15.2388 53.7422 16.2042 54.1205 16.5538C54.5155 16.92 55.4654 16.7036 56.1798 16.7202C56.97 16.7369 57.7601 16.7202 58.6427 16.7202C58.6427 15.9046 58.6258 15.2055 58.6427 14.4981C58.6847 12.9751 59.6765 11.9763 61.1055 12.0013C62.5008 12.0263 63.3918 13.0167 63.4002 14.548C63.4002 15.2305 63.4002 15.9046 63.4002 16.6287C63.9633 16.7036 64.4845 16.7452 64.9888 16.8368C69.6203 17.6357 72.9068 21.4392 72.9657 26.1082C72.9909 28.3719 72.9657 30.6357 72.9657 32.8994C72.9657 34.5889 71.957 35.571 70.2339 35.571C55.3057 35.571 40.3859 35.571 25.4577 35.571C23.9195 35.571 22.3729 35.571 20.8346 35.571C19.2712 35.5627 18.1785 34.5473 18.1953 33.1491C18.2121 31.8092 19.3216 30.8354 20.8515 30.8354C36.3008 30.8354 51.7501 30.8354 67.1995 30.8354C67.4937 30.8354 67.7963 30.8354 68.0316 30.8354C68.0316 28.8546 68.2333 26.9071 67.9812 25.0262C67.6786 22.8374 65.552 21.3476 63.4086 21.5224C63.4086 22.2381 63.417 22.9705 63.4086 23.6946C63.3918 25.1094 62.484 26.0665 61.1475 26.0998C59.769 26.1414 58.7435 25.2093 58.6679 23.8028C58.6258 23.0454 58.6679 22.2798 58.6679 21.4641H53.9188C53.9188 22.2548 53.9524 23.0371 53.9188 23.8111C53.8431 25.201 52.8765 26.1082 51.5316 26.1082C50.2624 26.1082 49.2621 25.1927 49.2033 23.936C49.1696 23.1453 49.2033 22.3547 49.2033 21.4891H44.4289C44.4289 22.1882 44.4289 22.8873 44.4289 23.5947C44.4121 25.0928 43.4035 26.1331 41.9913 26.1165C40.6296 26.0998 39.6546 25.0678 39.6378 23.5947C39.6378 22.8956 39.6378 22.1965 39.6378 21.4558H34.8719C34.8719 22.2298 34.8803 22.9622 34.8719 23.6863C34.855 25.1261 33.9052 26.1082 32.5351 26.1165C31.1734 26.1248 30.1816 25.1594 30.1227 23.7362C30.0975 23.137 30.148 22.5378 30.1059 21.9385C30.0891 21.7554 29.879 21.4475 29.7529 21.4475C28.3324 21.4142 26.9034 21.4225 25.3904 21.4225C25.3904 22.1882 25.3988 22.8623 25.3904 23.5448C25.3652 25.1011 24.4154 26.1165 23.0033 26.1082C21.5491 26.1082 20.6413 25.1261 20.6245 23.5531C20.6245 22.879 20.6245 22.2048 20.6245 21.4475C18.7669 21.4641 17.4052 22.2381 16.5562 23.7279C16.1444 24.452 15.867 25.3674 15.867 26.1997C15.825 40.2982 15.8334 54.3884 15.8418 68.4869C15.8418 71.25 17.9011 73.2308 20.7422 73.2308C31.703 73.2475 42.6638 73.2392 53.6246 73.2392C56.8187 73.2392 60.0128 73.2392 63.2068 73.2392C66.2244 73.2392 68.2165 71.2584 68.2165 68.2622C68.2165 58.9908 68.2165 49.7194 68.2165 40.448C68.2165 38.6337 69.8388 37.4352 71.4358 38.0511C72.4277 38.434 72.9909 39.3411 72.9909 40.6062C72.9909 45.8993 72.9909 51.1842 72.9909 56.4774C72.9909 60.3474 72.9572 64.2174 72.9993 68.0958C73.0581 73.1809 69.5278 77.2923 64.6694 77.8915C64.2071 77.9498 63.7364 77.9664 63.2741 77.9664C49.2033 77.9664 35.1324 77.8998 21.0616 77.9997C15.4719 78.0413 10.9666 73.8633 11.0002 67.9709C11.0758 54.2053 11.0674 40.4314 11.0002 26.6658C10.975 20.9648 15.2618 16.8617 20.1874 16.7286C20.2883 16.7286 20.3976 16.687 20.5993 16.6453H20.5909Z" fill="#8F8F8F" />
                          <path d="M39.5977 56.8195C37.4615 56.8195 35.4186 56.8195 33.3672 56.8195C33.0027 56.8195 32.6467 56.8357 32.2822 56.8032C30.9343 56.6976 29.951 55.6658 30.0019 54.4066C30.0527 53.1717 31.0445 52.2455 32.4093 52.2374C34.5455 52.213 36.6816 52.2374 38.8263 52.2374C39.0467 52.2374 39.2586 52.2374 39.5977 52.2374C39.5977 51.8962 39.5977 51.6199 39.5977 51.3356C39.5977 49.3939 39.5892 47.4522 39.5977 45.5105C39.5977 44.0643 40.6573 42.9919 42.022 43C43.3953 43.0082 44.4125 44.0806 44.421 45.543C44.421 47.4603 44.421 49.3776 44.421 51.295C44.421 51.5793 44.421 51.8637 44.421 52.2455C46.0994 52.2455 47.7015 52.2455 49.3036 52.2455C50.0835 52.2455 50.8634 52.2211 51.6348 52.2455C53.0419 52.2861 53.9913 53.2204 53.9998 54.5284C54.0167 55.7633 52.9826 56.7951 51.6178 56.8114C49.4223 56.8439 47.2268 56.8276 45.0398 56.8276C44.8702 56.8276 44.7092 56.852 44.421 56.8764C44.421 57.1607 44.421 57.4369 44.421 57.7213C44.421 59.6386 44.421 61.556 44.421 63.4733C44.421 64.9844 43.4546 65.9918 42.039 66C40.581 66.0081 39.6061 65.0007 39.5977 63.4408C39.5977 61.5235 39.5977 59.6061 39.5977 57.6888C39.5977 57.4288 39.5977 57.1688 39.5977 56.8195Z" fill="#8F8F8F" />
                        </svg>

                        <p className="mt-1 ml-[-40px]">Create event</p>
                      </div>
                    </Col>
                    <Col className="mt-2" xs={4} sm={4} md={4} lg={4} onClick={handleManage}>
                      <div className='ml-[20px]'>
                        <svg width="45" height="52" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.4295 18.3737C15.0082 16.3017 17.6116 15.2844 20.1769 15.7371C22.8183 16.2032 25.4926 15.1104 27.0516 12.9278L27.9633 11.6514C28.9685 10.2442 30.3406 9.13976 31.9301 8.45853L33.1052 7.95491C35.3145 7.00807 37.7621 6.76571 40.1142 7.26088L42.6198 7.78838C44.741 8.23494 46.5157 9.67876 47.3845 11.6647L47.538 12.0153C48.6892 14.6468 51.492 16.1485 54.3206 15.6493C56.5851 15.2497 58.8855 16.1314 60.3027 17.9423L63.2348 21.6889C65.526 24.6166 65.8861 28.6164 64.1546 31.9063C62.7954 34.4888 62.7067 37.5547 63.9143 40.2115L65.2076 43.0567C66.3535 45.5776 66.4307 48.455 65.4216 51.0338L64.6915 52.8994C63.404 56.1897 60.04 58.1791 56.5364 57.7221C53.2348 57.2915 50.0311 59.0348 48.5995 62.041L47.9902 63.3205C46.7322 65.9625 44.3423 67.89 41.4939 68.5603L40.6881 68.7498C38.6096 69.2389 36.4327 69.0998 34.4333 68.35L32.5451 67.6419C30.6236 66.9214 29.1421 65.3546 28.53 63.3958C27.6284 60.5107 24.8955 58.5957 21.876 58.7329L20.3744 58.8012C17.6259 58.9261 14.9833 57.7291 13.2645 55.5806L12.3092 54.3865C9.67357 51.092 9.1518 46.5812 10.9657 42.772C12.2645 40.0445 12.3859 36.9033 11.3015 34.0838L10.2657 31.3909C8.85752 27.7296 9.4477 23.5999 11.8251 20.4795L13.4295 18.3737Z" fill="#58A4B0" fill-opacity="0.2" />
                          <path d="M37.5 46.875C42.6777 46.875 46.875 42.6777 46.875 37.5C46.875 32.3223 42.6777 28.125 37.5 28.125C32.3223 28.125 28.125 32.3223 28.125 37.5C28.125 42.6777 32.3223 46.875 37.5 46.875Z" stroke="#8F8F8F" stroke-width="5" />
                          <path d="M43.0158 6.725C41.8689 6.25 40.4127 6.25 37.5002 6.25C34.5877 6.25 33.1314 6.25 31.9846 6.725C31.2258 7.0391 30.5363 7.49967 29.9556 8.08039C29.3749 8.6611 28.9143 9.35056 28.6002 10.1094C28.3127 10.8062 28.1971 11.6219 28.1533 12.8063C28.133 13.6623 27.8958 14.4992 27.4641 15.2386C27.0323 15.9781 26.4201 16.5959 25.6846 17.0344C24.9371 17.4524 24.0958 17.674 23.2393 17.6784C22.3829 17.6827 21.5394 17.4698 20.7877 17.0594C19.7377 16.5031 18.9783 16.1969 18.2252 16.0969C16.5824 15.8808 14.9211 16.326 13.6064 17.3344C12.6252 18.0937 11.8939 19.3531 10.4377 21.875C8.98144 24.3969 8.25019 25.6562 8.09081 26.8906C7.98342 27.7045 8.03744 28.5316 8.24977 29.3247C8.4621 30.1177 8.8286 30.8611 9.32831 31.5125C9.79081 32.1125 10.4377 32.6156 11.4408 33.2469C12.9189 34.175 13.8689 35.7562 13.8689 37.5C13.8689 39.2438 12.9189 40.825 11.4408 41.75C10.4377 42.3844 9.78769 42.8875 9.32831 43.4875C8.8286 44.1389 8.4621 44.8823 8.24977 45.6753C8.03744 46.4684 7.98342 47.2955 8.09081 48.1094C8.25331 49.3406 8.98144 50.6031 10.4346 53.125C11.8939 55.6469 12.6221 56.9062 13.6064 57.6656C14.2578 58.1653 15.0012 58.5318 15.7943 58.7442C16.5873 58.9565 17.4144 59.0105 18.2283 58.9031C18.9783 58.8031 19.7377 58.4969 20.7877 57.9406C21.5394 57.5302 22.3829 57.3173 23.2393 57.3216C24.0958 57.326 24.9371 57.5476 25.6846 57.9656C27.1939 58.8406 28.0908 60.45 28.1533 62.1938C28.1971 63.3813 28.3096 64.1937 28.6002 64.8906C28.9143 65.6494 29.3749 66.3389 29.9556 66.9196C30.5363 67.5003 31.2258 67.9609 31.9846 68.275C33.1314 68.75 34.5877 68.75 37.5002 68.75C40.4127 68.75 41.8689 68.75 43.0158 68.275C43.7746 67.9609 44.4641 67.5003 45.0448 66.9196C45.6255 66.3389 46.0861 65.6494 46.4002 64.8906C46.6877 64.1937 46.8033 63.3813 46.8471 62.1938C46.9096 60.45 47.8064 58.8375 49.3158 57.9656C50.0633 57.5476 50.9046 57.326 51.761 57.3216C52.6174 57.3173 53.461 57.5302 54.2127 57.9406C55.2627 58.4969 56.0221 58.8031 56.7721 58.9031C57.586 59.0105 58.4131 58.9565 59.2061 58.7442C59.9991 58.5318 60.7426 58.1653 61.3939 57.6656C62.3783 56.9094 63.1064 55.6469 64.5627 53.125C66.0189 50.6031 66.7502 49.3438 66.9096 48.1094C67.0169 47.2955 66.9629 46.4684 66.7506 45.6753C66.5383 44.8823 66.1718 44.1389 65.6721 43.4875C65.2096 42.8875 64.5627 42.3844 63.5596 41.7531C62.8281 41.3075 62.2216 40.6836 61.797 39.9397C61.3723 39.1959 61.1433 38.3564 61.1314 37.5C61.1314 35.7562 62.0814 34.175 63.5596 33.25C64.5627 32.6156 65.2127 32.1125 65.6721 31.5125C66.1718 30.8611 66.5383 30.1177 66.7506 29.3247C66.9629 28.5316 67.0169 27.7045 66.9096 26.8906C66.7471 25.6594 66.0189 24.3969 64.5658 21.875C63.1064 19.3531 62.3783 18.0937 61.3939 17.3344C60.7426 16.8347 59.9991 16.4682 59.2061 16.2558C58.4131 16.0435 57.586 15.9895 56.7721 16.0969C56.0221 16.1969 55.2627 16.5031 54.2096 17.0594C53.4582 17.4692 52.6153 17.6819 51.7595 17.6775C50.9036 17.6731 50.0629 17.4519 49.3158 17.0344C48.5803 16.5959 47.9681 15.9781 47.5363 15.2386C47.1046 14.4992 46.8674 13.6623 46.8471 12.8063C46.8033 11.6188 46.6908 10.8062 46.4002 10.1094C46.0861 9.35056 45.6255 8.6611 45.0448 8.08039C44.4641 7.49967 43.7746 7.0391 43.0158 6.725Z" stroke="#999999" stroke-width="5" />
                        </svg>
                        <p className="mt-1 ml-[-40px]">Manage event</p>
                      </div>
                    </Col>
                    <Col className="mt-2" xs={4} sm={4} md={4} lg={4} onClick={handleView}>
                      <div>
                        <svg width="54" height="50" viewBox="0 0 84 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.9239 40.8388C16.5688 34.942 20.8601 30.0917 26.6343 28.7331L38.9905 25.8258C41.2926 25.2841 43.6944 25.3344 45.9718 25.9721L58.7069 29.5379C64.0508 31.0342 68.0065 35.5458 68.7914 41.0395L69.9271 48.9898C70.3014 51.6095 69.9254 54.2817 68.843 56.6965L66.898 61.0352C65.076 65.0997 61.4286 68.0546 57.0746 68.9937L42.6804 72.0982C39.9556 72.6859 37.1174 72.4468 34.5293 71.4116L23.3738 66.9495C17.5377 64.615 13.9728 58.6771 14.6562 52.4286L15.9239 40.8388Z" fill="#58A4B0" fill-opacity="0.2" />
                          <path d="M42.0003 73C28.667 73 12.667 59.6667 12.667 49C12.667 38.3333 28.667 25 42.0003 25C55.3337 25 71.3337 38.3333 71.3337 49C71.3337 59.6667 55.3337 73 42.0003 73ZM42.0003 35.6667C38.4641 35.6667 35.0727 37.0714 32.5722 39.5719C30.0718 42.0724 28.667 45.4638 28.667 49C28.667 52.5362 30.0718 55.9276 32.5722 58.4281C35.0727 60.9286 38.4641 62.3333 42.0003 62.3333C45.5365 62.3333 48.9279 60.9286 51.4284 58.4281C53.9289 55.9276 55.3337 52.5362 55.3337 49C55.3337 45.4638 53.9289 42.0724 51.4284 39.5719C48.9279 37.0714 45.5365 35.6667 42.0003 35.6667Z" stroke="#8F8F8F" stroke-width="5" />
                        </svg>

                        <p className="mt-1 ml-[-70px]">View all</p>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Container>
          </Col>

          {/* =============================================================== */}
          <Col xs={12} md={6} style={{ width: '520px', marginLeft: '680px',marginTop:'-140px' }}>
            <Container >
              <Card className=" border-1" style={{ borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', height: '140px' }}>
                <Card.Body>
                  <h6 style={{ color: '#58a4b0', fontFamily: 'poppins  ' }}>Announcement</h6>
                  <Row className="text-center">
                    <Col className='mt-3' xs={6} sm={6} md={6} lg={6} onClick={handleShow}>
                      <div  className='ml-[130px]'>
                        <svg width="56" height="44" marginLeft="30px" viewBox="0 0 96 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_3627_8289)">
                            <path d="M4.03139 29.3269C5.54383 26.0911 8.6673 23.9077 12.2257 23.5988L31.2261 21.9492C32.7587 21.8162 34.2399 21.3313 35.5546 20.5324L46.1832 14.0731C46.7902 13.7042 47.3561 13.2717 47.8715 12.7829L57.7334 3.42905C58.4634 2.73659 59.4313 2.35059 60.4376 2.35059C62.5288 2.35059 64.2536 3.9884 64.3618 6.07681L65.9349 36.4411V66.1918C65.9349 68.5887 63.9919 70.5317 61.5951 70.5317C60.5944 70.5317 59.6245 70.1859 58.8496 69.5528L41.7586 55.5917C41.0039 54.9752 40.1631 54.4723 39.263 54.099L30.2752 50.3718C22.9027 47.3144 15.185 53.9378 17.0884 61.6889L17.6529 63.9876C18.0285 65.5171 17.6621 67.1342 16.6638 68.3524L16.3389 68.7489C14.5603 70.9193 11.2632 70.9867 9.39726 68.8909C8.65285 68.0548 8.24157 66.9743 8.24157 65.8548V55.0845C8.24157 53.2697 7.74769 51.489 6.81287 49.9335L4.21886 45.6171C3.38107 44.223 2.89597 42.6456 2.80561 41.0216L2.49424 35.4259C2.4025 33.7773 2.7204 32.1317 3.41955 30.6359L4.03139 29.3269Z" fill="#58A4B0" fill-opacity="0.2" />
                            <path d="M19.6904 52.1701C19.6904 52.7559 19.6904 53.1177 19.6904 53.4795C19.6904 58.1142 19.7076 62.7489 19.6904 67.3664C19.6731 70.4332 17.7921 72.9487 15.031 73.724C10.734 74.9473 6.66142 71.7943 6.62691 67.1768C6.59239 62.1976 6.60965 57.2355 6.62691 52.2562C6.62691 51.5843 6.43708 51.2225 5.83309 50.8779C2.32995 48.9482 0.310891 45.9503 0.138323 41.9531C-0.0169894 38.6106 -0.0860169 35.2337 0.172836 31.8912C0.638772 25.8781 5.19459 21.8292 11.2518 21.7603C14.358 21.7259 17.4815 21.812 20.5877 21.7259C32.564 21.3985 42.573 16.7294 50.7182 8.01131C52.4784 6.13331 54.1696 4.16917 55.9298 2.27394C57.9834 0.051359 60.6927 -0.568897 63.402 0.516551C66.1114 1.602 67.6472 3.8935 67.6472 6.90864C67.6472 26.9808 67.6472 47.0702 67.6472 67.1424C67.6472 70.1058 66.1114 72.3801 63.4193 73.4656C60.7272 74.551 58.0179 73.9652 55.9988 71.8115C53.5138 69.1582 51.1669 66.3498 48.5611 63.8344C42.0898 57.6146 34.3414 53.9103 25.4369 52.6698C23.5732 52.4113 21.6922 52.3424 19.6731 52.1701H19.6904ZM21.9338 47.8628C23.901 48.1212 25.782 48.2763 27.6458 48.6209C37.534 50.4127 46.0071 54.8751 52.9961 62.1114C55.067 64.2651 57.017 66.5221 59.036 68.7275C59.9161 69.6923 60.917 69.9163 61.9697 69.3994C63.1259 68.8309 63.2985 67.8143 63.2985 66.66C63.2985 52.1701 63.2985 37.6975 63.2985 23.2076C63.2985 17.832 63.2985 12.4565 63.2985 7.08093C63.2985 5.71981 62.8153 4.97895 61.7626 4.58267C60.6927 4.1864 59.8816 4.44484 58.967 5.46137C57.4139 7.20153 55.8435 8.9417 54.2904 10.6646C47.077 18.6074 38.207 23.5694 27.6285 25.4646C25.7648 25.792 23.8838 25.9643 21.951 26.2055V47.8972L21.9338 47.8628ZM17.4987 26.171C15.1518 26.171 12.9257 26.1193 10.6823 26.171C7.33444 26.2572 4.57334 28.9794 4.50431 32.3047C4.43528 35.4404 4.43528 38.5762 4.50431 41.7119C4.57334 44.9855 7.33444 47.7249 10.6132 47.8111C12.7186 47.88 14.8412 47.8283 16.9638 47.8283C17.1363 47.8283 17.3089 47.7594 17.4987 47.7249V26.1366V26.171ZM11.0102 52.3079C11.0102 52.9971 11.0102 53.6001 11.0102 54.1859C11.0102 58.5277 11.0102 62.8695 11.0102 67.2113C11.0102 68.2451 11.3035 69.0376 12.3217 69.4339C13.8921 70.0541 15.3244 69.0376 15.3416 67.263C15.3416 62.4905 15.3416 57.7007 15.3416 52.9282C15.3416 52.7214 15.2899 52.5147 15.2553 52.3079H11.0102Z" fill="#8F8F8F" />
                            <path d="M87.2339 39.2136C85.1459 39.2136 83.075 39.2481 80.987 39.2136C79.2268 39.1792 78.1741 37.8353 78.6745 36.3363C78.9679 35.4404 79.7272 34.8546 80.8144 34.8374C85.1114 34.8029 89.3911 34.8029 93.688 34.8374C95.0686 34.8374 96.0004 35.8194 96.0004 37.0255C96.0004 38.2488 95.0513 39.1792 93.6708 39.2136C91.5309 39.2653 89.3738 39.2136 87.2339 39.2136Z" fill="#8F8F8F" />
                            <path d="M78.6222 21.9156C77.6213 21.7261 76.9483 21.3126 76.5859 20.5028C76.2063 19.6414 76.3098 18.7799 76.9828 18.0907C78.07 16.9708 79.1745 15.8854 80.2789 14.7827C81.3143 13.7489 82.3325 12.6979 83.3851 11.6814C84.4378 10.6476 85.6631 10.6132 86.5949 11.5608C87.5441 12.5084 87.5095 13.6972 86.4569 14.7655C84.4033 16.833 82.3497 18.9177 80.2444 20.9508C79.813 21.3815 79.1745 21.6055 78.6395 21.9156H78.6222Z" fill="#8F8F8F" />
                            <path d="M84.7486 63.1628C84.4207 62.9733 83.834 62.7493 83.4026 62.3531C81.28 60.3028 79.1919 58.2008 77.1211 56.0988C76.172 55.134 76.1202 53.8073 76.9658 52.9286C77.8114 52.0499 79.1746 52.0327 80.141 52.9803C82.2981 55.0995 84.4207 57.2359 86.5433 59.3724C87.2164 60.0443 87.4925 60.8197 87.061 61.75C86.6641 62.6115 85.9739 63.0767 84.7314 63.1801L84.7486 63.1628Z" fill="#8F8F8F" />
                          </g>
                          <defs>
                            <clipPath id="clip0_3627_8289">
                              <rect width="96" height="74" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>

                        <p className="mt-1 ml-[-30px]">Announce</p>
                      </div>
                    </Col>
                    <Col className='mt-3' xs={6} sm={6} md={6} lg={6} onClick={handleAnnounceView}>
                      <div className='ml-[30px]'>
                        <svg width="54" height="50" viewBox="0 0 84 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.9239 40.8388C16.5688 34.942 20.8601 30.0917 26.6343 28.7331L38.9905 25.8258C41.2926 25.2841 43.6944 25.3344 45.9718 25.9721L58.7069 29.5379C64.0508 31.0342 68.0065 35.5458 68.7914 41.0395L69.9271 48.9898C70.3014 51.6095 69.9254 54.2817 68.843 56.6965L66.898 61.0352C65.076 65.0997 61.4286 68.0546 57.0746 68.9937L42.6804 72.0982C39.9556 72.6859 37.1174 72.4468 34.5293 71.4116L23.3738 66.9495C17.5377 64.615 13.9728 58.6771 14.6562 52.4286L15.9239 40.8388Z" fill="#58A4B0" fill-opacity="0.2" />
                          <path d="M42.0003 73C28.667 73 12.667 59.6667 12.667 49C12.667 38.3333 28.667 25 42.0003 25C55.3337 25 71.3337 38.3333 71.3337 49C71.3337 59.6667 55.3337 73 42.0003 73ZM42.0003 35.6667C38.4641 35.6667 35.0727 37.0714 32.5722 39.5719C30.0718 42.0724 28.667 45.4638 28.667 49C28.667 52.5362 30.0718 55.9276 32.5722 58.4281C35.0727 60.9286 38.4641 62.3333 42.0003 62.3333C45.5365 62.3333 48.9279 60.9286 51.4284 58.4281C53.9289 55.9276 55.3337 52.5362 55.3337 49C55.3337 45.4638 53.9289 42.0724 51.4284 39.5719C48.9279 37.0714 45.5365 35.6667 42.0003 35.6667Z" stroke="#8F8F8F" stroke-width="5" />
                        </svg>

                        <p className="mt-[-4px] ml-[-120px]">View all</p>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Container>
          </Col>
        </Row>
      </Container>



      {/* Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#58a4b0' }}>Announce</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Title/Heading Input */}
          <Form.Group controlId="titleHeading" className="mb-3" >
            <Form.Label  >Title/Heading</Form.Label>
            <Form.Control type="text" placeholder="Enter title/heading" />
          </Form.Group>

          {/* Description Input */}
          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter description"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {/* Cancel and Announce Buttons */}
          <Button
            variant="light"
            onClick={handleClose}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "5px 20px",
            }}
          >
            Cancel
          </Button>
          <Button

            onClick={handleClose}
            style={{
              backgroundColor: "#58a4b0",
              borderColor: "#0dcaf0",
              borderRadius: "8px",
              padding: "5px 20px",
              marginRight: '120px'
            }}
          >
            Announce
          </Button>
        </Modal.Footer>
      </Modal>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <button className="close-btn" onClick={togglePopup}>
              &times;
            </button>
            <h2 className="popup-title">Create Event</h2>

            <form className="form-container">
              <div className="date-time-section">
                <div className="date-picker-container">
                  <label>
                    Select Date<span className="required">*</span>
                  </label>
                  <div className="calendar-placeholder">[Calendar Component]</div>
                </div>

                <div className="time-picker-container">
                  <label>
                    Select time<span className="required">*</span>
                  </label>
                  <div className="clock-placeholder">[Clock Component]</div>
                </div>
              </div>

              <div className="event-type-section">
                <label>Event Type<span className="required">*</span></label>
                <div className="radio-group">
                  <input type="radio" id="in-person" name="eventType" value="In-person" />
                  <label htmlFor="in-person">In-person</label>

                  <input type="radio" id="online" name="eventType" value="Online" />
                  <label htmlFor="online">Online</label>

                  <input type="radio" id="hybrid" name="eventType" value="Hybrid" />
                  <label htmlFor="hybrid">Hybrid</label>
                </div>
              </div>

              <div className="input-grid">
                <div>
                  <label>Event Venue (if in-person or hybrid)</label>
                  <input type="text" placeholder="Enter venue" />
                </div>
                <div>
                  <label>Meeting Link (if online or hybrid)</label>
                  <input type="text" placeholder="Enter meeting link" />
                </div>
              </div>

              <div className="input-section">
                <label>Organizer<span className="required">*</span></label>
                <input type="text" placeholder="Enter organizer name" />
              </div>

              <div className="input-grid">
                <div>
                  <label>Maximum Number of Attendees<span className="required">*</span></label>
                  <select>
                    <option value="">Select</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                </div>
                <div>
                  <label>RSVP Deadline</label>
                  <input type="date" />
                </div>
              </div>

              <div className="input-section">
                <label>Event Reminder<span className="required">*</span></label>
                <select>
                  <option value="">Select</option>
                  <option value="1hour">1 Hour Before</option>
                  <option value="1day">1 Day Before</option>
                </select>
              </div>

              <button type="submit" className="submit-btn">
                Create Event
              </button>
            </form>
          </div>
        </div>
      )}

</div>
    </>
  );
};

export default EventHome;
