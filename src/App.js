import { Routes, Route } from 'react-router-dom';
import './App.css';
import Sigin from './Sigin/Sigin';
import ContentMangeDashboard from "./ContentManagement/ContentManageDashboard";
import DonationTrackingHome from './DonationTracking/DonationTrackingHome';
import SettingHome from './Settings/SettingHome';
import ReportDashboard from './ReportandAnalytic/ReportDashboard';
import JobListing from './JobListing/JobListing';
import EventDashboard from './EventManagement/EventDashboard';
import EventManage from './EventManagement/EventManage';
import ViewAllEvents from './EventManagement/ViewAllEvents/ViewAllEvents';
import ViewAllAnnouncements from './EventManagement/ViewAllAnnouncements/ViewAllAnnouncements';
import USerDashboard from './UserManagement/USerDashboard';
import Admin from './AdminDashboard/Admin';
import CreateDonation from './DonationTracking/CreateDonation/CreateDonation';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Sigin />} />
        <Route path="/dashboard" element={<Admin />} />
        <Route path="/dashboard/content-management" element={<ContentMangeDashboard />} />
        <Route path="/dashboard/donation-tracking" element={<DonationTrackingHome />} />
        <Route path="/dashboard/create-donation" element={<CreateDonation />} />
        <Route path="/dashboard/settings" element={<SettingHome />} />
        <Route path="/dashboard/report-analytic" element={<ReportDashboard />} />
        <Route path="/dashboard/job-listing" element={<JobListing />} />
        <Route path="/dashboard/event-management" element={<EventDashboard />} />
        <Route path="/events/manage" element={<EventManage />} />
        <Route path="/events/view-all" element={<ViewAllEvents />} />
        <Route path="/announcements/view-all" element={<ViewAllAnnouncements />} />
        <Route path="/dashboard/users-management" element={<USerDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
