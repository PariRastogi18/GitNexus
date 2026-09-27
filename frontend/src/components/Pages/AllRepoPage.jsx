import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  GitBranch,
  Star,
  Code2,
  MoreHorizontal,
  Lock,
  Globe,
  ChevronDown,
} from "lucide-react";
import GitNexusIcon from "../dashboard/GitNexusIcon";
import ProfileIcon from "../dashboard/ProfileIcon";
import { useAuth } from "../context/AuthContext";
import FunctionButton from "../dashboard/FunctionButton";
import NewRepoButton from "../utils/NewRepoButton";

const AllRepoPage = () => {
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("All languages");
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("Recently updated");
  const [repositories, setRepositories] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserRepos = async () => {
      try {
        if (!user?.userId) return;

        const response = await fetch(`${BACKEND_URL}/repo/user/${user.userId}`);
        const data = await response.json();
        setRepositories(Array.isArray(data.userRepos) ? data.userRepos : []);
      } catch (error) {
        console.error("Fetch user repos error : ", error.message);
      }
    };
    fetchUserRepos();
  }, [BACKEND_URL, user?.userId]);

  const filteredRepositories = repositories.filter((repo) => {
    const repoName = repo.repoName?.toLowerCase() || "";
    const description = repo.description?.toLowerCase() || "";

    const matchesSearch =
      repoName.includes(search.toLowerCase()) ||
      description.includes(search.toLowerCase());

    const matchesLanguage =
      language === "All languages" || repo.language === language;

    const matchesType =
      type === "All" ||
      (type === "Public" && repo.visibility === true) ||
      (type === "Private" && repo.visibility === false);

    return matchesSearch && matchesLanguage && matchesType;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ================= HEADER ================= */}

      <header className="h-16 border-b border-zinc-800 flex items-center px-5 md:px-8">
        <GitNexusIcon />

        <div className="ml-auto flex items-center gap-3">
          <NewRepoButton/>

          <ProfileIcon />
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main className="max-w-6xl mx-auto px-5 md:px-8 py-8">
        {/* Page Heading */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
          <div>
            <h2 className="text-3xl font-bold">Repositories</h2>

            <p className="text-zinc-500 mt-2">Your projects and repositories</p>
          </div>

          <button className="sm:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-pink-500 rounded-lg font-semibold text-sm">
            <Plus size={17} />
            New repository
          </button>
        </div>

        {/* ================= FILTER BAR ================= */}

        <div className="border border-zinc-800 rounded-xl p-3 mb-6">
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search */}

            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find a repository..."
                className="
                  w-full
                  h-10
                  pl-10
                  pr-4
                  bg-zinc-950
                  border border-zinc-800
                  rounded-lg
                  text-sm
                  outline-none
                  placeholder-zinc-600
                  focus:border-pink-500
                "
              />
            </div>

            {/* Language */}

            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="
                  h-10
                  px-4
                  pr-9
                  bg-zinc-950
                  border border-zinc-800
                  rounded-lg
                  text-sm
                  text-zinc-300
                  outline-none
                  appearance-none
                  focus:border-pink-500
                "
              >
                <option>All languages</option>
                <option>JavaScript</option>
                <option>Node.js</option>
                <option>Java</option>
              </select>

              <ChevronDown
                size={15}
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500"
              />
            </div>

            {/* Type */}

            <div className="relative">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="
                  h-10
                  px-4
                  pr-9
                  bg-zinc-950
                  border border-zinc-800
                  rounded-lg
                  text-sm
                  text-zinc-300
                  outline-none
                  appearance-none
                  focus:border-pink-500
                "
              >
                <option>All</option>
                <option>Public</option>
                <option>Private</option>
              </select>

              <ChevronDown
                size={15}
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500"
              />
            </div>

            {/* Sort */}

            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="
                  h-10
                  px-4
                  pr-9
                  bg-zinc-950
                  border border-zinc-800
                  rounded-lg
                  text-sm
                  text-zinc-300
                  outline-none
                  appearance-none
                  focus:border-pink-500
                "
              >
                <option>Recently updated</option>
                <option>Name</option>
                <option>Most stars</option>
                <option>Most forks</option>
              </select>

              <ChevronDown
                size={15}
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500"
              />
            </div>
          </div>
        </div>

        {/* ================= REPOSITORY COUNT ================= */}

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-zinc-500">
            {filteredRepositories.length} repositories
          </p>
        </div>

        {/* ================= REPOSITORY LIST ================= */}

        <div className="border border-zinc-800 rounded-xl overflow-hidden">
          {filteredRepositories.length > 0 ? (
            filteredRepositories.map((repo) => (
              <RepositoryCard key={repo._id} repo={repo} />
            ))
          ) : (
            <div className="py-20 text-center">
              <Code2 size={40} className="mx-auto text-zinc-700 mb-4" />

              <h3 className="font-semibold text-lg">No repositories found</h3>

              <p className="text-sm text-zinc-500 mt-2">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

/* ================= REPOSITORY CARD ================= */

const RepositoryCard = ({ repo }) => {
  return (
    <div className="px-5 md:px-6 py-6 border-b border-zinc-800 last:border-b-0 hover:bg-zinc-950 transition">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {/* Name */}

          <div className="flex flex-wrap items-center gap-2">
            {repo.visibility === false ? (
              <Lock size={16} className="text-zinc-500" />
            ) : (
              <Globe size={16} className="text-zinc-500" />
            )}

            <h3 className="text-lg font-semibold text-pink-500 hover:text-pink-400 cursor-pointer">
              {repo.repoName}
            </h3>

            <span className="text-xs border border-zinc-700 text-zinc-500 px-2 py-0.5 rounded-full">
              {repo.visibility === true ? "Public" : "Private"}
            </span>
          </div>

          {/* Description */}

          <p className="text-sm text-zinc-500 mt-2 max-w-2xl">
            {repo.description}
          </p>

          {/* Repository Info */}

          <div className="flex flex-wrap items-center gap-5 mt-5 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />

              {repo.language}
            </span>

            <span className="flex items-center gap-1.5">
              <Star size={14} />

              {repo.stars}
            </span>

            <span className="flex items-center gap-1.5">
              <GitBranch size={14} />

              {repo.forks}
            </span>

            <span>Updated {repo.updated}</span>
          </div>
        </div>

        {/* More */}

       <FunctionButton repoId={repo._id}/>
      </div>
    </div>
  );
};

export default AllRepoPage;
