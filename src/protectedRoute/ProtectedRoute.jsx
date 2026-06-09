import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const { token } = useSelector((state) => state.logInUser);
    const { pathname } = useLocation();

    // Function to check if token is expired
    const isTokenExpired = (token) => {
        if (!token) return true;

        try {
            // Decode JWT payload (Base64)
            const payload = JSON.parse(atob(token.split('.')[1]));
            
            // Check expiration (exp is in seconds)
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            return payload.exp < currentTime;
        } catch (error) {
            console.error("Invalid token format:", error);
            return true; // Treat invalid token as expired
        }
    };

    // If no token or token is expired → redirect to login
    if (!token || isTokenExpired(token)) {
        return <Navigate 
            to="/login" 
            state={{ 
                path: pathname,
                message: "Session expired. Please login again." 
            }} 
            replace 
        />;
    }

    return children;
};

export default ProtectedRoute;