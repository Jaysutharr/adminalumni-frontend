


import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHome from './AdminHome'
import iconuser from '../assets/user.png'
import iconactive from '../assets/active.png'
import iconmentor from '../assets/mentor.png'
import iconstudent from '../assets/student.png'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Table } from "react-bootstrap";
import { FaUsers, FaSearch, FaBriefcase } from "react-icons/fa";



  const data = [
    { monthName: 'May', totalDonations: 8000 },
    { monthName: 'June', totalDonations: 7000 },
    { monthName: 'July', totalDonations: 16000 },
    { monthName: 'August', totalDonations: 9000 },
    { monthName: 'September', totalDonations: 12000 },
    { monthName: 'October', totalDonations: 10000 },
  ];

  // Map and rename fields to match the required format
  const formattedData = data.map(item => ({
    monthLabel: item.monthName,         // Renaming 'monthName' to 'monthLabel'
    donationAmount: item.totalDonations // Renaming 'totalDonations' to 'donationAmount'
  }));




const Admin = () => {
  const [data, setData] = useState({
    totalUsers: 0,
    activeUsers: 0,
    mentors: 0,
    students: 0,
  });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [totalUsersRes, activeUsersRes, mentorsRes, studentsRes] = await Promise.all([
          // axios.get("http://localhost:5000/api/total-users"),
          // axios.get("http://localhost:5000/api/active-users"),
          // axios.get("http://localhost:5000/api/mentors"),
          // axios.get("http://localhost:5000/api/students"),
          axios.get(process.env.REACT_APP_localUrl +"/api/total-users"),
          axios.get(process.env.REACT_APP_localUrl +"/api/active-users"),
          axios.get(process.env.REACT_APP_localUrl +"/api/mentors"),
          axios.get(process.env.REACT_APP_localUrl +"/api/students"),
        ]);

        setData({
          totalUsers: totalUsersRes.data.count,
          activeUsers: activeUsersRes.data.count,
          mentors: mentorsRes.data.count,
          students: studentsRes.data.count,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
// ========

// // Fetch the events from an API using fetch
// useEffect(() => {
//   const fetchEvents = async () => {
//     try {
//       // Replace with your actual API endpoint
//       const response = await fetch("https://api.example.com/events", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           // You can add other custom headers here if needed
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch events.");
//       }

//       const data = await response.json(); // Assuming the API returns JSON data
//       setEvents(data); // Set the fetched events to state
//       setLoading(false); // Data fetched successfully
//     } catch (error) {
//       setError("Failed to fetch events. Please try again later.");
//       setLoading(false); // Stop loading on error
//     }
//   };

//   fetchEvents(); // Call the function to fetch events
// }, []);
// ==========================================
const [jobsData, setJobsData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      // const response = await axios.get('https://api.example.com/jobs'); // Replace with your API endpoint
      const response = await axios.get(process.env.REACT_APP_localUrl +'/api/jobs'); // Replace with your API endpoint
      setJobsData(response.data);
    } catch (error) {
      console.error('Error fetching jobs data:', error);
    }
  };

  fetchData();
}, []);







return (
    <>
    
  <AdminHome/>
    {/* USER OVERVIEW + CALENDAR */}
<div className="ml-0 md:ml-[280px] mt-6 flex flex-col md:flex-row gap-6">

  {/* User Overview */}
  <div className="flex-1 bg-white rounded-xl shadow p-6">
  <h3 className="text-center text-teal-500 font-semibold mb-6">
    User Overview
  </h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {[
      { icon: iconuser, label: "Total Users", value: 5340 },
      { icon: iconactive, label: "Active Users", value: 1245 },
      { icon: iconmentor, label: "Mentors", value: 210 },
      { icon: iconstudent, label: "Students", value: 3780 },
    ].map((item, i) => (
      <div
        key={i}
        className="border rounded-xl p-4 flex flex-col items-center hover:shadow-md transition"
      >
        <img src={item.icon} className="w-10 mb-3 opacity-80" alt="" />
        <h2 className="text-2xl font-bold text-gray-700">
          {item.value}
        </h2>
        <p className="text-sm text-gray-500">{item.label}</p>
      </div>
    ))}
  </div>
</div>


  {/* Calendar */}
  <div className="w-full md:w-[320px] bg-white rounded-xl shadow p-5 mt-6 md:mt-0">
    <h3 className="text-center text-teal-500 font-semibold mb-3">
      Calendar
    </h3>

    <p className="text-center text-sm font-medium mb-3">Feb 2024</p>

    <div className="grid grid-cols-7 text-xs text-center gap-y-2">
      {"SMTWTFS".split("").map((d) => (
        <span key={d} className="font-semibold text-gray-400">{d}</span>
      ))}

      {[...Array(31)].map((_, i) => (
        <span
          key={i}
          className={`w-7 h-7 mx-auto flex items-center justify-center rounded-full
            ${[14,16].includes(i+1) ? "bg-teal-400 text-white" : "text-gray-600"}`}
        >
          {i + 1}
        </span>
      ))}
    </div>

    <div className="mt-4 text-sm text-gray-600">
      <p><span className="text-teal-500 font-medium">14</span> Vasant Panchami</p>
      <p><span className="text-teal-500 font-medium">16</span> Ratha Saptami</p>
    </div>
  </div>
</div>





{/* -===================================================== */}
<div className="ml-0 md:ml-[280px] mt-6 flex flex-col lg:flex-row gap-6">

  {/* Donations */}
  <div className="w-full lg:w-[55%] bg-white rounded-xl shadow p-6 mb-6 lg:mb-0">
    <h3 className="text-teal-500 text-xl font-semibold mb-3">
      Donations Analytics
    </h3>

    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="monthLabel" />
        <YAxis tickFormatter={(v) => `₹${v}`} />
        <Tooltip formatter={(v) => `₹${v}`} />
        <Line
          type="monotone"
          dataKey="donationAmount"
          stroke="#4aa3b5"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>

  {/* Total Jobs */}
  <div className="flex-1 bg-white rounded-xl shadow p-6 mt-6 lg:mt-0">
  <h3 className="text-center text-teal-500 font-semibold mb-4">
    Total Jobs
  </h3>

  {/* ICON STATS */}
  <div className="flex justify-around text-center mb-6">
    <div className="flex flex-col items-center">
      <FaUsers className="text-teal-500 text-2xl mb-1" />
      <h2 className="text-xl font-bold text-gray-700">50</h2>
      <p className="text-sm text-gray-500">Jobs Count</p>
    </div>

    <div className="flex flex-col items-center">
      <FaSearch className="text-teal-500 text-2xl mb-1" />
      <h2 className="text-xl font-bold text-gray-700">12</h2>
      <p className="text-sm text-gray-500">Available</p>
    </div>

    <div className="flex flex-col items-center">
      <FaBriefcase className="text-teal-500 text-2xl mb-1" />
      <h2 className="text-xl font-bold text-gray-700">33</h2>
      <p className="text-sm text-gray-500">Job Options</p>
    </div>
  </div>

  {/* TABLE */}
  <div className="border rounded-lg overflow-x-auto">
    <table className="w-full min-w-[700px] text-sm">
      <thead className="bg-teal-50 text-teal-600">
        <tr>
          <th className="p-3 text-left">Job titles</th>
          <th className="p-3">Posted on</th>
          <th className="p-3">Employees Needed</th>
          <th className="p-3">Applicants Count</th>
          <th className="p-3">Action</th>
        </tr>
      </thead>

      <tbody className="divide-y">
        {[
          ["Software Engineer", "October 4, 2024", "3 employees", "12"],
          ["Marketing Specialist", "October 3, 2024", "5 employees", "24"],
          ["Data Analyst", "October 2, 2024", "10 employees", "14"],
          ["Project Manager", "October 1, 2024", "25 employees", "40"],
        ].map((job, i) => (
          <tr key={i} className="hover:bg-gray-50">
            <td className="p-3">{job[0]}</td>
            <td className="p-3 text-center">{job[1]}</td>
            <td className="p-3 text-center">{job[2]}</td>
            <td className="p-3 text-center">
              Total Users applied - {job[3]}
            </td>
            <td className="p-3 text-center">
              <button className="w-8 h-8 rounded-full border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition">
                →
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

</div>





    {/* ==================================== */}
<div className="bg-white rounded-xl shadow p-6 mt-6 overflow-x-auto">
  <h3 className="text-center text-teal-500 text-xl font-semibold mb-4">
    Upcoming Events
  </h3>

  <table className="w-full text-sm">
    <thead className="border-b text-teal-500">
      <tr>
        <th className="text-left">Event Countdown</th>
        <th>Event Name</th>
        <th>Date & Time</th>
        <th>Registrations</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {[
        {
          countdown: "12 days, 3 hours left",
          name: "Annual Alumni Meet",
          date: "October 15, 2024, at 6:00 PM",
          reg: "150 people registered",
        },
        {
          countdown: "12 days, 3 hours left",
          name: "Annual Alumni Meet",
          date: "October 15, 2024, at 6:00 PM",
          reg: "150 people registered",
        },
      ].map((e,i)=>(
        <tr key={i} className="border-b text-gray-600">
          <td className="py-2">{e.countdown}</td>
          <td>{e.name}</td>
          <td>{e.date}</td>
          <td>{e.reg}</td>
          <td>
            <button className="border border-teal-400 text-teal-400 rounded-full px-3">
              →
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>





    </>
  );
};

export default Admin;













// DonationsAnalyticsChart.js
// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// const data = [
//   { month: 'May', amount: 8000 },
//   { month: 'June', amount: 7000 },
//   { month: 'July', amount: 16000 },
//   { month: 'August', amount: 9000 },
//   { month: 'September', amount: 12000 },
//   { month: 'October', amount: 10000 },
// ];

// const Admin = () => {
//   return (
//     <div className="flex justify-center items-center p-4">
//       <div className="w-full lg:w-3/4">
//         <h2 className="text-2xl font-semibold text-center mb-4">Donations Analytics</h2>
//         <div className="border p-4 rounded-lg shadow-lg bg-white">
//           <ResponsiveContainer width="100%" height={400}>
//             <LineChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis 
//                 domain={[0, 16000]} 
//                 tickFormatter={(value) => `₹${value}`} 
//                 ticks={[0, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000]} 
//               />
//               <Tooltip formatter={(value) => `₹${value}`} />
//               <Line 
//                 type="monotone" 
//                 dataKey="amount" 
//                 stroke="#0ea5e9" 
//                 strokeWidth={2} 
//                 dot={false} 
//                 activeDot={{ r: 8 }} 
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admin;














