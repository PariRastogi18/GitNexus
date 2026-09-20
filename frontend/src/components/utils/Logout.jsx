import React from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITA_BACKEND_URL;

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
        w-full
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        text-sm
        font-medium
        text-red-500
        bg-white
        hover:bg-red-50
        hover:text-red-600
        border
        border-transparent
        hover:border-red-100
        transition-all
        duration-200
      "
    >
      <LogOut size={19} />

      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;
