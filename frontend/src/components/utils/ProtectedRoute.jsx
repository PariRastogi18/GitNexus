import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Loading from "./Loading.jsx";

export default function ProtectedRoute({ children }) {
  const { isAuthenticate, loading } = useAuth();
  if (loading) {
    return <Loading />;
  }
  if (!isAuthenticate) {
    return <Navigate to={"/signin"} replace/>;
  }
  return children;
}
