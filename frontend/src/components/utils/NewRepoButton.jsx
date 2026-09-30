import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export default function NewRepoButton() {
  return (
    <Link to="/new" state={{ from: location.pathname }}>
      <button
        className="
              flex
              items-center
              justify-center
              gap-2
              px-4
              py-2.5
              bg-pink-500
              hover:bg-pink-600
              rounded-lg
              font-semibold
              text-sm
              transition
              cursor-pointer
            "
      >
        <Plus size={18} />
        New repository
      </button>
    </Link>
  );
}
