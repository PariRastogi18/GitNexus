import React, { useState } from "react";
import {
  Code2,
  ArrowLeft,
  Camera,
  Save
} from "lucide-react";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState(
    ""
  );
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const profileData = {
      name,
      username,
      bio,
      email,
      location,
      website,
      profilePicture
    };

    console.log(profileData);
  };

  return (
    <div className="min-h-screen bg-black text-white">

      <header className="h-16 border-b border-zinc-800 flex items-center px-5 md:px-8">

        <Link to="/dashboard" className="flex items-center gap-3">

          <div className="w-9 h-9 bg-pink-500 rounded-lg flex items-center justify-center">
            <Code2 size={21} />
          </div>

          <h1 className="text-xl font-bold">
            Git<span className="text-pink-500">Nexus</span>
          </h1>

        </Link>

      </header>

      <main className="max-w-4xl mx-auto px-5 md:px-8 py-8">

        <Link
          to="/profile"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white mb-7"
        >
          <ArrowLeft size={16} />
          Back to profile
        </Link>

        <div className="mb-8">

          <h2 className="text-3xl font-bold">
            Edit profile
          </h2>

          <p className="text-zinc-500 mt-2">
            Update your profile information and how others see you.
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="border border-zinc-800 rounded-xl overflow-hidden">

            <div className="p-6 border-b border-zinc-800">

              <h3 className="font-semibold mb-5">
                Profile picture
              </h3>

              <div className="flex items-center gap-5">

                <div className="w-24 h-24 rounded-full bg-pink-500 flex items-center justify-center text-3xl font-bold">
                  P
                </div>

                <div>

                  <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 border border-zinc-700 rounded-lg text-sm font-medium hover:bg-zinc-900 transition"
                  >
                    <Camera size={16} />
                    Change picture
                  </button>

                  <p className="text-xs text-zinc-600 mt-2">
                    JPG, PNG or GIF. Maximum size 5MB.
                  </p>

                </div>

              </div>

            </div>

            <div className="p-6 border-b border-zinc-800">

              <label className="block text-sm font-semibold mb-2">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 px-4 bg-zinc-950 border border-zinc-800 rounded-lg text-sm outline-none focus:border-pink-500"
              />

            </div>

            <div className="p-6 border-b border-zinc-800">

              <label className="block text-sm font-semibold mb-2">
                Username
              </label>

              <div className="flex">

                <span className="h-11 px-4 flex items-center bg-zinc-900 border border-r-0 border-zinc-800 rounded-l-lg text-sm text-zinc-500">
                  gitnexus.com/
                </span>

                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="flex-1 h-11 px-4 bg-zinc-950 border border-zinc-800 rounded-r-lg text-sm outline-none focus:border-pink-500"
                />

              </div>

            </div>

            <div className="p-6 border-b border-zinc-800">

              <label className="block text-sm font-semibold mb-2">
                Bio
              </label>

              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows="4"
                maxLength="160"
                placeholder="Tell people a little about yourself..."
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-sm outline-none resize-none focus:border-pink-500"
              />

              <p className="text-xs text-zinc-600 mt-2">
                {bio.length}/160 characters
              </p>

            </div>

            <div className="p-6 border-b border-zinc-800">

              <label className="block text-sm font-semibold mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 bg-zinc-950 border border-zinc-800 rounded-lg text-sm outline-none focus:border-pink-500"
              />

            </div>

            <div className="p-6 border-b border-zinc-800">

              <label className="block text-sm font-semibold mb-2">
                Location
              </label>

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Lucknow, India"
                className="w-full h-11 px-4 bg-zinc-950 border border-zinc-800 rounded-lg text-sm outline-none focus:border-pink-500"
              />

            </div>

            <div className="p-6">

              <label className="block text-sm font-semibold mb-2">
                Website
              </label>

              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://yourwebsite.com"
                className="w-full h-11 px-4 bg-zinc-950 border border-zinc-800 rounded-lg text-sm outline-none focus:border-pink-500"
              />

            </div>

          </div>

          <div className="flex items-center justify-end gap-3 mt-6">

            <Link
              to="/profile"
              className="px-5 py-2.5 border border-zinc-800 rounded-lg text-sm font-medium hover:bg-zinc-900 transition"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-pink-500 hover:bg-pink-600 rounded-lg text-sm font-semibold transition"
            >
              <Save size={17} />
              Save changes
            </button>

          </div>

        </form>

      </main>

    </div>
  );
};

export default EditProfile;