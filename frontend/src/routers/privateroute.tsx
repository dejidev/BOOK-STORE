import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const privateroute = ({ children }) => {
    const { currentUser } = useAuth();

    if (currentUser) return children
    return (
        <div>
            <Navigate to="/login" replace />
        </div>
    )
}

export default privateroute;
