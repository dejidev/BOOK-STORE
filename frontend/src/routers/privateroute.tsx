import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ReactNode } from 'react';


interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { currentUser, loading } = useAuth();

if(loading) {
  return <div>Loading</div>
}

  return currentUser ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;