import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth.store';
import { UserRoleEnum } from '../../../api/auth/auth.type';

export default function PublicRoute() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const role = useAuthStore((state) => state.user?.role);

  if (accessToken) {
    return <Navigate to={role === UserRoleEnum.TEACHER ? '/teacher' : '/student'} replace />;
  }

  return <Outlet />;
}
