import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { isAuthenticate } = useAuth();
  if (!isAuthenticate) {
    return <Navigate to={"/signin"} />;
  }
  return children;
}
