import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children?: ReactNode;
}

/**
 * A component that protects routes from unauthenticated access.
 * - If children are provided, they are rendered instead of Outlet
 * - If no children, renders Outlet for nested routes
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    // Redirect to login, saving the current location in state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If children are provided, render them; otherwise render Outlet for nested routes
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;