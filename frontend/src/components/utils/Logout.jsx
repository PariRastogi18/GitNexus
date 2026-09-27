import React from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleLogout = async () => {
    try {
      await fetch(`${BACKEND_URL}/logout`, {
        method: "GET",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error: ", error.message);
    } finally {
      logout();
      navigate("/signin");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="
        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-zinc-900 cursor-pointer
      "
    >
      <LogOut size={17} />

      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;
