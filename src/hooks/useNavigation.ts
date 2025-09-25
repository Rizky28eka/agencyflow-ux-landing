import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const goToUserDashboard = () => {
    if (!user) return;
    
    const roleRoutes = {
      OWNER: '/dashboard/owner',
      ADMIN: '/dashboard/admin',
      PROJECT_MANAGER: '/dashboard/project-manager',
      TEAM_LEAD: '/dashboard/team-lead',
      MEMBER: '/dashboard/member',
      FINANCE: '/dashboard/finance',
      CLIENT: '/dashboard/client',
    };

    navigate(roleRoutes[user.role]);
  };

  const goBack = () => {
    navigate(-1);
  };

  const goToHome = () => {
    navigate('/');
  };

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  const isParentPath = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return {
    navigate,
    location,
    goToUserDashboard,
    goBack,
    goToHome,
    isCurrentPath,
    isParentPath,
  };
};