import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth.store';

export default function ProtectedRoute() {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}
