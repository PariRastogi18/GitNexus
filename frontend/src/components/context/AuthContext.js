import React from "react";
import {
  useContext,
  createContext,
  useEffect,
  useCallback,
  useState,
} from "react";

export default function AuthContext() {
  const BACKEND_URL = import.meta.env.BACKEND_URL;
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = useCallback(async () => {
    setLoading(true);
    try {
      const refreshRespond = await fetch(`${BACKEND_URL}/refreshAccessToken`, {
        credentials: "include",
      });
      if (!refreshRespond.ok) {
        throw new Error("Session expired!");
      }

      const {accessToken} = await refreshRespond.json();
      setAccessToken(accessToken);
      const response = await fetch(`${BACKEND_URL}/getMe`, {
        method:"GET",
        headers:{
            Application:`Bearer ${accessToken}`
        },
        credentials:"include"
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Verified user: ",data);
        setUser(data.user || data);
        isAuthenticate(true);
      }else{
        setAccessToken(null);
        isAuthenticate(false)
        setUser(null);
      }
    } catch (error) {
        setAccessToken(null);
        isAuthenticate(false)
        setUser(null);
        throw new Error("Error: ", error.message);
    }finally{
        setLoading(false);
    }
  }, []);
  return <></>;
}
