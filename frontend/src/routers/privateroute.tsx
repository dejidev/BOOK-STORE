import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ReactNode } from 'react';
import LoadingSpinner from '../components/Loading';


interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  // const { currentUser, loading } = useAuth();
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner/>
  }

  return currentUser ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;