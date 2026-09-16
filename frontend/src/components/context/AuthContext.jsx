import React from "react";
import {
  useContext,
  createContext,
  useEffect,
  useCallback,
  useState,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
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

      const { accessToken } = await refreshRespond.json();
      setAccessToken(accessToken);
      const response = await fetch(`${BACKEND_URL}/getMe`, {
        method: "GET",
        headers: {
          Application: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Verified user: ", data);
        setUser(data.user || data);
        isAuthenticate(true);
      } else {
        setAccessToken(null);
        isAuthenticate(false);
        setUser(null);
      }
    } catch (error) {
      setAccessToken(null);
      setIsAuthenticate(false);
      setUser(null);
      throw new Error("Error: ", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (accessToken, user) => {
    setAccessToken(accessToken);
    setUser(user);
    setIsAuthenticate(true);
  }, []);

  const logout = useCallback(async () => {
    setAccessToken(null);
    setIsAuthenticate(false);
    setUser(null);
  }, []);
  return (
    <AuthContext.Provider
      value={{ isAuthenticate, user, accessToken, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be use within AuthProvider!");
  }
  return context;
}
