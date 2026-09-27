import React, { useState } from "react";
import { Code2, ArrowLeft, Plus, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import GitNexusIcon from "../dashboard/GitNexusIcon";
import { useAuth } from "../context/AuthContext";

const CreateRepository = () => {
  const [repoName, setRepoName] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [issues, setIssues] = useState(true);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!repoName.trim()) {
      console.error("Repository name is required.");
      return;
    }

    if (!user?.userId) {
      console.error("User is not authenticated.");
      return;
    }

    const repoData = {
      owner: user.userId,
      repoName: repoName.trim(),
      content,
      description,
      visibility: visibility === "public",
      issues: [],
    };

    try {
      const response = await fetch(`${BACKEND_URL}/repo/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(repoData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create repository");
      }

      console.log("Repository created successfully:", result);
      navigate("/allRepos");
    } catch (error) {
      console.error("Create Repo error: ", error.message);
    }

    setRepoName("");
    setContent("");
    setDescription("");
    setIssues(true);
    setVisibility("public");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="h-16 border-b border-zinc-800 flex items-center px-5 md:px-8">
        <GitNexusIcon />
      </header>

      <main className="max-w-3xl mx-auto px-5 py-10">
        <Link
          to="/allRepos"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white mb-7"
        >
          <ArrowLeft size={16} />
          Back to repositories
        </Link>

        <div className="mb-8">
          <h2 className="text-3xl font-bold">Create a new repository</h2>

          <p className="text-zinc-500 mt-2">
            Create a new repository to store and manage your code.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="border border-zinc-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800">
              <label className="block text-sm font-semibold mb-2">
                Repository name
              </label>

              <input
                type="text"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                placeholder="my-awesome-project"
                required
                className="w-full h-11 px-4 bg-zinc-950 border border-zinc-800 rounded-lg outline-none text-sm focus:border-pink-500"
              />

              <p className="text-xs text-zinc-600 mt-2">
                A short and unique name for your repository.
              </p>
            </div>

            <div className="p-6 border-b border-zinc-800">
              <label className="block text-sm font-semibold mb-2">
                Description
                <span className="text-zinc-600 font-normal"> (optional)</span>
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what this repository is about..."
                rows="4"
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg outline-none text-sm resize-none focus:border-pink-500"
              />
            </div>

            <div className="p-6 border-b border-zinc-800">
              <label className="block text-sm font-semibold mb-2">
                Content
              </label>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add repository content..."
                rows="6"
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg outline-none text-sm resize-none focus:border-pink-500"
              />

              <p className="text-xs text-zinc-600 mt-2">
                Add the initial content for your repository.
              </p>
            </div>

            <div className="p-6 border-b border-zinc-800">
              <label className="block text-sm font-semibold mb-4">
                Visibility
              </label>

              <div className="space-y-3">
                <label
                  className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition ${
                    visibility === "public"
                      ? "border-pink-500 bg-pink-500/5"
                      : "border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={visibility === "public"}
                    onChange={(e) => setVisibility(e.target.value)}
                    className="mt-1 accent-pink-500"
                  />

                  <div>
                    <p className="font-medium">Public</p>
                    <p className="text-sm text-zinc-500 mt-1">
                      Anyone can view this repository.
                    </p>
                  </div>
                </label>

                <label
                  className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition ${
                    visibility === "private"
                      ? "border-pink-500 bg-pink-500/5"
                      : "border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={visibility === "private"}
                    onChange={(e) => setVisibility(e.target.value)}
                    className="mt-1 accent-pink-500"
                  />

                  <div>
                    <p className="font-medium">Private</p>
                    <p className="text-sm text-zinc-500 mt-1">
                      Only you can view this repository.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="p-6">
              <label className="flex items-start gap-4 cursor-pointer">
                <div
                  onClick={() => setIssues(!issues)}
                  className={`w-11 h-6 rounded-full p-1 transition ${
                    issues ? "bg-pink-500" : "bg-zinc-700"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition ${
                      issues ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>

                <div>
                  <p className="font-medium">Enable issues</p>

                  <p className="text-sm text-zinc-500 mt-1">
                    Allow users to create and discuss issues in this repository.
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-6">
            <Link
              to="/allRepos"
              className="px-5 py-2.5 border border-zinc-800 rounded-lg text-sm font-medium hover:bg-zinc-900 transition"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-pink-500 hover:bg-pink-600 rounded-lg text-sm font-semibold transition cursor-pointer"
            >
              <Plus size={17} />
              Create repository
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateRepository;
