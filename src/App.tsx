
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Themes from './pages/Themes';
import Prizes from './pages/Prizes';
import Register from './pages/Register';
import Schedule from './pages/Schedule';
import FAQ from './pages/FAQ';
import Rules from './pages/Rules';
import Sponsors from './pages/Sponsors';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRegistrations from './pages/admin/AdminRegistrations';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminAnnouncements from './pages/admin/AdminAnnouncements';
import AdminPages from './pages/admin/AdminPages';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/layout/AdminLayout';

function App() {
  return (
    <>
      <Router>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="themes" element={<Themes />} />
          <Route path="prizes" element={<Prizes />} />
          <Route path="register" element={<Register />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="rules" element={<Rules />} />
          <Route path="sponsors" element={<Sponsors />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="registrations" element={<AdminRegistrations />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
            <Route path="pages" element={<AdminPages />} />
          </Route>
        </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
