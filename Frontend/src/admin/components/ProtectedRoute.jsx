/**
 * Protects admin routes — redirects to login when unauthenticated.
 */
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../../components/Loader';
import { useAdminAuth } from '../context/AdminAuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated, booting } = useAdminAuth();
  const location = useLocation();

  if (booting) return <Loader />;

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
