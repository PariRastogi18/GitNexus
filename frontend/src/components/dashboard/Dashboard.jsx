import React, { useEffect } from "react";
import {
  Search,
  Plus,
  GitBranch,
  GitPullRequest,
  CircleDot,
  Star,
  Menu,
  X,
  Settings,
  LogOut,
  Code2,
  Users,
  BookOpen,
  MoreHorizontal,
  UserRoundPen,
  BookBookmark
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

import { Link } from "react-router-dom";
import ProfileIcon from "./ProfileIcon.jsx";
import GitNexusIcon from "./GitNexusIcon.jsx";
import FunctionButton from "./FunctionButton.jsx";
import NewRepoButton from "../utils/NewRepoButton.jsx";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const { user } = useAuth();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchUserRepos = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/repo/user/limit/${user.userId}`,
        );
        const data = await response.json();
        setRepositories(...repositories, data.userRepos);
      } catch (error) {
        console.error("Fetch user repos error : ", error.message);
      }
    };
    fetchUserRepos();
  }, []);

  // const repositories = [
  //   {
  //     name: "GitNexus",
  //     description: "A GitHub-inspired developer platform.",
  //     language: "JavaScript",
  //     stars: 24,
  //     forks: 6,
  //   },
  //   {
  //     name: "StockSphere",
  //     description: "Stock trading platform built with MERN.",
  //     language: "JavaScript",
  //     stars: 18,
  //     forks: 4,
  //   },
  //   {
  //     name: "HaloMeet",
  //     description: "Real-time video meeting application.",
  //     language: "JavaScript",
  //     stars: 12,
  //     forks: 3,
  //   },
  //   {
  //     name: "WanderLust",
  //     description: "Travel platform inspired by Airbnb.",
  //     language: "JavaScript",
  //     stars: 9,
  //     forks: 2,
  //   },
  // ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ================= HEADER ================= */}

      <header className="h-16 border-b border-zinc-800 bg-black flex items-center px-4 md:px-8 sticky top-0 z-50">
        <GitNexusIcon />

        {/* Search */}

        <div className="hidden md:block relative ml-10 w-full max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            type="text"
            placeholder="Search repositories..."
            className="
              w-full
              h-9
              pl-10
              pr-4
              bg-zinc-900
              border border-zinc-800
              rounded-lg
              text-sm
              text-white
              placeholder-zinc-500
              outline-none
              focus:border-pink-500
            "
          />
        </div>

        <div className="ml-auto flex items-center gap-4">
          <Link className="hidden sm:block text-zinc-400 hover:text-white" to={"/allRepos"}>
            <BookBookmark size={20}/>
          </Link>
          <Link className="hidden sm:block text-zinc-400 hover:text-white" to={"/allIssues"}>
            <CircleDot size={20} />
          </Link>

          {/* Profile */}

          <ProfileIcon />
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Welcome */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
          <div>
            <p className="text-pink-500 text-sm font-medium mb-1">Dashboard</p>

            <h2 className="text-3xl font-bold">
              Welcome back, {user.username}
            </h2>

            <p className="text-zinc-500 mt-2">
              Manage your repositories and developer activity.
            </p>
          </div>

          <NewRepoButton />
        </div>

        {/* ================= STATS ================= */}

        <div className="grid grid-cols-2 md:grid-cols-4 border border-zinc-800 rounded-xl overflow-hidden mb-8">
          <Stat icon={<BookOpen size={18} />} label="Repositories" value="12" />

          <Stat icon={<Star size={18} />} label="Stars" value="86" />

          <Stat icon={<Users size={18} />} label="Followers" value="142" />

          <Stat
            icon={<GitBranch size={18} />}
            label="Contributions"
            value="328"
          />
        </div>

        {/* ================= CONTENT ================= */}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Repositories */}

          <section className="lg:col-span-2 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
              <div>
                <h3 className="font-semibold">Recent repositories</h3>

                <p className="text-xs text-zinc-500 mt-1">
                  Your latest projects
                </p>
              </div>
              <Link to={"/allRepos"}>
                <button className="text-sm text-pink-500 hover:text-pink-400 cursor-pointer">
                  View all
                </button>
              </Link>
            </div>

            <div>
              {Array.isArray(repositories) &&
                repositories.map((repo) => (
                  <Repository key={repo._id} {...repo} />
                ))}
            </div>
          </section>

          {/* Activity */}

          <section className="border border-zinc-800 rounded-xl">
            <div className="px-5 py-4 border-b border-zinc-800">
              <h3 className="font-semibold">Recent activity</h3>

              <p className="text-xs text-zinc-500 mt-1">Your latest actions</p>
            </div>

            <div className="p-5 space-y-6">
              <Activity
                title="Pushed commits to"
                repo="GitNexus"
                time="2 hours ago"
              />

              <Activity
                title="Created repository"
                repo="HaloMeet"
                time="Yesterday"
              />

              <Activity
                title="Opened pull request in"
                repo="StockSphere"
                time="2 days ago"
              />

              <Activity title="Starred" repo="WanderLust" time="3 days ago" />
            </div>
          </section>
        </div>

        {/* ================= CONTRIBUTIONS ================= */}

        <section className="border border-zinc-800 rounded-xl mt-6 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold">Contribution activity</h3>

              <p className="text-xs text-zinc-500 mt-1">
                328 contributions in the last year
              </p>
            </div>

            <button className="text-sm text-zinc-400 hover:text-white">
              2026
            </button>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-175">
              <div className="flex gap-1">
                {Array.from({ length: 52 }).map((_, week) => (
                  <div key={week} className="flex flex-col gap-1">
                    {Array.from({ length: 7 }).map((_, day) => {
                      const level = Math.floor(Math.random() * 5);

                      return (
                        <div
                          key={day}
                          className={`
                            w-3 h-3 rounded-sm
                            ${
                              level === 0
                                ? "bg-zinc-900"
                                : level === 1
                                  ? "bg-pink-950"
                                  : level === 2
                                    ? "bg-pink-800"
                                    : level === 3
                                      ? "bg-pink-600"
                                      : "bg-pink-400"
                            }
                          `}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="flex justify-end items-center gap-2 mt-4 text-xs text-zinc-600">
                Less
                <span className="w-3 h-3 bg-zinc-900 rounded-sm" />
                <span className="w-3 h-3 bg-pink-950 rounded-sm" />
                <span className="w-3 h-3 bg-pink-800 rounded-sm" />
                <span className="w-3 h-3 bg-pink-600 rounded-sm" />
                <span className="w-3 h-3 bg-pink-400 rounded-sm" />
                More
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

/* ================= STAT ================= */

const Stat = ({ icon, label, value }) => {
  return (
    <div className="p-5 border-r border-b md:border-b-0 border-zinc-800 last:border-r-0">
      <div className="flex items-center gap-2 text-zinc-500 mb-3">
        {icon}
        <span className="text-xs">{label}</span>
      </div>

      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

/* ================= REPOSITORY ================= */

const Repository = ({ _id, repoName, description, language, stars, forks, visibility }) => {
  return (
    <div className="px-5 py-5 border-b border-zinc-800 last:border-b-0 hover:bg-zinc-950 transition">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Code2 size={17} className="text-pink-500" />

            <h4 className="font-semibold text-pink-500 hover:text-pink-400 cursor-pointer">
              {repoName}
            </h4>

            <span className="text-[10px] border border-zinc-700 text-zinc-500 px-2 py-0.5 rounded-full">
              {visibility === true ? "Public" : "Private"}
            </span>
          </div>

          <p className="text-sm text-zinc-500 mt-2">{description}</p>

          <div className="flex items-center gap-5 mt-4 text-xs text-zinc-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
              {language}
            </span>

            <span className="flex items-center gap-1">
              <Star size={13} />
              {stars}
            </span>

            <span className="flex items-center gap-1">
              <GitBranch size={13} />
              {forks}
            </span>
          </div>
        </div>

        <FunctionButton repoId={_id} />
      </div>
    </div>
  );
};

/* ================= ACTIVITY ================= */

const Activity = ({ title, repo, time }) => {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center shrink-0">
        <GitBranch size={15} className="text-pink-500" />
      </div>

      <div>
        <p className="text-sm text-zinc-400">
          {title} <span className="text-white font-medium">{repo}</span>
        </p>

        <p className="text-xs text-zinc-600 mt-1">{time}</p>
      </div>
    </div>
  );
};

export default Dashboard;
