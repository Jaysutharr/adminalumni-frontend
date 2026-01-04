import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './UserDetails.css'; // Custom CSS for exact styling
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import USerDashboard from './USerDashboard';





const UserDetails = () => {
  const navigate = useNavigate();

  const handleBack = () => { window.history.back(); };
  const handleSelection = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "Mentor") {
      navigate("/users-management/mentor"); // Navigate to the mentor page
    } else if (selectedValue === "Others") {
      navigate("/users-management/others"); // Navigate to the others page
    }
  };
  useEffect(() => {
    // Fetch data from API
    // axios.get('https://api.example.com/students') // Replace with your API endpoint
    axios.get(process.env.REACT_APP_localUrl+'/api/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error('Error fetching student data:', error));
  }, []);
  // ================================
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

  const handleNavigation = () => {
    // Handle navigation logic
  };

  return (
    <>
    <USerDashboard/>
  <div style={{marginLeft:'280px',marginTop:'20px'}}>
  <svg onClick={handleBack}
   marginLeft='320px' width="25" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.75 18.75H33.75C34.0815 18.75 34.3995 18.8817 34.6339 19.1161C34.8683 19.3505 35 19.6685 35 20C35 20.3315 34.8683 20.6495 34.6339 20.8839C34.3995 21.1183 34.0815 21.25 33.75 21.25H8.75C8.41848 21.25 8.10054 21.1183 7.86612 20.8839C7.6317 20.6495 7.5 20.3315 7.5 20C7.5 19.6685 7.6317 19.3505 7.86612 19.1161C8.10054 18.8817 8.41848 18.75 8.75 18.75Z" fill="#1B1B1E"/>
<path d="M9.26973 19.9996L19.6372 30.3646C19.8719 30.5993 20.0038 30.9177 20.0038 31.2496C20.0038 31.5816 19.8719 31.8999 19.6372 32.1346C19.4025 32.3693 19.0842 32.5012 18.7522 32.5012C18.4203 32.5012 18.1019 32.3693 17.8672 32.1346L6.61723 20.8846C6.50083 20.7685 6.40847 20.6306 6.34545 20.4787C6.28244 20.3268 6.25 20.164 6.25 19.9996C6.25 19.8352 6.28244 19.6724 6.34545 19.5205C6.40847 19.3687 6.50083 19.2307 6.61723 19.1146L17.8672 7.86463C18.1019 7.62991 18.4203 7.49805 18.7522 7.49805C19.0842 7.49805 19.4025 7.62991 19.6372 7.86463C19.8719 8.09934 20.0038 8.41769 20.0038 8.74963C20.0038 9.08156 19.8719 9.39991 19.6372 9.63463L9.26973 19.9996Z" fill="#1B1B1E"/>
</svg>
  </div>

    <Container style={{ marginLeft: '320px',marginTop:'-26px', padding: '10px', background: 'white', borderRadius: '10px', maxWidth: '1070px' ,  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}}>
      <Row className="align-items-center mb-3">
        <Col >
          <h2 style={{ fontSize: '24px', color: '#58a4b0', textAlign:'left' }}>All Students</h2>
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
  <div style={{ position: 'relative', marginRight: '10px' }}>
  <FaSearch
  style={{
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#58a4b0',
  }}
/>
    <Form.Control
      type="text"
      placeholder="Search by name and email"
      style={{
        padding: '10px 10px 10px 30px', // Space for the icon
        border: '1px solid #ccc',
        borderRadius: '15px',
        width: '300px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
      }}
    />
  </div>
  <div onChange={handleSelection}>
  <Form.Select
    style={{
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '15px',
      width: '150px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    
    }}
  ><option >Students</option>
    <option value="Mentor">Mentor</option>
    <option value="Others">Others</option>
  </Form.Select>
  </div>
</Col>

      </Row>

      <Row className="py-2" style={{ textAlign:'center', borderRadius: '5px', fontWeight: '500' }}>
        <Col>Full Name</Col>
        <Col>Email & Contact</Col>
        <Col>Role</Col>
        <Col>Course/Program</Col>
        <Col>Last Active</Col>
        <Col>Action</Col>
      </Row>

      {students.map((student, index) => (
        <Row
          key={index}
          className="py-2 align-items-center"
          style={{ borderBottom: '1px solid #dee2e6' }}
        >
          <Col>{student.fullName}</Col>
          <Col>{student.email}</Col>
          <Col>{student.role}</Col>
          <Col>{student.course}</Col>
          <Col>{student.lastActive}</Col>
          <Col>
            <Button
              style={{
                padding: '5px 10px',
                backgroundColor: '#00a8e8',
                color: '#fff',
                border: 'none',
                borderRadius: '5px'
              }}
            >
              View
            </Button>
          </Col>
        </Row>
      ))}
    </Container>
    </>
  );
};

export default UserDetails;
