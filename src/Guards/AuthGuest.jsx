import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AuthGuest = ({ children }) => {
  const { isAuthenticated } = useAuth();

  console.log("isAuthenticated: ", isAuthenticated);

  if (isAuthenticated) return <Navigate to="/billing" />;

  return <>{children}</>;
};

export default AuthGuest;
