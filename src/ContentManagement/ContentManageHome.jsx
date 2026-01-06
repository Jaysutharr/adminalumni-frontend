// Import necessary modules
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Dropdown, Badge, Button, Card, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContentManageHome.css'; // Custom CSS for exact styling

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useForm } from "react-hook-form";
import ContentManageDashboard from './ContentManageDashboard';



const ContentManageHome = () => {
  // State to hold the numbers fetched from the API
  const [stats, setStats] = useState({
    totalJobs: 0,
    ongoing: 0,
    quired: 0,
    completed: 0,
  });
  const navigate = useNavigate();
  // const [events, setEvents] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  // const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);
  // useForm hook for handling form state and validation
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Handlers for showing and hiding the modal
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Initial state set to false, so the modal is not open by default
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State for the new popup

  // Function to handle clicking the "Open Modal" text
  const handleOpenModal = () => {
    setIsModalOpen(true); // Open the modal when the text is clicked
  };

  // Function to handle the "Next" button click in the initial modal
  const handleNext = () => {
    setIsModalOpen(false); // Close the initial modal
    setIsPopupVisible(true); // Open the new popup (modal)
  };

  // Function to toggle the visibility of the popup
  const handlePopupToggle = () => {
    setIsPopupVisible(false); // Close the popup
  };
  // Handle form submission
  const onSubmit = async (data) => {
    setError(null); // Clear any previous error messages
    setIsLoading(true); // Show loading spinner

    try {
      // Make API request (replace with your actual API endpoint)
      // const response = await axios.post("https://your-api-endpoint.com/jobs", data);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/jobs`, data);
      console.log(response.data); // Handle successful API response

      // Reset form and close modal on success
      reset();
      setIsLoading(false);
      handleClose();
    } catch (error) {
      console.error("Error submitting job data", error);
      setError("Failed to create job. Please try again.");
      setIsLoading(false);
    }
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const handleJobManage = () => {
    navigate('/job-listing/manage')
  }
  const handleJobView = () => {
    navigate('/job-listing/quick-view')
  }
  // Inline styles based on the window width
  const containerStyle = {
    marginLeft: windowWidth > 1200 ? "290px" : windowWidth > 768 ? "20px" : "0px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    backgroundColor: "white",
    width: windowWidth > 1200 ? "960px" : windowWidth > 768 ? "90%" : "100%",
    borderRadius: "12px",
    height: windowWidth <= 768 ? "auto" : "270px", // Adjust height for mobile
    marginTop: '-12px'
  };
  const fetchData = async () => {
    setIsFetching(true); // Start loading
    try {
      // const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/posts`
      );

      const result = await response.json();

      const formattedData = result.slice(0, 8).map((item, index) => ({
        title: index % 2 === 0 ? "Software Engineer" : "Event Coordinator",
        date: "10/10/2024",
        company: index % 2 === 0 ? "Tech Innovations Inc." : "Event Masters LLC",
        required: "3/3",
        status: "Completed",
      }));

      setData(formattedData);
      setIsFetching(false); // Stop loading
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    // Replace this URL with your API endpoint
    const fetchEvents = async () => {
      try {
        // const response = await axios.get("https://api.example.com/events"); // Replace with your API URL
        const response = await axios.get(process.env.REACT_APP_localUrl + "/api/v1/events");
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events data:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);




  // Update the window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Clean up the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);




  // Fetch data from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // const response = await fetch('https://api.example.com/event-stats'); // Replace with your API URL
        const response = await fetch(process.env.REACT_APP_localUrl + '/api/v1/event-stats'); // Replace with your API URL
        const data = await response.json();
        setStats({
          totalJobs: data.totalJobs,
          ongoing: data.ongoing,
          quired: data.quired,
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

  // ===================================
  const [events, setEvents] = useState([]); // State for storing events
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        // const response = await fetch("http://13.235.100.222:13417/api/v1/getcontent"); // Replace with your API endpoint
        const response = await fetch(process.env.REACT_APP_localUrl + "/api/v1/getcontent");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setEvents(data); // Update state with fetched data
        setLoading(false);
      } catch (err) {
        setError(err.message); // Set error message
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderBadge = (status) => {
    // Define badge rendering logic
    const statusMap = {
      active: "Request",
      inactive: "Published",
      pending: "warning",
    };
    return <span className={`badge bg-${statusMap[status] || "primary"}`}>{status}</span>;
  };

  return (
    <>
      <ContentManageDashboard />
      <div className='overflow-hidden'>
        <Container className="event-stats-container" style={{ marginLeft: '220px', marginTop: '-10px' }}>
          <Row className="justify-content-center">

            <Col xs={12} sm={6} md={4} lg={3} >
              <div className="event-card" style={{ height: '60px', width: '220px', margin: '5px' }}>
                <p style={{ fontSize: '15px' }}>
                  All Content
                  <span className="event-number item-right ">{stats.totalContent}</span>
                </p>
              </div>
            </Col>
            {/* Ongoing Events */}
            <Col xs={12} sm={6} md={4} lg={3} style={{ marginLeft: '-40px' }}>
              <div className="event-card" style={{ height: '60px', width: '220px', margin: '5px' }}>
                <p style={{ fontSize: '15px' }}>
                  Pending apps
                  <span className="event-number">{stats.ongoing}</span>
                </p>
              </div>
            </Col>

            {/* Upcoming Events */}
            <Col xs={12} sm={6} md={4} lg={3} style={{ marginLeft: '-40px' }}>
              <div className="event-card" style={{ height: '60px', width: '220px', margin: '5px' }}>
                <p style={{ fontSize: '15px' }}>
                  Drafts
                  <span className="event-number">{stats.quired}</span>
                </p>
              </div>
            </Col>

            {/* Completed Events */}
            <Col xs={12} sm={6} md={4} lg={3} style={{ marginLeft: '-40px' }}>
              <div className="event-card" style={{ height: '60px', width: '220px', margin: '5px' }}>
                <p style={{ fontSize: '15px' }}>
                  popular conn.
                  <span className="event-number">{stats.completed}</span>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
        {/* ==================================================== */}
        <Container style={containerStyle}>
          <Row>
            <Col>
              <Row className="justify-content-between align-items-center mb-3">
                <Col>
                  <h3 className="table-title" style={{ color: "#58a4b0" }}>
                    Recently posted articles
                  </h3>
                </Col>
                <Col xs="auto">
                  <Button
                    className="filter-button bg-white"
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
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                <div className="events-container" style={{ maxHeight: "200px", overflowY: "auto", marginTop: '-20px' }}>
                  {/* Header Row for Columns */}
                  <Row className="events-header" style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#fff",
                    zIndex: 1,
                  }}>
                    <Col style={{ color: "gray", fontSize: "15px" }}>Title</Col>
                    <Col style={{ color: "gray", fontSize: "15px" }}>Date</Col>
                    <Col style={{ color: "gray", fontSize: "15px" }}>Author</Col>
                    <Col style={{ color: "gray", fontSize: "15px" }}>Category</Col>
                    <Col style={{ color: "gray", fontSize: "15px" }}>Engagement</Col>
                    <Col style={{ color: "gray", fontSize: "15px" }}>Status</Col>
                  </Row>
                  {/* Rows of Events */}
                  {events.map((event, index) => (
                    <Row className="events-row" key={index}>
                      <Col>{event.title}</Col>
                      <Col>{event.DatePosted}</Col>
                      <Col>{event.Author}</Col>
                      <Col>{event.Category}</Col>
                      <Col>{event.Engagement}</Col>
                      <Col>{renderBadge(event.status)}</Col>
                      <Col>
                        <Dropdown>
                          <Dropdown.Toggle variant="light" size="sm">
                            ⋮
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item>Edit</Dropdown.Item>
                            <Dropdown.Item>View</Dropdown.Item>
                            <Dropdown.Item>Delete</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Col>
                    </Row>
                  ))}
                </div>
              )}
            </Col>
          </Row>
        </Container>

        {/* ================================================================= */}

        <Container className="mt-2">
          <Row className=" g-4">
            <Col xs={12} md={6} style={{ marginLeft: '179px' }}>
              <Container style={{ width: '500px' }}>
                <Card className=" border-0" style={{ borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', height: '130px' }}>
                  <Card.Body>
                    <h6 style={{ color: '#58a4b0', fontFamily: 'poppins' }}>Quick settings</h6>
                    <Row className="text-center">
                      <Col className="mt-2" xs={4} sm={4} md={4} lg={4} onClick={openModal}>
                        <div>
                          <svg width="96" height="50" viewBox="0 0 96 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_4021_11343)">
                              <rect x="5.00098" y="4" width="66" height="82" fill="#DEEDEF" />
                              <path d="M86.001 5.5C86.001 3.01472 88.0157 1 90.501 1H91.001C93.2101 1 95.001 2.79086 95.001 5V83H86.001V5.5Z" fill="#DEEDEF" />
                              <path d="M0.0478516 45.0041C0.0552232 31.7352 0.0478516 18.4663 0.0625948 5.19739C0.0625948 0.892365 0.932445 0.0151434 5.22272 0.0151434C26.5857 0.00040015 47.9486 0.00040015 69.3115 0.00777176C73.6165 0.00777176 74.479 0.877622 74.479 5.19001C74.4864 31.7278 74.4864 58.2656 74.479 84.8034C74.479 89.1379 73.6386 89.9857 69.3189 89.993C47.956 90.0078 26.593 90.0078 5.23747 89.993C0.947188 89.993 0.0625948 89.0937 0.0625948 84.8108C0.0478516 71.5419 0.0625948 58.273 0.0625948 45.0041H0.0478516ZM69.7022 84.7371V4.76983H4.70671V84.7371H69.7096H69.7022Z" fill="#8F8F8F" />
                              <path d="M85.7129 14.8682H95.6572V79.1855H85.7129V14.8682Z" fill="#8F8F8F" />
                              <path d="M95.8273 11.596H85.625C85.8388 8.13867 84.0696 4.32017 87.6669 1.88017C88.9865 0.988205 91.5886 0.759685 93.004 1.45262C97.25 3.53141 95.5767 7.70374 95.8273 11.596Z" fill="#8F8F8F" />
                              <path d="M85.8457 82.54H95.4288C93.7923 84.9653 92.3991 87.0367 90.6741 89.602C89.0376 87.2063 87.6149 85.1201 85.8531 82.54H85.8457Z" fill="#8F8F8F" />
                              <path d="M9.69727 34.2264V30.0762H65.294V34.2264H9.69727Z" fill="#8F8F8F" />
                              <path d="M65.3157 21.0605V25.0707H9.83691V21.0605H65.3157Z" fill="#8F8F8F" />
                              <path d="M65.3311 39.3496V43.3082H9.73438V39.3496H65.3311Z" fill="#8F8F8F" />
                              <path d="M65.4118 48.166V52.1467H9.79297V48.166H65.4118Z" fill="#8F8F8F" />
                              <path d="M65.3089 57.1377V61.0815H9.74902V57.1377H65.3089Z" fill="#8F8F8F" />
                              <path d="M9.76367 69.8314V65.7549H65.3014V69.8314H9.76367Z" fill="#8F8F8F" />
                              <path d="M65.567 74.6963C65.5007 76.1927 65.4491 77.3722 65.3901 78.7286H9.7713C9.71233 77.4901 9.64598 76.2222 9.57227 74.6963H65.567Z" fill="#8F8F8F" />
                              <path d="M55.9466 11.4854V15.6798H19.5234V11.4854H55.9539H55.9466Z" fill="#8F8F8F" />
                            </g>
                            <defs>
                              <clipPath id="clip0_4021_11343">
                                <rect width="95.9047" height="90" fill="white" transform="translate(0.0478516)" />
                              </clipPath>
                            </defs>
                          </svg>


                          <p className="mt-2">Create event</p>
                        </div>
                      </Col>
                      <Col className="mt-2" xs={4} sm={4} md={4} lg={4} onClick={handleJobManage}>
                        <div >
                          <svg width="45" height="52" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.4295 18.3737C15.0082 16.3017 17.6116 15.2844 20.1769 15.7371C22.8183 16.2032 25.4926 15.1104 27.0516 12.9278L27.9633 11.6514C28.9685 10.2442 30.3406 9.13976 31.9301 8.45853L33.1052 7.95491C35.3145 7.00807 37.7621 6.76571 40.1142 7.26088L42.6198 7.78838C44.741 8.23494 46.5157 9.67876 47.3845 11.6647L47.538 12.0153C48.6892 14.6468 51.492 16.1485 54.3206 15.6493C56.5851 15.2497 58.8855 16.1314 60.3027 17.9423L63.2348 21.6889C65.526 24.6166 65.8861 28.6164 64.1546 31.9063C62.7954 34.4888 62.7067 37.5547 63.9143 40.2115L65.2076 43.0567C66.3535 45.5776 66.4307 48.455 65.4216 51.0338L64.6915 52.8994C63.404 56.1897 60.04 58.1791 56.5364 57.7221C53.2348 57.2915 50.0311 59.0348 48.5995 62.041L47.9902 63.3205C46.7322 65.9625 44.3423 67.89 41.4939 68.5603L40.6881 68.7498C38.6096 69.2389 36.4327 69.0998 34.4333 68.35L32.5451 67.6419C30.6236 66.9214 29.1421 65.3546 28.53 63.3958C27.6284 60.5107 24.8955 58.5957 21.876 58.7329L20.3744 58.8012C17.6259 58.9261 14.9833 57.7291 13.2645 55.5806L12.3092 54.3865C9.67357 51.092 9.1518 46.5812 10.9657 42.772C12.2645 40.0445 12.3859 36.9033 11.3015 34.0838L10.2657 31.3909C8.85752 27.7296 9.4477 23.5999 11.8251 20.4795L13.4295 18.3737Z" fill="#58A4B0" fill-opacity="0.2" />
                            <path d="M37.5 46.875C42.6777 46.875 46.875 42.6777 46.875 37.5C46.875 32.3223 42.6777 28.125 37.5 28.125C32.3223 28.125 28.125 32.3223 28.125 37.5C28.125 42.6777 32.3223 46.875 37.5 46.875Z" stroke="#8F8F8F" stroke-width="5" />
                            <path d="M43.0158 6.725C41.8689 6.25 40.4127 6.25 37.5002 6.25C34.5877 6.25 33.1314 6.25 31.9846 6.725C31.2258 7.0391 30.5363 7.49967 29.9556 8.08039C29.3749 8.6611 28.9143 9.35056 28.6002 10.1094C28.3127 10.8062 28.1971 11.6219 28.1533 12.8063C28.133 13.6623 27.8958 14.4992 27.4641 15.2386C27.0323 15.9781 26.4201 16.5959 25.6846 17.0344C24.9371 17.4524 24.0958 17.674 23.2393 17.6784C22.3829 17.6827 21.5394 17.4698 20.7877 17.0594C19.7377 16.5031 18.9783 16.1969 18.2252 16.0969C16.5824 15.8808 14.9211 16.326 13.6064 17.3344C12.6252 18.0937 11.8939 19.3531 10.4377 21.875C8.98144 24.3969 8.25019 25.6562 8.09081 26.8906C7.98342 27.7045 8.03744 28.5316 8.24977 29.3247C8.4621 30.1177 8.8286 30.8611 9.32831 31.5125C9.79081 32.1125 10.4377 32.6156 11.4408 33.2469C12.9189 34.175 13.8689 35.7562 13.8689 37.5C13.8689 39.2438 12.9189 40.825 11.4408 41.75C10.4377 42.3844 9.78769 42.8875 9.32831 43.4875C8.8286 44.1389 8.4621 44.8823 8.24977 45.6753C8.03744 46.4684 7.98342 47.2955 8.09081 48.1094C8.25331 49.3406 8.98144 50.6031 10.4346 53.125C11.8939 55.6469 12.6221 56.9062 13.6064 57.6656C14.2578 58.1653 15.0012 58.5318 15.7943 58.7442C16.5873 58.9565 17.4144 59.0105 18.2283 58.9031C18.9783 58.8031 19.7377 58.4969 20.7877 57.9406C21.5394 57.5302 22.3829 57.3173 23.2393 57.3216C24.0958 57.326 24.9371 57.5476 25.6846 57.9656C27.1939 58.8406 28.0908 60.45 28.1533 62.1938C28.1971 63.3813 28.3096 64.1937 28.6002 64.8906C28.9143 65.6494 29.3749 66.3389 29.9556 66.9196C30.5363 67.5003 31.2258 67.9609 31.9846 68.275C33.1314 68.75 34.5877 68.75 37.5002 68.75C40.4127 68.75 41.8689 68.75 43.0158 68.275C43.7746 67.9609 44.4641 67.5003 45.0448 66.9196C45.6255 66.3389 46.0861 65.6494 46.4002 64.8906C46.6877 64.1937 46.8033 63.3813 46.8471 62.1938C46.9096 60.45 47.8064 58.8375 49.3158 57.9656C50.0633 57.5476 50.9046 57.326 51.761 57.3216C52.6174 57.3173 53.461 57.5302 54.2127 57.9406C55.2627 58.4969 56.0221 58.8031 56.7721 58.9031C57.586 59.0105 58.4131 58.9565 59.2061 58.7442C59.9991 58.5318 60.7426 58.1653 61.3939 57.6656C62.3783 56.9094 63.1064 55.6469 64.5627 53.125C66.0189 50.6031 66.7502 49.3438 66.9096 48.1094C67.0169 47.2955 66.9629 46.4684 66.7506 45.6753C66.5383 44.8823 66.1718 44.1389 65.6721 43.4875C65.2096 42.8875 64.5627 42.3844 63.5596 41.7531C62.8281 41.3075 62.2216 40.6836 61.797 39.9397C61.3723 39.1959 61.1433 38.3564 61.1314 37.5C61.1314 35.7562 62.0814 34.175 63.5596 33.25C64.5627 32.6156 65.2127 32.1125 65.6721 31.5125C66.1718 30.8611 66.5383 30.1177 66.7506 29.3247C66.9629 28.5316 67.0169 27.7045 66.9096 26.8906C66.7471 25.6594 66.0189 24.3969 64.5658 21.875C63.1064 19.3531 62.3783 18.0937 61.3939 17.3344C60.7426 16.8347 59.9991 16.4682 59.2061 16.2558C58.4131 16.0435 57.586 15.9895 56.7721 16.0969C56.0221 16.1969 55.2627 16.5031 54.2096 17.0594C53.4582 17.4692 52.6153 17.6819 51.7595 17.6775C50.9036 17.6731 50.0629 17.4519 49.3158 17.0344C48.5803 16.5959 47.9681 15.9781 47.5363 15.2386C47.1046 14.4992 46.8674 13.6623 46.8471 12.8063C46.8033 11.6188 46.6908 10.8062 46.4002 10.1094C46.0861 9.35056 45.6255 8.6611 45.0448 8.08039C44.4641 7.49967 43.7746 7.0391 43.0158 6.725Z" stroke="#999999" stroke-width="5" />
                          </svg>
                          <p className="mt-2">Manage event</p>
                        </div>
                      </Col>
                      <Col className="mt-2" xs={4} sm={4} md={4} lg={4} onClick={handleJobView}>
                        <div>
                          <svg width="54" height="50" viewBox="0 0 84 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.9239 40.8388C16.5688 34.942 20.8601 30.0917 26.6343 28.7331L38.9905 25.8258C41.2926 25.2841 43.6944 25.3344 45.9718 25.9721L58.7069 29.5379C64.0508 31.0342 68.0065 35.5458 68.7914 41.0395L69.9271 48.9898C70.3014 51.6095 69.9254 54.2817 68.843 56.6965L66.898 61.0352C65.076 65.0997 61.4286 68.0546 57.0746 68.9937L42.6804 72.0982C39.9556 72.6859 37.1174 72.4468 34.5293 71.4116L23.3738 66.9495C17.5377 64.615 13.9728 58.6771 14.6562 52.4286L15.9239 40.8388Z" fill="#58A4B0" fill-opacity="0.2" />
                            <path d="M42.0003 73C28.667 73 12.667 59.6667 12.667 49C12.667 38.3333 28.667 25 42.0003 25C55.3337 25 71.3337 38.3333 71.3337 49C71.3337 59.6667 55.3337 73 42.0003 73ZM42.0003 35.6667C38.4641 35.6667 35.0727 37.0714 32.5722 39.5719C30.0718 42.0724 28.667 45.4638 28.667 49C28.667 52.5362 30.0718 55.9276 32.5722 58.4281C35.0727 60.9286 38.4641 62.3333 42.0003 62.3333C45.5365 62.3333 48.9279 60.9286 51.4284 58.4281C53.9289 55.9276 55.3337 52.5362 55.3337 49C55.3337 45.4638 53.9289 42.0724 51.4284 39.5719C48.9279 37.0714 45.5365 35.6667 42.0003 35.6667Z" stroke="#8F8F8F" stroke-width="5" />
                          </svg>

                          <p className="mt-2">View all</p>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Container>
            </Col>

            {/* =============================================================== */}
            <Col xs={12} md={6} style={{ width: '540px', marginLeft: '695px', marginTop: '-130px' }}>
              <Container style={{ marginLeft: '10px', width: '480px', backgroundColor: 'white', boxShadow: '0px 4px 8px rgba(0,0,0,0.2)', height: '130px', borderRadius: '12px' }}>
                <h4 className="mb-3" style={{ color: '#58a4b0' }}>Successfully Completed</h4>

                {/* Button to Load Data */}


                {/* Loading Spinner */}
                {isFetching ? (
                  <div className="text-center py-2">
                    <Spinner animation="border" variant="success" />
                    <p className="mt-3">Fetching Data...</p>
                  </div>
                ) : (
                  <div style={{ overflowY: 'auto', height: '100px', overflowX: 'hidden' }}>
                    {/* Header Row */}
                    <Row className="font-weight-bold text-secondary mb-2" style={{
                      fontSize: '10px'
                    }}>
                      <Col xs={2}>Title<spam>
                      </spam></Col>
                      <Col xs={3}>Date of Posting<spam>
                      </spam></Col>
                      <Col xs={2}>Author<spam>
                      </spam></Col>
                      <Col xs={2}>Description<spam>

                      </spam></Col>
                      <Col xs={2}>Status<spam>
                      </spam></Col>
                    </Row>

                    {/* Dynamic Data Rows */}
                    {data.map((item, index) => (
                      <Row
                        key={index}
                        className="align-items-center mb-2 py-2 border-bottom"

                      >
                        <Col xs={3}>{item.title}</Col>
                        <Col xs={3}>{item.date}</Col>
                        <Col xs={3}>{item.company}</Col>
                        <Col xs={2}>{item.required}</Col>
                        <Col xs={1}>
                          <span className="badge bg-success">{item.status}</span>
                        </Col>
                      </Row>
                    ))}
                  </div>
                )}
              </Container>                    </Col>
          </Row>
        </Container>
        <Modal show={show} onHide={handleClose} centered style={{ width: '350px', marginLeft: '500px', borderRadius: '15px' }}>
          <Modal.Header closeButton className="no-underline" style={{ borderBottom: 'none' }}>
            <Modal.Title style={{ color: '#58a4b0' }}>Create Job</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Display error message if submission fails */}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit(onSubmit)}>
              {/* Job Title */}
              <Form.Group className="mb-1" controlId="jobTitle" style={{ marginTop: '-22px' }}>
                <Form.Label style={{ color: 'black', fontSize: '17px' }}>
                  Job title<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter job title"
                  {...register("jobTitle", { required: "Job title is required" })}
                  isInvalid={!!errors.jobTitle}
                  style={{ borderRadius: '12px', marginTop: '-5px', border: '1px solid black', height: "29px" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.jobTitle?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Company Name */}
              <Form.Group className="mb-1" controlId="companyName">
                <Form.Label style={{ color: 'black', fontSize: '17px' }}>
                  Company name<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter company name"
                  {...register("companyName", { required: "Company name is required" })}
                  isInvalid={!!errors.companyName}
                  style={{ borderRadius: '12px', marginTop: '-5px', border: '1px solid black', height: "29px" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.companyName?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Workplace Type */}
              <Form.Group className="mb-1" controlId="workplaceType">
                <Form.Label style={{ color: 'black', fontSize: '17px' }}>
                  Workplace type<span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  {...register("workplaceType", { required: "Workplace type is required" })}
                  isInvalid={!!errors.workplaceType}
                  style={{ borderRadius: '12px', marginTop: '-5px', height: "32px", border: '1px solid black' }}

                >
                  <option value="On-site">On-site</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.workplaceType?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Job Location */}
              <Form.Group className="mb-1" controlId="jobLocation">
                <Form.Label style={{ color: 'black', fontSize: '17px' }}>
                  Job location<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter job location"
                  {...register("jobLocation", { required: "Job location is required" })}
                  isInvalid={!!errors.jobLocation}
                  style={{ borderRadius: '12px', marginTop: '-5px', border: '1px solid black', height: "29px" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.jobLocation?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Job Type */}
              <Form.Group className="mb-1" controlId="jobType">
                <Form.Label style={{ color: 'black', fontSize: '17px' }}>
                  Job type<span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  {...register("jobType", { required: "Job type is required" })}
                  isInvalid={!!errors.jobType}
                  style={{ borderRadius: '12px', marginTop: '-5px', height: "32px", border: '1px solid black' }}
                >
                  <option value="Full time">Full time</option>
                  <option value="Part time">Part time</option>
                  <option value="Internship">Internship</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.jobType?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Salary */}
              <Form.Group className="mb-1" controlId="salary">
                <Form.Label style={{ color: 'black', fontSize: '17px' }}>
                  Salary<span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  {...register("salary", { required: "Salary is required" })}
                  isInvalid={!!errors.salary}
                  style={{ borderRadius: '12px', marginTop: '-5px', height: "32px", border: '1px solid black' }}
                >
                  <option value="">Select</option>
                  <option value="20k-30k">20k-30k</option>
                  <option value="30k-50k">30k-50k</option>
                  <option value="50k+">50k+</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.salary?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Submit Button */}
              <Button type="submit" className="w-50" disabled={isLoading} style={{ backgroundColor: '#58a4b0', marginLeft: '80px', border: 'none' }}>
                {isLoading ? <Spinner animation="border" size="sm" /> : "Next"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        <Modal
          show={isModalOpen}
          onHide={() => setIsModalOpen(false)}
          centered

        >
          <Modal.Header closeButton>
            <Modal.Title style={{ fontWeight: "bold", color: "#52b8c3" }}>
              Post Donation
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              style={{
                textAlign: "center",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <div>
                <i className="bi bi-image" style={{ fontSize: "40px", color: "#9e9e9e" }}></i>
              </div>
              <p style={{ margin: "10px 0", color: "#9e9e9e" }}>
                Upload cover image
                <br />
                <small>minimum width 480 pixels, 16:9 recommended</small>
              </p>
            </div>

            {/* Campaign Title Input */}
            {/* Campaign Title Input */}
            <Form.Group className="mt-4">
              <Form.Label>
                Campaign Title<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="ex: Scholarship Fund for Future Leaders"
                required
              />
            </Form.Group>

            {/* Campaign Description Input */}
            <Form.Group className="mt-4">
              <Form.Label>
                Campaign Description<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="ex: Scholarship Fund for Future Leaders..."
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{
                backgroundColor: "#52b8c3",
                border: "none",
                width: "100%",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              onClick={handleNext} // When clicked, this will open the next modal and close this one
            >
              Next
            </Button>
          </Modal.Footer>
        </Modal>

        {/* New Popup (only visible when 'Next' is clicked) */}
        {isPopupVisible && (
          <div className="popup-overlay">
            <div className="popup-content">
              <button className="close-popup-btn" onClick={handlePopupToggle}>
                &times;
              </button>
              <h2>Post Donation</h2>
              <form>
                <label>
                  Category Type<span className="required">*</span>
                  <select>
                    <option value="">Select</option>
                    <option value="Category 1">News</option>
                    <option value="Category 2">Blogs</option>
                  </select>
                </label>
                <label>
                  Tgas/Keyword<span className="required">*</span>
                  <input type="text" placeholder="ex: UX Design, Mentorship, Alumni Success" />
                </label>

                <label>
                  Author Name<span className="required">*</span>
                  <input type="text" placeholder="name" />
                </label>
                <label>
                  Allow Commenting<span className="required">*</span>
                  <div className="toggle-buttons">
                    <label>
                      <input type="radio" name="commenting" value="Don't Allow" />
                      Don't Allow
                    </label>
                    <label>
                      <input type="radio" name="commenting" value="Allow" />
                      Allow
                    </label>
                  </div>
                </label>
                <div className="form-actions">
                  <button type="button" className="discard-btn" onClick={handlePopupToggle}>
                    Discard
                  </button>
                  <button type="submit" className="create-btn">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ContentManageHome;
