/**
 * Admin route tree — login + protected panel pages.
 */
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from '../components/Loader';
import { AdminAuthProvider } from './context/AdminAuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';

const Login = lazy(() => import('./pages/Login.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const Appointments = lazy(() => import('./pages/Appointments.jsx'));
const Messages = lazy(() => import('./pages/Messages.jsx'));
const Gallery = lazy(() => import('./pages/Gallery.jsx'));
const Treatments = lazy(() => import('./pages/Treatments.jsx'));
const Testimonials = lazy(() => import('./pages/Testimonials.jsx'));
const DoctorProfile = lazy(() => import('./pages/DoctorProfile.jsx'));
const ClinicSettings = lazy(() => import('./pages/ClinicSettings.jsx'));

function AdminRoutes() {
  return (
    <AdminAuthProvider>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="messages" element={<Messages />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="treatments" element={<Treatments />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="doctor" element={<DoctorProfile />} />
            <Route path="settings" element={<ClinicSettings />} />
          </Route>
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </Suspense>
    </AdminAuthProvider>
  );
}

export default AdminRoutes;
