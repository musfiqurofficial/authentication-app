/* eslint-disable react/prop-types */
import { createContext, useContext } from 'react';

const GoogleAuthContext = createContext();

export const useGoogleAuth = () => {
  const context = useContext(GoogleAuthContext);
  if (!context) {
    throw new Error('useGoogleAuth must be used within a GoogleAuthProvider');
  }
  return context;
};

export const GoogleAuthProvider = ({ children }) => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8000/auth/google'; // Update with your server URL
  };

  const value = {
    handleGoogleLogin,
  };

  return (
    <GoogleAuthContext.Provider value={value}>
      {children}
    </GoogleAuthContext.Provider>
  );
};
