import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/login");
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) return null;

  return <>{children}</>;
}

export default ProtectedRoute