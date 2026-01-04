import React, { useEffect, useState } from "react";
import './UserHome.css'
import bg from '../assets/companylogo1.png';
import pi from '../assets/AdminImage.jpg';
import ni from '../assets/notificationI.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Table, Dropdown, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import uhi from '../assets/profileNetworkinfImage.jpeg'
import { FaSearch, FaBell } from "react-icons/fa";
import axios from 'axios';
import USerDashboard from "./USerDashboard";

const UserHome = () => {

  const navigate = useNavigate();
  const handleNotifyNavigation = () => {
    navigate('/dashboard-noti')
  }
  const handleNavigation = () => {
    navigate('/users-management/users-details'); // Navigate to the specified path
  };



// ==========================================================
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// Metrics
const [totalUsers, setTotalUsers] = useState(0);
const [newUsers, setNewUsers] = useState(0);
const [inactiveUsers, setInactiveUsers] = useState(0);
const [userFeedbackCount, setUserFeedbackCount] = useState(0);

useEffect(() => {
  const fetchData = async () => {
    try {
      // const response = await axios.get(
      //   " /api/v1/getalluser"
      // );
      const response = await axios.get(
        process.env.REACT_APP_localUrl+" /api/v1/getalluser"
      );

      // Check if the response contains the expected data
      const users = response.data.data && Array.isArray(response.data.data) ? response.data.data : [];
      
      if (users.length === 0) {
        setError("No users data found.");
        setLoading(false);
        return;
      }

      // Calculate Metrics
      setTotalUsers(users.length);

      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);

      // New Users (Active Last Month)
      const activeLastMonth = users.filter(
        (user) =>
          user.status === "Active" && new Date(user.createdAt) > lastMonth
      ).length;
      setNewUsers(activeLastMonth);

      // Inactive Users
      const inactiveCount = users.filter(
        (user) => user.status === "Inactive"
      ).length;
      setInactiveUsers(inactiveCount);

      // User Feedback Count
      const feedbackCount = users.reduce(
        (count, user) => count + (user.feedback?.length || 0),
        0
      );
      setUserFeedbackCount(feedbackCount);

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  fetchData();
}, []);

// =====================================


const [students, setStudents] = useState([]);
const [filter, setFilter] = useState("All");
const [studentData, setStudentData] = useState([]);
const [additionalData, setAdditionalData] = useState([]);

useEffect(() => {
  // Fetch student details (fullName, contact, etc.)
  const fetchStudentData = async () => {
    try {
      // const response = await fetch("API_URL_FOR_STUDENT_DATA");
      const response = await fetch(
        process.env.REACT_APP_localUrl + "/api/students"
      );
      const data = await response.json();
      setStudentData(data);  // Assuming this contains fullName, contact, etc.
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  // Fetch additional details (course, role, etc.)
  const fetchAdditionalData = async () => {
    try {
      // const response = await fetch("API_URL_FOR_ADDITIONAL_DATA");
      const response = await fetch(
      process.env.REACT_APP_localUrl + "/api/additional-data"
    );
      const data = await response.json();
      setAdditionalData(data);  // Assuming this contains course, role, etc.
    } catch (error) {
      console.error("Error fetching additional data:", error);
    }
  };

  // Call the fetch functions
  fetchStudentData();
  fetchAdditionalData();
}, []);

// Combine the data
useEffect(() => {
  if (studentData.length > 0 && additionalData.length > 0) {
    const combinedData = studentData.map((student) => {
      // Find the additional data for each student based on the ID
      const additionalInfo = additionalData.find(
        (item) => item.studentId === student.id
      );
      
      return {
        ...student, // All student data (fullName, contact, etc.)
        ...additionalInfo, // Additional info (course, role, etc.)
      };
    });

    setStudents(combinedData);  // Set the combined data
  }
}, [studentData, additionalData]);

// ===================================================================
const [users, setUsers] = useState([]);


useEffect(() => {
  const fetchUsers = async () => {
    try {
      // const response = await axios.get('/api/users');
      const response = await axios.get(process.env.REACT_APP_localUrl+'/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  fetchUsers();
}, []);






  // Fetch data from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // const response = await axios.get("https://api.example.com/students"); // Replace with your API URL
         const response = await axios.get(process.env.REACT_APP_localUrl+"/api/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchStudents();
  }, []);




  
  
  return (
    <>
      <USerDashboard/>
      {/* ============= */}
      <div class="new-wrapper">
        <div class="left-container">
          <Container fluid className="dashboard-stats-container">
            <Row className="justify-content-center">
              <Col xs={12} md={6} lg={2} className="mb-3">
                <Card className="stats-card">
                  <Card.Body>
                    <h6 className="card-title">Total users</h6>
                    <h2 className="card-value">{totalUsers} <svg width="85" height="30" viewBox="0 0 85 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.45469 47.8748C0.83322 48.1754 0.573114 48.9229 0.873727 49.5443C1.17434 50.1658 1.92183 50.4259 2.5433 50.1253L1.45469 47.8748ZM28.5 43L28.2669 41.7719L28.5 43ZM42 32.5L42.8839 33.3839L42.8839 33.3839L42 32.5ZM84.6343 5.99925L71.1883 0.751489L73.3666 15.0199L84.6343 5.99925ZM13.633 41L12.8173 40.0528L13.633 41ZM55.6328 27.9991L56.563 28.8341L56.7186 28.6608L56.8013 28.4431L55.6328 27.9991ZM28.7331 44.2281C33.2309 43.3743 35.724 41.7481 37.6639 39.6854C38.5959 38.6945 39.394 37.6078 40.1866 36.5646C40.9923 35.5041 41.8241 34.4437 42.8839 33.3839L41.1161 31.6161C39.9304 32.8018 39.0144 33.975 38.196 35.0522C37.3644 36.1467 36.662 37.1017 35.8428 37.9727C34.2805 39.6338 32.2691 41.0122 28.2669 41.7719L28.7331 44.2281ZM1.999 49C2.5433 50.1253 2.54352 50.1252 2.54376 50.1251C2.54387 50.125 2.54413 50.1249 2.54434 50.1248C2.54477 50.1246 2.54527 50.1244 2.54586 50.1241C2.54704 50.1235 2.54855 50.1228 2.55038 50.1219C2.55403 50.1201 2.55899 50.1177 2.56521 50.1146C2.57766 50.1085 2.59522 50.0998 2.61775 50.0886C2.66281 50.0662 2.72777 50.0335 2.81153 49.9906C2.97904 49.9046 3.22185 49.7775 3.53129 49.6087C4.15011 49.2711 5.03595 48.7665 6.11954 48.0909C8.28573 46.7405 11.2478 44.7033 14.4486 41.9472L12.8173 40.0528C9.7308 42.7105 6.87589 44.6734 4.79693 45.9695C3.75794 46.6172 2.91417 47.0975 2.334 47.414C2.04396 47.5723 1.81994 47.6895 1.6705 47.7661C1.59579 47.8045 1.53973 47.8326 1.5034 47.8507C1.48523 47.8598 1.472 47.8663 1.46384 47.8703C1.45976 47.8723 1.45694 47.8737 1.45541 47.8744C1.45465 47.8748 1.4542 47.875 1.45408 47.8751C1.45402 47.8751 1.45404 47.8751 1.45414 47.875C1.45419 47.875 1.45433 47.8749 1.45435 47.8749C1.45451 47.8749 1.45469 47.8748 1.999 49ZM14.4486 41.9472C15.2539 41.2538 15.9724 41.0966 16.7277 41.1732C17.5776 41.2593 18.5164 41.6449 19.7181 42.2089C21.9862 43.2734 25.0277 44.9315 28.7331 44.2281L28.2669 41.7719C25.5111 42.295 23.2601 41.1096 20.7803 39.9458C19.6082 39.3956 18.3093 38.8207 16.9799 38.6859C15.5557 38.5415 14.1529 38.9027 12.8173 40.0528L14.4486 41.9472ZM42.8839 33.3839C44.3645 31.9033 46.6113 31.5569 49.291 31.2696C50.5542 31.1341 51.9293 31.0051 53.1532 30.7003C54.3896 30.3923 55.6334 29.8698 56.563 28.8341L54.7026 27.1641C54.2463 27.6724 53.5533 28.0242 52.549 28.2744C51.5322 28.5276 50.3627 28.6403 49.0245 28.7838C46.5013 29.0544 43.3178 29.4145 41.1161 31.6161L42.8839 33.3839ZM56.8013 28.4431C61.3837 16.3848 68.2877 11.137 73.9777 8.85746L73.048 6.53677C66.6876 9.08485 59.2865 14.8657 54.4644 27.555L56.8013 28.4431Z" fill="#58B06B" />
                    </svg></h2>


                    <p className="card-subtext">Active users: 1,245</p>
                    <div className="icon-container">
                      <svg width="21" height="20" viewBox="0 0 41 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.61426 39.875H39.3851" stroke="#58A4B0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.3327 12.3125H8.24935C5.99419 12.3125 4.16602 14.1407 4.16602 16.3958V28.6458C4.16602 30.901 5.99419 32.7292 8.24935 32.7292H12.3327C14.5878 32.7292 16.416 30.901 16.416 28.6458V16.3958C16.416 14.1407 14.5878 12.3125 12.3327 12.3125Z" stroke="#58A4B0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M32.7497 2.10449H28.6663C26.4112 2.10449 24.583 3.93266 24.583 6.18783V28.6462C24.583 30.9013 26.4112 32.7295 28.6663 32.7295H32.7497C35.0048 32.7295 36.833 30.9013 36.833 28.6462V6.18783C36.833 3.93266 35.0048 2.10449 32.7497 2.10449Z" stroke="#58A4B0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>

                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={6} lg={2} className="mb-3">
                <Card className="stats-card1  ">
                  <Card.Body>
                    <h6 className="card-title" style={{ fontSize: "20px" }}>New Users (last month)</h6>
                    <h2 className="card-value" >{newUsers}  <svg style={{ marginLeft: "38px" }} width="55" height="30" viewBox="0 0 75 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.70526 54.8982C1.03441 55.0612 0.622671 55.7371 0.785614 56.4079C0.948557 57.0788 1.62448 57.4905 2.29533 57.3276L1.70526 54.8982ZM30.5 40.5L29.6161 39.6161L30.5 40.5ZM44.5 40.5L45.3839 41.3839L44.5 40.5ZM74.5009 0.000110424L62.1309 7.43762L74.757 14.4316L74.5009 0.000110424ZM2.0003 56.1129C2.29533 57.3276 2.29568 57.3275 2.2961 57.3274C2.29632 57.3273 2.29681 57.3272 2.29726 57.3271C2.29816 57.3269 2.29932 57.3266 2.30074 57.3263C2.30357 57.3256 2.30744 57.3246 2.31233 57.3234C2.32211 57.321 2.33597 57.3176 2.35383 57.3131C2.38954 57.3041 2.44126 57.291 2.50827 57.2736C2.64229 57.2388 2.83756 57.187 3.08854 57.1173C3.59044 56.9779 4.31552 56.767 5.2195 56.4783C7.0267 55.9011 9.55307 55.0114 12.4431 53.7577C18.2091 51.2564 25.4907 47.277 31.3839 41.3839L29.6161 39.6161C24.0306 45.2016 17.0624 49.0287 11.4482 51.4642C8.64814 52.6789 6.20183 53.5402 4.45888 54.0968C3.58778 54.375 2.89341 54.5769 2.41964 54.7084C2.18278 54.7742 2.00115 54.8224 1.88024 54.8538C1.81978 54.8694 1.77452 54.8809 1.74512 54.8883C1.73043 54.892 1.7197 54.8947 1.71303 54.8963C1.70969 54.8971 1.70737 54.8977 1.70607 54.898C1.70542 54.8982 1.70503 54.8983 1.70489 54.8983C1.70483 54.8983 1.70492 54.8983 1.70489 54.8983C1.70504 54.8983 1.70526 54.8982 2.0003 56.1129ZM31.3839 41.3839C32.2229 40.5449 32.9925 40.3811 33.802 40.478C34.7337 40.5896 35.7301 41.0465 36.9662 41.6303C38.1073 42.1692 39.4882 42.8351 40.9008 43.0042C42.4356 43.188 43.9774 42.7904 45.3839 41.3839L43.6161 39.6161C42.7771 40.4551 42.0075 40.6189 41.198 40.522C40.2663 40.4104 39.2699 39.9535 38.0338 39.3697C36.8927 38.8308 35.5118 38.1649 34.0992 37.9958C32.5644 37.812 31.0226 38.2096 29.6161 39.6161L31.3839 41.3839ZM45.3839 41.3839C57.392 29.3758 65.3771 18.1374 70.1126 10.4989L67.9877 9.18165C63.3354 16.6861 55.4659 27.7663 43.6161 39.6161L45.3839 41.3839Z" fill="#58B06B" />
                    </svg></h2>


                    <p className="card-subtext">Registered in September</p>
                    <div className="icon-container">
                      <svg width="41" height="20" viewBox="0 0 41 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.43 29.6088C6.54105 31.3278 -1.03354 34.8395 3.58063 39.2352C5.83259 41.381 8.3418 42.9163 11.4962 42.9163H29.4996C32.656 42.9163 35.1652 41.381 37.4172 39.2352C42.0313 34.8395 34.4568 31.3278 31.5678 29.6088C28.2149 27.628 24.3921 26.5832 20.4979 26.5832C16.6037 26.5832 12.7829 27.628 9.43 29.6088ZM29.6874 11.2705C29.6874 13.7072 28.7195 16.0441 26.9965 17.767C25.2735 19.49 22.9366 20.458 20.4999 20.458C18.0632 20.458 15.7264 19.49 14.0034 17.767C12.2804 16.0441 11.3124 13.7072 11.3124 11.2705C11.3124 8.83383 12.2804 6.49695 14.0034 4.77396C15.7264 3.05097 18.0632 2.08301 20.4999 2.08301C22.9366 2.08301 25.2735 3.05097 26.9965 4.77396C28.7195 6.49695 29.6874 8.83383 29.6874 11.2705Z" stroke="#58A4B0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          <Container fluid >
            <Row className="justify-content-center">
              <Col xs={12} md={6} lg={2} className="mb-1">
                <Card className="stats-card">
                  <Card.Body>
                    <h6 className="card-title">Inactive Users</h6>
                    <h2 className="card-value">{inactiveUsers}<svg style={{ marginLeft: "43px" }} width="55" height="16" viewBox="0 0 75 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.86146 6.92717C1.1711 6.92717 0.611458 7.48681 0.611458 8.17717C0.611458 8.86752 1.1711 9.42717 1.86146 9.42717L1.86146 6.92717ZM74.8615 8.17717L62.3615 0.960287L62.3615 15.394L74.8615 8.17717ZM1.86146 9.42717L63.6115 9.42717L63.6115 6.92717L1.86146 6.92717L1.86146 9.42717Z" fill="#B05858" />
                    </svg>
                    </h2>


                    <p className="card-subtext">No activity in 30 days</p>
                    <div className="icon-container">
                      <svg width="49" height="23" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.4" clip-path="url(#clip0_3489_10168)">
                          <path d="M33.4996 44.9163H15.4962C12.3418 44.9163 9.83259 43.381 7.58063 41.2352C2.96646 36.8395 10.541 33.3278 13.43 31.6088C16.7829 29.6281 20.6037 28.5832 24.4979 28.5832C28.6653 28.3888 38.7 28.2 39.5 29M33.6874 13.2705C33.6874 15.7072 32.7195 18.0441 30.9965 19.7671C29.2735 21.49 26.9366 22.458 24.4999 22.458C22.0632 22.458 19.7264 21.49 18.0034 19.7671C16.2804 18.0441 15.3124 15.7072 15.3124 13.2705C15.3124 10.8338 16.2804 8.49695 18.0034 6.77396C19.7264 5.05097 22.0632 4.08301 24.4999 4.08301C26.9366 4.08301 29.2735 5.05097 30.9965 6.77396C32.7195 8.49695 33.6874 10.8338 33.6874 13.2705Z" stroke="#58A4B0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M43.5781 32.4219L33.4219 42.5781M33.4219 32.4219L43.5781 42.5781" stroke="#5E5E5E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_3489_10168">
                            <rect width="49" height="49" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>


                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={6} lg={2} className="mb-3">
                <Card className="stats-card1  ">
                  <Card.Body>
                    <h6 className="card-title" style={{ fontSize: "20px" }}>User Feedback Score</h6>
                    <h2 className="card-value" > {userFeedbackCount} <svg width="65" height="29" viewBox="0 0 65 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.90965 35.8665C1.22113 35.9168 0.703776 36.5158 0.754103 37.2043C0.804429 37.8928 1.40338 38.4102 2.0919 38.3599L1.90965 35.8665ZM29.001 24.5L28.1171 23.6161L28.1171 23.6161L29.001 24.5ZM44.5005 21.5003L45.3844 22.3842L45.3844 22.3842L44.5005 21.5003ZM65.0009 0.500767L51.1606 4.59725L61.6284 14.535L65.0009 0.500767ZM2.00078 37.1132C2.0919 38.3599 2.09238 38.3598 2.09291 38.3598C2.09317 38.3598 2.09376 38.3597 2.09427 38.3597C2.0953 38.3596 2.09657 38.3595 2.09807 38.3594C2.10107 38.3592 2.10502 38.3589 2.1099 38.3585C2.11966 38.3577 2.13315 38.3566 2.15031 38.3552C2.18462 38.3523 2.23358 38.348 2.2966 38.342C2.42261 38.33 2.60488 38.3111 2.83858 38.2832C3.30591 38.2273 3.97942 38.1349 4.82061 37.9879C6.50213 37.694 8.85877 37.1806 11.5809 36.3005C17.0173 34.5428 23.9631 31.3057 29.8849 25.3839L28.1171 23.6161C22.5602 29.173 16.0059 32.2424 10.8118 33.9217C8.21877 34.7601 5.97761 35.2477 4.39013 35.5252C3.59682 35.6639 2.96804 35.7499 2.5417 35.8009C2.32856 35.8264 2.16614 35.8431 2.05919 35.8533C2.00572 35.8584 1.96612 35.8619 1.941 35.864C1.92844 35.865 1.91949 35.8657 1.91424 35.8662C1.91162 35.8664 1.90992 35.8665 1.90915 35.8666C1.90877 35.8666 1.90861 35.8666 1.9087 35.8666C1.90874 35.8666 1.90898 35.8666 1.909 35.8666C1.9093 35.8665 1.90965 35.8665 2.00078 37.1132ZM29.8849 25.3839C31.6325 23.6363 33.7296 23.8523 36.5829 24.2388C39.2339 24.598 42.6409 25.1276 45.3844 22.3842L43.6166 20.6164C41.869 22.364 39.7718 22.148 36.9185 21.7615C34.2676 21.4023 30.8605 20.8727 28.1171 23.6161L29.8849 25.3839ZM45.3844 22.3842C51.0602 16.7084 55.1699 12.5639 58.145 9.5375L56.3622 7.78489C53.3936 10.8047 49.2892 14.9438 43.6166 20.6164L45.3844 22.3842Z" fill="#58A4B0" />
                    </svg>
                    </h2>


                    <p className="card-subtext">Based on 500 reviews</p>
                    <div className="icon-container">
                      <svg width="41" height="21" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26.1553 21.3163C26.4616 21.4593 26.8087 21.5205 27.1353 21.5205C27.8091 21.5205 28.442 21.2551 28.932 20.7855L33.3828 16.4163H35.302C38.4053 16.4163 40.9166 13.9051 40.9166 10.8018V5.69759C40.9166 2.59426 38.4053 0.0830078 35.302 0.0830078H26.1145C23.0112 0.0830078 20.4999 2.59426 20.4999 5.69759V10.8018C20.4999 13.3743 22.2353 15.5384 24.5832 16.2122V18.9684C24.5832 19.9893 25.2162 20.908 26.1553 21.3163ZM22.5 5.69759C22.5 4.28884 24.7057 2 26.1145 2H35.302C36.7107 2 39 4.28884 39 5.69759V10.8018C39 12.2105 36.9087 14.198 35.5 14.198L32.117 14.4683L26.5 20V14.4996L25 14.4683C23.5912 14.4683 22.5 12.2105 22.5 10.8018V5.69759ZM12.3332 23.5622C8.39282 23.5622 5.18741 20.3568 5.18741 16.4163C5.18741 12.4759 8.39282 9.27051 12.3332 9.27051C16.2737 9.27051 19.4791 12.4759 19.4791 16.4163C19.4791 20.3568 16.2737 23.5622 12.3332 23.5622ZM12.3332 11.5C10.0874 11.5 7.5 14.1705 7.5 16.4163C7.5 18.6622 10.0874 21.5205 12.3332 21.5205C14.5791 21.5205 17 18.6622 17 16.4163C17 14.1705 14.5791 11.5 12.3332 11.5ZM12.3332 40.9163C8.12741 40.9163 4.90157 39.773 2.73741 37.5068C0.00974083 34.6403 0.0771158 31.0265 0.0832408 30.6529V30.6263C0.0832408 28.4418 1.92074 26.6247 4.16657 26.6247H20.4999C22.7457 26.6247 24.5832 28.4622 24.5832 30.708L24.5853 30.7203C24.5914 30.9796 24.6772 34.6198 21.9311 37.5068C19.7649 39.773 16.5391 40.9163 12.3332 40.9163ZM4.16657 29C3.59491 29 2.49759 30.1363 2.49759 30.708L2.5 30.5243C2.5 30.7182 2.35552 34.2259 4.22773 36.1798C5.77939 37.7927 9.00532 39 12.3332 39C15.6612 39 18.9483 37.8131 20.5 36.1798C22.364 34.2361 21.9311 30.7733 21.927 30.6386L21.9137 30.7693C21.9137 30.1363 21.0512 28.9796 20.4999 28.9796H4.16657V29Z" fill="#ABD0D5" />
                      </svg>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
  {/*============================================================================================================== */}
  <div className="right-container">
      <Container style={{ maxWidth: '600px' }} className="my-4">
        <h5 style={{ color: '#58a4b0', fontWeight: '600' }}>User approvals</h5>
        {users.map((user) => (
          <Row
            key={user.id}
            className="align-items-center py-2"
            style={{
              borderBottom: '1px solid #E5E5E5',
              fontSize: '14px',
            }}
          >
            <Col xs={1}>
              <img
                src={user.avatarUrl} // Avatar image comes from database
                alt="User"
                className="rounded-circle"
                style={{
                  width: '30px',
                  height: '30px',
                  border: 'none',
                }}
              />
            </Col>
            <Col xs={7} style={{ color: '#000000' }}>
              <span>
                <strong>{user.name}</strong> wants to register as {user.role}
              </span>
            </Col>
            <Col xs={4} className="text-end">
              <Button variant="link" className="text-muted" style={{ padding: '0', marginRight: '20px', textDecoration: 'none', fontWeight: '500' }}>
                Ignore
              </Button>
              <Button className="accept-button" style={{ color: 'black', border: '1px solid #58a4b0', fontSize: '12px', backgroundColor: 'white', fontWeight: '500', borderRadius: '10px', padding: '2px 10px' }}>
                Accept
              </Button>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
      </div>


{/* ================================================================================================================== */}

<Container fluid className="p-1" style={{ backgroundColor: "white", borderRadius: '12px', boxShadow: " 0 2px 5px rgba(0, 0, 0, 0.1)", width: "514px", marginLeft: '332px' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0" style={{ color: "#58a4b0", fontSize: "25px", fontFamily: "poppins" }}>
          All students
        </h2>
        <div className="d-flex align-items-center">
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              className="text-dark"
              style={{
                backgroundColor: "white",
                border: "1px solid #ddd",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              {filter}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setFilter("Students")}>Students</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter("Mentors")}>Mentors</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter("Others")}>Others</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button
            className="ms-2 p-1"
            style={{
              backgroundColor: "white",
              border: "1px solid white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg onClick={handleNavigation} width="27" height="23" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Your SVG code */}
            </svg>
          </Button>
        </div>
      </div>

      <Table responsive>
        <thead>
          <tr>
            <th style={{ fontWeight: '500', borderBottom: 'none' }}>Full Name</th>
            <th style={{ fontWeight: '500', borderBottom: 'none' }}>Contact</th>
            <th style={{ fontWeight: '500', borderBottom: 'none' }}>Course</th>
            <th style={{ fontWeight: '500', borderBottom: 'none' }}>Conn.</th>
            <th style={{ fontWeight: '500', borderBottom: 'none' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.fullName}</td>
              <td>{student.contact}</td>
              <td>{student.course}</td>
              <td>{student.connection}</td>
              <td>
                <Button
                  size="sm"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #ddd",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  →
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container></>
  );
};

export default UserHome;
