import React from "react";
import {
  Code2,
  MapPin,
  Link as LinkIcon,
  Mail,
  Calendar,
  Users,
  BookOpen,
  Star,
  GitBranch,
  Edit,
} from "lucide-react";
import { Link } from "react-router-dom";
import GitNexusIcon from "../dashboard/GitNexusIcon.jsx";
import ProfileIcon from "../dashboard/ProfileIcon.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Profile = () => {
  const { user } = useAuth();
  const repositories = [
    {
      name: "GitNexus",
      description: "A GitHub-inspired developer platform.",
      language: "JavaScript",
      stars: 24,
      forks: 6,
    },
    {
      name: "StockSphere",
      description: "Stock trading platform built with MERN.",
      language: "JavaScript",
      stars: 18,
      forks: 4,
    },
    {
      name: "HaloMeet",
      description: "Real-time video meeting application.",
      language: "JavaScript",
      stars: 12,
      forks: 3,
    },
    {
      name: "WanderLust",
      description: "Travel platform inspired by Airbnb.",
      language: "JavaScript",
      stars: 9,
      forks: 2,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="h-16 border-b border-zinc-800 flex items-center px-5 md:px-8">
        <GitNexusIcon />

        <div className="ml-auto flex items-center gap-3">
          <Link
            to="/allRepos"
            className="hidden sm:block text-sm text-zinc-400 hover:text-white"
          >
            Repositories
          </Link>

          <ProfileIcon />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 md:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-72">
            <div className="flex md:block items-center gap-5">
              <div className="w-28 h-28 md:w-40 md:h-40 rounded-full bg-pink-500 flex items-center justify-center text-4xl md:text-5xl font-bold">
                {!user.profilePicture ? (
                  user.name[0].toUpperCase()
                ) : (
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-40 h-40 rounded-full object-cover"
                  />
                )}
              </div>

              <div className="md:mt-5">
                <h2 className="text-2xl font-bold">{user.name}</h2>

                <p className="text-zinc-500">{user.username}</p>
              </div>
            </div>

            <Link
              className="w-full mt-6 py-2.5 border border-zinc-700 rounded-lg text-sm font-semibold hover:bg-zinc-900 transition flex items-center justify-center gap-2"
              to={"/edit"}
            >
              <Edit size={16} />
              Edit profile
            </Link>

            <p className="text-sm text-zinc-400 mt-5">
              {user.bio}
            </p>

            <div className="mt-5 space-y-3 text-sm text-zinc-500">
              <div className="flex items-center gap-3">
                <MapPin size={17} />
                 {user.location}
              </div>

              <div className="flex items-center gap-3">
                <Mail size={17} />
                {user.email}
              </div>

              <div className="flex items-center gap-3">
                <LinkIcon size={17} />
                <span className="text-pink-500">portfolio.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Calendar size={17} />
                Joined September 2026
              </div>
            </div>

            <div className="flex items-center gap-5 mt-6 text-sm">
              <span className="flex items-center gap-1.5">
                <strong className="text-white">128</strong>
                <span className="text-zinc-500">followers</span>
              </span>

              <span className="flex items-center gap-1.5">
                <strong className="text-white">86</strong>
                <span className="text-zinc-500">following</span>
              </span>
            </div>
          </aside>

          <section className="flex-1">
            <div className="border-b border-zinc-800 flex gap-7 overflow-x-auto">
              <button className="pb-4 border-b-2 border-pink-500 text-white text-sm font-semibold whitespace-nowrap">
                Overview
              </button>

              <Link
                to="/allRepos"
                className="pb-4 text-zinc-500 hover:text-white text-sm whitespace-nowrap"
              >
                Repositories
              </Link>

              <button className="pb-4 text-zinc-500 hover:text-white text-sm whitespace-nowrap">
                Projects
              </button>

              <button className="pb-4 text-zinc-500 hover:text-white text-sm whitespace-nowrap">
                Stars
              </button>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">
                Popular repositories
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {repositories.slice(0, 4).map((repo) => (
                  <div
                    key={repo.name}
                    className="border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-pink-500 font-semibold">
                        {repo.name}
                      </h4>

                      <span className="text-xs border border-zinc-700 px-2 py-1 rounded-full text-zinc-500">
                        Public
                      </span>
                    </div>

                    <p className="text-sm text-zinc-500 mt-3 min-h-10">
                      {repo.description}
                    </p>

                    <div className="flex items-center gap-5 mt-5 text-xs text-zinc-500">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                        {repo.language}
                      </span>

                      <span className="flex items-center gap-1">
                        <Star size={14} />
                        {repo.stars}
                      </span>

                      <span className="flex items-center gap-1">
                        <GitBranch size={14} />
                        {repo.forks}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-4">Contributions</h3>

              <div className="border border-zinc-800 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-5">
                  <BookOpen size={18} className="text-pink-500" />

                  <p className="text-sm text-zinc-400">
                    <span className="text-white font-semibold">
                      186 contributions
                    </span>{" "}
                    in the last year
                  </p>
                </div>

                <div className="grid grid-cols-12 sm:grid-cols-18 gap-1.5">
                  {Array.from({ length: 144 }).map((_, index) => (
                    <div
                      key={index}
                      className={`w-full aspect-square rounded-sm ${
                        index % 9 === 0
                          ? "bg-pink-500"
                          : index % 5 === 0
                            ? "bg-pink-500/60"
                            : index % 3 === 0
                              ? "bg-pink-500/30"
                              : "bg-zinc-800"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-4">GitNexus activity</h3>

              <div className="border border-zinc-800 rounded-xl p-5 space-y-6">
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-pink-500/10 flex items-center justify-center">
                    <Star size={17} className="text-pink-500" />
                  </div>

                  <div>
                    <p className="text-sm">
                      Starred <span className="text-pink-500">StockSphere</span>
                    </p>

                    <p className="text-xs text-zinc-600 mt-1">2 hours ago</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-pink-500/10 flex items-center justify-center">
                    <GitBranch size={17} className="text-pink-500" />
                  </div>

                  <div>
                    <p className="text-sm">
                      Created repository{" "}
                      <span className="text-pink-500">GitNexus</span>
                    </p>

                    <p className="text-xs text-zinc-600 mt-1">Yesterday</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Profile;
