import { MoreHorizontal, Trash, SquarePen, ToggleLeft, X } from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function FunctionButton({ repoId }) {
  const id = repoId;
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleEditButton = () => {
    setMenuOpen(false);
    navigate(`/editRepo/${repoId}`, {
      state: { from: location.pathname },
    });
  };

  const handleToggleButton = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/repo/toggle/${id}`, {
        method: "PATCH",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        window.location.reload();
        console.log(data.message);
      } else {
        console.error("Not toggle successfully!");
      }
    } catch (error) {
      console.error("Toggle error: ", error.message);
    }
  };

  const handleDeleteButton = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/repo/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        window.location.reload();
        console.log(data.message);
      } else {
        console.error("Not delete successfully!");
      }
    } catch (error) {
      console.error("Delete error: ", error.message);
    }
  };

  return (
    <div className="relative">
      <button
        className="hidden sm:block p-2 text-zinc-600 hover:text-white cursor-pointer"
        onClick={() => setMenuOpen(true)}
      >
        <MoreHorizontal size={18} />
      </button>

      {menuOpen && (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="w-80 rounded-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-white">
                Repository Options
              </h2>

              <button
                onClick={() => setMenuOpen(false)}
                className="text-zinc-500 hover:text-white cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-2">
              <button
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-zinc-300 hover:bg-zinc-900 cursor-pointer"
                onClick={handleEditButton}
              >
                <SquarePen size={18} />
                Edit Repository
              </button>

              <button
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-zinc-300 hover:bg-zinc-900 cursor-pointer"
                onClick={handleToggleButton}
              >
                <ToggleLeft size={18} />
                Toggle Visibility
              </button>

              <button
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-400 hover:bg-zinc-900 cursor-pointer"
                onClick={handleDeleteButton}
              >
                <Trash size={18} />
                Delete Repository
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
