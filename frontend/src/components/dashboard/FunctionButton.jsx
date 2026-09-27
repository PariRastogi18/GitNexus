import { MoreHorizontal, Trash, SquarePen, ToggleLeft } from "lucide-react";
import React, { useState } from "react";

export default function FunctionButton(id) {
  const [menuOpen, setMenuOpen] = useState(false);
  console.log(id);
  return (
    <div className="relative">
      <button
        className="hidden sm:block p-2 text-zinc-600 hover:text-white cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <MoreHorizontal size={18} />
      </button>
      {menuOpen && (
        <div className="absolute right-0 top-12 w-48 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl p-2">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:bg-zinc-900 cursor-pointer">
            <SquarePen size={17} />
            Edit
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:bg-zinc-900 cursor-pointer">
            <ToggleLeft size={17} />
            Toggle Visibility
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:bg-zinc-900 cursor-pointer">
            <Trash size={17} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
