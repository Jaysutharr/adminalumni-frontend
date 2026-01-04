import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from './reportWebVitals';
// import { Router } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router, Routes, and Route
import Sigin from './Sigin/Sigin';
import AdminHome from './AdminDashboard/AdminHome';
import UserHome from './UserManagement/UserHome';
import UserDetails from './UserManagement/UserDetailsStudents';
import UserDetailsMentor from './UserManagement/UserDetailsMentor';
import UserDetailsOthers from './UserManagement/UserDetailsOthers';
import EventHome from './EventManagement/EventHome';
import EventManage from './EventManagement/EventManage';
import EventView from './EventManagement/EventView';
import EventAnnouncementsView from './EventManagement/EventAnnounceView';
import JobListing from './JobListing/JobListing';
import JobListingManage from './JobListing/JobListingManage';
import JobListingView from './JobListing/JobListingView';
import ContentManageHome from './ContentManagement/ContentManageHome';
import ReportandAnalyticHome from './ReportandAnalytic/ReportandAnalyticHome';
import SettingHome from './Settings/SettingHome';
import DonationTrackingHome from './DonationTracking/DonationTrackingHome';
import Admin from './AdminDashboard/Admin';
import EventDashboard from "./EventManagement/EventDashboard";
import ManageEvents from "./EventManagement/ManageEvents/ManageEvent";
import ViewAllEvents from "./EventManagement/ViewAllEvents/ViewAllEvents";
import ViewAllAnnouncements from "./EventManagement/ViewAllAnnouncements/ViewAllAnnouncements";
import USerDashboard from "./UserManagement/USerDashboard";
import AllStudents from "./UserManagement/AllStudents";
import ContentManageDashboard from './ContentManagement/ContentManageDashboard';
import ReportDashboard from './ReportandAnalytic/ReportDashboard';
import CreateDonation from './DonationTracking/CreateDonation/CreateDonation';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/" element={<Sigin />} />
        <Route path='/dashboard' element={<Admin />} />
        <Route path='/admin-dashboard' element={<Admin />} />

        {/* USermanagement route */}
        <Route path="/dashboard/users-management" element={<USerDashboard />} />
        <Route path='/users-management/users-details' element={<UserDetails />} />
        <Route path='/users-management/mentor' element={<UserDetailsMentor />} />
        <Route path='/users-management/others' element={<UserDetailsOthers />} />
        <Route path='/users-management/student' element={<UserDetails />} />

        {/* //EventManagement routes */}
        <Route path='/dashboard/event-management' element={<EventDashboard />} />
        <Route path='/event-management/manage' element={<EventManage />} />
        <Route path='/event-management/quick-view' element={<EventView />} />
        <Route path='/event-management/announce-view' element={<EventAnnouncementsView />} />

        {/* Job-listing */}
        <Route path='/dashboard/job-listing' element={<JobListing />} />
        <Route path='/job-listing/manage' element={<JobListingManage />} />
        <Route path='/dashboard/job-listing/view/:id' element={<JobListingView />} />

        {/* Content-management */}
        <Route path='/dashboard/content-management' element={<ContentManageDashboard />} />


        {/* Donation Tracking */}

        <Route path='/dashboard/donation-tracking' element={<DonationTrackingHome />} />

        {/* Report and analytic */}

        <Route path='/dashboard/report-analytic' element={<ReportDashboard />} />


        {/* Setting */}
        <Route path='/dashboard/settings' element={<SettingHome />} />
        <Route path='/dashboard/create-donation' element={<CreateDonation />} />


        <Route path="/events" element={<EventDashboard />} />
        <Route path="/events/manage" element={<ManageEvents />} />
        <Route path="/events/view-all" element={<ViewAllEvents />} />
        <Route path="/announcements/view-all" element={<ViewAllAnnouncements />} />
        <Route path="/users-management" element={<USerDashboard />} />
        <Route path="/users/students" element={<AllStudents />} />

        <Route path="/events" element={<EventDashboard />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
