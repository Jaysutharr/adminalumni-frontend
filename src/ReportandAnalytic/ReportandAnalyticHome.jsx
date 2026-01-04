import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut,Bar } from "react-chartjs-2";

import { Container,Row, Col, Card , Image } from "react-bootstrap";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import ReportDashboard from "./ReportDashboard";
import { Chart, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

// Register the necessary components
Chart.register(CategoryScale, LinearScale, BarElement,ArcElement,  Title, Tooltip, Legend);

// Register Chart.js components


const ReportandAnalyticHome = () => {
  // Chart data for "Total Users"
  const [students, setStudents] = useState(0);
  const [mentors, setMentors] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const usersData = {
    labels: ['Students', 'Mentors'],
    datasets: [
      {
        label: 'User Distribution',
        data: [students, mentors],
        backgroundColor: ['#58A4B033', '#58a4b0'],
      },
    ],
  };

  const chartOptions = {
    cutoutPercentage: 70, // Adjust the size of the chart's cutout
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const response = await axios.get('/api/v1/getalljobs'); // Fetch all jobs
        const response = await axios.get(process.env.REACT_APP_localUrl+'/api/v1/getalljobs'); 
        const jobs = response.data; // Assuming the response data contains job details

        // Extract user counts from job data (assuming your job data has a field for user type)
        const studentCount = jobs.filter(job => job.userType === 'student').length;
        const mentorCount = jobs.filter(job => job.userType === 'mentor').length;

        // Update state with fetched values
        setStudents(studentCount);
        setMentors(mentorCount);
        setTotalUsers(studentCount + mentorCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Chart data for "Total Jobs Posted"
  const [previousJobs, setPreviousJobs] = useState(0);
  const [thisMonthJobs, setThisMonthJobs] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);

  const jobsData = {
    labels: ['Previous', 'This Month'],
    datasets: [
      {
        label: 'Job Postings',
        data: [previousJobs, thisMonthJobs],
        backgroundColor: ['#58A4B033', '#58a4b0'],
      },
    ],
  };


  useEffect(() => {
    const fetchJobData = async () => {
      try {
        // const response = await axios.get('/api/v1/getalljobs'); // Fetch all jobs
        const response = await axios.get(process.env.REACT_APP_localUrl+'/api/v1/getalljobs');
        const jobs = response.data; // Assuming the response data contains job details

        // Filter jobs posted in previous months and this month
        const previousMonthJobs = jobs.filter(job => {
          const jobDate = new Date(job.DateTime);
          const currentMonth = new Date().getMonth();
          return jobDate.getMonth() < currentMonth;
        }).length;

        const currentMonthJobs = jobs.filter(job => {
          const jobDate = new Date(job.DateTime);
          const currentMonth = new Date().getMonth();
          return jobDate.getMonth() === currentMonth;
        }).length;

        // Update the state with the fetched data
        setPreviousJobs(previousMonthJobs);
        setThisMonthJobs(currentMonthJobs);
        setTotalJobs(previousMonthJobs + currentMonthJobs);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchJobData();
  }, []);

  // Chart data for "Event Participation"
  const eventsData = {
    labels: ["Previous", "This Month"],
    datasets: [
      {
        data: [350, 150],
        backgroundColor: ["#58A4B033", "#58a4b0"],
        hoverBackgroundColor: ["#58A4B036", "#58a4b0"],
        borderWidth: 1,
      },
    ],
  };

// ----------------------------
const [mentorshipData, setMentorshipData] = useState({
  labels: [], // Initialize with empty labels
  datasets: [] // Initialize with empty datasets
});
const [mentorshipOptions, setMentorshipOptions] = useState({});
const [mentor, setMentor] = useState({ name: "", image: "", studentsEngaged: 0 });

useEffect(() => {
  // axios.get("/api/mentorship-data").then((response) => {
    axios.get(process.env.REACT_APP_localUrl+"/api/mentorship-data").then((response) => {
    const data = response.data;
    setMentorshipData(data.chartData || { labels: [], datasets: [] }); // Fallback to default
    setMentorshipOptions(data.chartOptions || {}); // Fallback to empty object
    setMentor({
      name: data.mentorName,
      image: data.mentorImage,
      studentsEngaged: data.studentsEngaged
    });
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });
}, []);


  
  // Chart data and options for Total Donations
  const [donationsData, setDonationsData] = useState(null);
  const [donationsOptions, setDonationsOptions] = useState({});
  const [topDonators, setTopDonators] = useState([]);

  useEffect(() => {
    // Fetch donation data and top donators
    const fetchDonations = async () => {
      try {
        // const { data } = await axios.get("/api/donations"); // Adjust API endpoint as needed
         const { data } = await axios.get(process.env.REACT_APP_localUrl+"/api/donations"); 
        setDonationsData(data.donationsData);
        setDonationsOptions(data.donationsOptions);
        setTopDonators(data.topDonators);
      } catch (error) {
        console.error("Error fetching donation data:", error);
      }
    };

    fetchDonations();
  }, []);




//   ----------------------------------------------

const [fetchedUsersData, setFetchedUsersData] = useState({
  inactive: 0,
  active: 0,
  newUsers: 0,
});

const [fetchedEventsData, setFetchedEventsData] = useState({
  event1: 0,
  event2: 0,
  event3: 0,
});

const [fetchedDonationsData, setFetchedDonationsData] = useState({
  campaign1: 0,
  campaign2: 0,
  campaign3: 0,
});

// Chart options
const doughnutChartOptions = {
  cutoutPercentage: 70, // Adjust this based on your requirements
};

// Fetch data from API on mount
useEffect(() => {
  // Function to fetch Users Data
  const fetchUsersData = async () => {
    try {
      const response = await axios.get('/api/v1/getUsersMetrics');
      // const response = await axios.get(process.env.REACT_APP_localUrl+'/api/v1/getUsersMetrics');
      const data = response.data;
      setFetchedUsersData({
        inactive: data.inactiveUsers,
        active: data.activeUsers,
        newUsers: data.newUsers,
      });
    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  };

  // Function to fetch Events Data
  const fetchEventsData = async () => {
    try {
      const response = await axios.get('/api/v1/getEventsMetrics');
      // const response = await axios.get(process.env.REACT_APP_localUrl+'/api/v1/getEventsMetrics');
      const data = response.data;
      setFetchedEventsData({
        event1: data.event1,
        event2: data.event2,
        event3: data.event3,
      });
    } catch (error) {
      console.error('Error fetching events data:', error);
    }
  };

  // Function to fetch Donations Data
  const fetchDonationsData = async () => {
    try {
      const response = await axios.get('/api/v1/getDonationsMetrics');
      // const response = await axios.get(process.env.REACT_APP_localUrl+'/api/v1/getDonationsMetrics');
      const data = response.data;
      setFetchedDonationsData({
        campaign1: data.campaign1,
        campaign2: data.campaign2,
        campaign3: data.campaign3,
      });
    } catch (error) {
      console.error('Error fetching donations data:', error);
    }
  };

  // Call API functions
  fetchUsersData();
  fetchEventsData();
  fetchDonationsData();
}, []);

// Data for Users Doughnut Chart
const usersDoughnutData = {
  labels: ['Inactive', 'Active', 'New'],
  datasets: [
    {
      data: [fetchedUsersData.inactive, fetchedUsersData.active, fetchedUsersData.newUsers],
      backgroundColor: ['#DEEDEF', '#58a4b0', '#5F5F5F'],
    },
  ],
};

// Data for Events Doughnut Chart
const eventsDoughnutData = {
  labels: ['Event 1', 'Event 2', 'Event 3'],
  datasets: [
    {
      data: [fetchedEventsData.event1, fetchedEventsData.event2, fetchedEventsData.event3],
      backgroundColor: ['#DEEDEF', '#58a4b0', '#5F5F5F'],
    },
  ],
};

// Data for Donations Doughnut Chart
const donationsDoughnutData = {
  labels: ['Campaign 1', 'Campaign 2', 'Campaign 3'],
  datasets: [
    {
      data: [fetchedDonationsData.campaign1, fetchedDonationsData.campaign2, fetchedDonationsData.campaign3],
      backgroundColor: ['#DEEDEF', '#58a4b0', '#5F5F5F'],
    },
  ],
};
  
  return (
    <>
    <ReportDashboard/>
    <Row className="mt-1 " style={{marginLeft:'280px'}}>
      {/* Total Users */}
      <Col md={4} sm={12}>
      <Card className="shadow-sm" style={{ width: '270px', height: '160px' }}>
        <Card.Body>
          <h6 className="mb-3">Total Users</h6>
          <div className="d-flex justify-content-between align-items-center">
            <div style={{ width: '130px', height: '100px' }}>
              <Doughnut data={usersData} options={chartOptions} />
            </div>
            <div>
              <p className="mb-1" style={{ fontSize: '15px' }}>
                <span style={{ color: '#58A4B033' }}>■</span> Students: {students}
              </p>
              <p className="mb-1" style={{ fontSize: '15px' }}>
                <span style={{ color: '#58a4b0' }}>■</span> Mentors: {mentors}
              </p>
              <p className="mb-1" style={{ fontSize: '15px' }}>
                <span style={{ color: '#E9E9E9' }}>■</span> Total: {totalUsers}
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>

      {/* Total Jobs Posted */}
      <Col md={4} sm={12}>
      <Card className="shadow-sm" style={{ width: '350px', height: '160px' }}>
        <Card.Body>
          <h6 className="mb-3">Total Jobs Posted</h6>
          <div className="d-flex justify-content-between align-items-center">
            <div style={{ width: '130px', height: '100px' }}>
              <Doughnut data={jobsData} options={chartOptions} />
            </div>
            <div>
              <p className="mb-1" style={{ fontSize: '15px' }}>
                <span style={{ color: '#58A4B033' }}>■</span> Previous: {previousJobs}
              </p>
              <p className="mb-1" style={{ fontSize: '15px' }}>
                <span style={{ color: '#58a4b0' }}>■</span> This Month: {thisMonthJobs}
              </p>
              <p className="mb-1" style={{ fontSize: '15px' }}>
                <span style={{ color: '#E9E9E9' }}>■</span> Total: {totalJobs}
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
      {/* Event Participation */}
      <Col md={3} sm={12}>
        <Card className="shadow-sm" style={{width:'350px',height:'160px'}}>
          <Card.Body>
            <h6 className="mb-3">Event Participation</h6>
            <div className="d-flex justify-content-between align-items-center">
              <div style={{ width: "130px", height: "100px" }}>
                <Doughnut data={eventsData} options={chartOptions} />
              </div>
              <div>
                <p className="mb-1" style={{fontSize:'15px'}}>
                  <span style={{ color: "#58A4B033" }}>■</span> Previous: 350
                </p>
                <p className="mb-1" style={{fontSize:'15px'}}>
                  <span style={{ color: "#58a4b0" }}>■</span> This Month: 150
                </p>
                <p className="mb-1" style={{fontSize:'15px'}}>
                    <span style={{ color: "#E9E9E9" }}>■</span> Total: 500</p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    {/* ================================================ */}
    <Row className="g-3 " style={{marginLeft:'300px',marginTop:'-10px'}}>
      {/* Mentorship Program Engagement */}
      <Col md={5}>
      <Card className="p-3 shadow-sm" style={{ height: '190px' }}>
        <Card.Title className="mb-3">Mentorship Program Engagement</Card.Title>
        <Row>
          <Col md={8}>
            <div style={{ height: "180px" }}>
              {mentorshipData && mentorshipOptions ? (
                <Bar data={mentorshipData} options={mentorshipOptions} />
              ) : (
                <div>Loading chart data...</div>
              )}
            </div>
          </Col>
          <Col md={4} className="d-flex flex-column justify-content-center align-items-center" style={{ marginTop: '-90px' }}>
            <Image
              src={mentor.image || "https://via.placeholder.com/80"}
              roundedCircle
              className="mb-1"
            />
            <h6 className="mb-1" style={{ fontSize: '10px' }}>{mentor.name}</h6>
            <p className="text-muted small" style={{ fontSize: '10px' }}>{mentor.studentsEngaged} students engaged</p>
          </Col>
        </Row>
      </Card>
    </Col>

      {/* Total Donations */}
      <Col md={6}>
      <Card className="p-3 shadow-sm">
        <Card.Title className="mb-3">Total Donations</Card.Title>
        <Row>
          <Col md={8}>
            <div style={{ height: "200px" }}>
              <Bar data={donationsData} options={donationsOptions} />
            </div>
          </Col>
          <Col md={4}>
            <h6 className="mb-2">Top Donators (all time)</h6>
            {topDonators.map((donator, index) => (
              <div className="d-flex align-items-center mb-2" key={index}>
                <Image
                  src={donator.imageUrl || "https://via.placeholder.com/40"}
                  roundedCircle
                  className="me-2"
                />
                <div>
                  <strong>{donator.name}</strong>
                  <p className="text-muted small">{donator.amount} INR</p>
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </Card>
    </Col>
    </Row>
    {/* ====================================== */}
      <Container fluid className="p-4" style={{marginLeft:'300px'}}>
      <h3 className="keymetrics_section-title mb-4">Key Metrics Section</h3>
      <Row className="g-4">
        {/* Users Statistics Card with Chart and Legend Side by Side */}
        <div className="row">
    {/* Users Card */}
    <Col md={4} sm={12}>
      <Card className="keymetrics_card shadow-sm">
        <Card.Body className="d-flex">
          <div className="keymetrics_chart-container" style={{ flex: 1, height: '200px', width: '200px', margin: 'auto' }}>
            <Doughnut data={usersDoughnutData} options={doughnutChartOptions} />
          </div>
          <div className="keymetrics_legend" style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ color: 'black' }}><span style={{ color: '#DEEDEF' }}>■</span> Inactive Users: {fetchedUsersData.inactive}</div>
            <div style={{ color: 'black' }}><span style={{ color: '#58a4b0' }}>■</span> Active Users: {fetchedUsersData.active}</div>
            <div style={{ color: 'black' }}><span style={{ color: '#5F5F5F' }}>■</span> New Users: {fetchedUsersData.newUsers} (This Month)</div>
          </div>
        </Card.Body>
      </Card>
    </Col>

    {/* Events Card */}
    <Col md={4} sm={12}>
      <Card className="keymetrics_card shadow-sm">
        <Card.Body className="d-flex">
          <div className="keymetrics_chart-container" style={{ flex: 1, height: '200px', width: '200px', margin: 'auto' }}>
            <Doughnut data={eventsDoughnutData} options={doughnutChartOptions} />
          </div>
          <div className="keymetrics_legend" style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ color: 'black' }}><span style={{ color: '#DEEDEF' }}>■</span> Event 1: {fetchedEventsData.event1}</div>
            <div style={{ color: 'black' }}><span style={{ color: '#58a4b0' }}>■</span> Event 2: {fetchedEventsData.event2}</div>
            <div style={{ color: 'black' }}><span style={{ color: '#5F5F5F' }}>■</span> Event 3: {fetchedEventsData.event3}</div>
          </div>
        </Card.Body>
      </Card>
    </Col>

    {/* Donations Card */}
    <Col md={4} sm={12}>
      <Card className="keymetrics_card shadow-sm">
        <Card.Body className="d-flex">
          <div className="keymetrics_chart-container" style={{ flex: 1, height: '200px', width: '200px', margin: 'auto' }}>
            <Doughnut data={donationsDoughnutData} options={doughnutChartOptions} />
          </div>
          <div className="keymetrics_legend" style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ color: 'black' }}><span style={{ color: '#DEEDEF' }}>■</span> Campaign 1: {fetchedDonationsData.campaign1}L</div>
            <div style={{ color: 'black' }}><span style={{ color: '#58a4b0' }}>■</span> Campaign 2: {fetchedDonationsData.campaign2}L</div>
            <div style={{ color: 'black' }}><span style={{ color: '#5F5F5F' }}>■</span> Campaign 3: {fetchedDonationsData.campaign3}L</div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  </div>
      </Row>
    </Container>
    </>
  );
};

export default ReportandAnalyticHome;







// import React, { useState, useEffect } from "react";
// import { Doughnut } from "react-chartjs-2";
// import { Row, Col, Card } from "react-bootstrap";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend);

// const DashboardCharts = () => {
//   // States for storing API data
//   const [userData, setUserData] = useState({ students: 0, mentors: 0, total: 0 });
//   const [jobData, setJobData] = useState({ previous: 0, thisMonth: 0, total: 0 });
//   const [eventData, setEventData] = useState({ previous: 0, thisMonth: 0, total: 0 });

//   // Fetch data from APIs
//   useEffect(() => {
//     const fetchUsersData = async () => {
//       try {
//         const response = await fetch("https://api.example.com/users-data");
//         const data = await response.json();
//         setUserData({
//           students: data.students,
//           mentors: data.mentors,
//           total: data.total,
//         });
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     const fetchJobsData = async () => {
//       try {
//         const response = await fetch("https://api.example.com/jobs-data");
//         const data = await response.json();
//         setJobData({
//           previous: data.previous,
//           thisMonth: data.thisMonth,
//           total: data.total,
//         });
//       } catch (error) {
//         console.error("Error fetching job data:", error);
//       }
//     };

//     const fetchEventsData = async () => {
//       try {
//         const response = await fetch("https://api.example.com/events-data");
//         const data = await response.json();
//         setEventData({
//           previous: data.previous,
//           thisMonth: data.thisMonth,
//           total: data.total,
//         });
//       } catch (error) {
//         console.error("Error fetching event data:", error);
//       }
//     };

//     // Call all APIs
//     fetchUsersData();
//     fetchJobsData();
//     fetchEventsData();
//   }, []);

//   // Chart data
//   const usersChartData = {
//     labels: ["Students", "Mentors"],
//     datasets: [
//       {
//         data: [userData.students, userData.mentors],
//         backgroundColor: ["#d3eef9", "#60a3d9"],
//         hoverBackgroundColor: ["#bce1f4", "#5094c5"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const jobsChartData = {
//     labels: ["Previous", "This Month"],
//     datasets: [
//       {
//         data: [jobData.previous, jobData.thisMonth],
//         backgroundColor: ["#d3eef9", "#60a3d9"],
//         hoverBackgroundColor: ["#bce1f4", "#5094c5"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const eventsChartData = {
//     labels: ["Previous", "This Month"],
//     datasets: [
//       {
//         data: [eventData.previous, eventData.thisMonth],
//         backgroundColor: ["#d3eef9", "#60a3d9"],
//         hoverBackgroundColor: ["#bce1f4", "#5094c5"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//   };

//   return (
//     <Row className="mt-4">
//       {/* Total Users */}
//       <Col md={4} sm={12}>
//         <Card className="shadow-sm">
//           <Card.Body>
//             <h6 className="mb-3">Total Users</h6>
//             <div className="d-flex justify-content-between align-items-center">
//               <div style={{ width: "150px", height: "150px" }}>
//                 <Doughnut data={usersChartData} options={chartOptions} />
//               </div>
//               <div>
//                 <p className="mb-1">
//                   <span style={{ color: "#d3eef9" }}>■</span> Students: {userData.students}
//                 </p>
//                 <p className="mb-1">
//                   <span style={{ color: "#60a3d9" }}>■</span> Mentors: {userData.mentors}
//                 </p>
//                 <p>Total: {userData.total}</p>
//               </div>
//             </div>
//           </Card.Body>
//         </Card>
//       </Col>

//       {/* Total Jobs Posted */}
//       <Col md={4} sm={12}>
//         <Card className="shadow-sm">
//           <Card.Body>
//             <h6 className="mb-3">Total Jobs Posted</h6>
//             <div className="d-flex justify-content-between align-items-center">
//               <div style={{ width: "150px", height: "150px" }}>
//                 <Doughnut data={jobsChartData} options={chartOptions} />
//               </div>
//               <div>
//                 <p className="mb-1">
//                   <span style={{ color: "#d3eef9" }}>■</span> Previous: {jobData.previous}
//                 </p>
//                 <p className="mb-1">
//                   <span style={{ color: "#60a3d9" }}>■</span> This Month: {jobData.thisMonth}
//                 </p>
//                 <p>Total: {jobData.total}</p>
//               </div>
//             </div>
//           </Card.Body>
//         </Card>
//       </Col>

//       {/* Event Participation */}
//       <Col md={4} sm={12}>
//         <Card className="shadow-sm">
//           <Card.Body>
//             <h6 className="mb-3">Event Participation</h6>
//             <div className="d-flex justify-content-between align-items-center">
//               <div style={{ width: "150px", height: "150px" }}>
//                 <Doughnut data={eventsChartData} options={chartOptions} />
//               </div>
//               <div>
//                 <p className="mb-1">
//                   <span style={{ color: "#d3eef9" }}>■</span> Previous: {eventData.previous}
//                 </p>
//                 <p className="mb-1">
//                   <span style={{ color: "#60a3d9" }}>■</span> This Month: {eventData.thisMonth}
//                 </p>
//                 <p>Total: {eventData.total}</p>
//               </div>
//             </div>
//           </Card.Body>
//         </Card>
//       </Col>
//     </Row>
//   );
// };

// export default DashboardCharts;
