/**
 * Root App — providers, router, toast notifications, error boundary, analytics.
 */
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import { ClinicProvider } from './context/ClinicContext';
import { LanguageProvider } from './context/LanguageContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { OfflineBanner } from './components/Offline/OfflineBanner';
import GoogleAnalytics from './components/GoogleAnalytics/GoogleAnalytics';
import AppRoutes from './routes/AppRoutes';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <LanguageProvider>
          <ClinicProvider>
            <BrowserRouter>
              <OfflineBanner />
              <GoogleAnalytics />
              <AppRoutes />
              <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
              />
            </BrowserRouter>
          </ClinicProvider>
        </LanguageProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
