import React, {useState}from "react";
import { useAuth } from "../context/AuthContext.jsx";
import LogoutButton from "../utils/Logout.jsx";
import { UserRoundPen } from "lucide-react";
import { Link } from "react-router-dom";


export default function ProfileIcon() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="
                w-9
                h-9
                rounded-full
                bg-pink-500
                flex
                items-center
                justify-center
                font-semibold
                cursor-pointer
              "
      >
        {user.username[0].toUpperCase()}
      </button>

      {menuOpen && (
        <div className="absolute right-0 top-12 w-48 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl p-2">
          <Link to={"/profile"}>

          <div className="px-3 py-2 border-b border-zinc-800 mb-1">
            <p className="text-sm font-semibold">{user.username}</p>

            <p className="text-xs text-zinc-500">@{user.username}</p>
          </div>
          </Link>

          <Link className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:bg-zinc-900 cursor-pointer" to={"/edit"}>
            <UserRoundPen size={17} />
            Edit Profile
          </Link>

          <LogoutButton />
        </div>
      )}
    </div>
  );
}
