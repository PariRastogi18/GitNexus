import React from "react";
import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";

export default function GitNexusIcon() {
  return (
    <Link to={"/"}>
      <div className="flex items-center gap-3 cursor-pointer">
        <div className="w-9 h-9 bg-pink-500 rounded-lg flex items-center justify-center">
          <Code2 size={21} />
        </div>

        <h1 className="text-xl font-bold">
          Git<span className="text-pink-500">Nexus</span>
        </h1>
      </div>
    </Link>
  );
}
