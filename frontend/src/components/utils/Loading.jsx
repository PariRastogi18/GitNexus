import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/signup");
  }, [navigate]);

  return <h1>Loading...</h1>;
}
