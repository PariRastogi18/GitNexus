import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Loading() {
  const navigate = useNavigate();
  const { isAuthenticate } = useAuth();

  useEffect(() => {
    if (!isAuthenticate) {
      navigate("/signin");
    } else {
      navigate("/");
    }
  }, [navigate]);

  return <h1>Loading...</h1>;
}
