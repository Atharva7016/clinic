/**
 * Application routes with lazy-loaded public pages + admin panel.
 */
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Loader from '../components/Loader';

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Treatments = lazy(() => import('../pages/Treatments'));
const Panchakarma = lazy(() => import('../pages/Panchakarma'));
const Gallery = lazy(() => import('../pages/Gallery'));
const Testimonials = lazy(() => import('../pages/Testimonials'));
const Appointment = lazy(() => import('../pages/Appointment'));
const AppointmentMr = lazy(() => import('../pages/AppointmentMr'));
const Contact = lazy(() => import('../pages/Contact'));
const NotFound = lazy(() => import('../pages/NotFound'));
const ServerError = lazy(() => import('../pages/ServerError'));
const OfflinePage = lazy(() => import('../components/Offline/Offline'));
const AdminRoutes = lazy(() => import('../admin/AdminRoutes'));

function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />

        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="treatments" element={<Treatments />} />
          <Route path="panchakarma" element={<Panchakarma />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="appointment/mr" element={<AppointmentMr />} />
          <Route path="contact" element={<Contact />} />
          <Route path="offline" element={<OfflinePage />} />
          <Route path="500" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
