import React from "react";
import { Link } from "react-router-dom";
import { GitBranch, ArrowLeft, Home, Search } from "lucide-react";
const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 relative overflow-hidden">
      {" "}
      {/* Background Pink Glow */}{" "}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-pink-100 rounded-full blur-3xl opacity-70" />{" "}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-60" />{" "}
      {/* Decorative Git Branch */}{" "}
      <GitBranch
        size={180}
        strokeWidth={0.7}
        className="absolute top-16 left-10 text-pink-100 rotate-12 hidden md:block"
      />{" "}
      <GitBranch
        size={160}
        strokeWidth={0.7}
        className="absolute bottom-16 right-10 text-pink-100 -rotate-12 hidden md:block"
      />{" "}
      {/* Main Content */}{" "}
      <div className="relative z-10 text-center max-w-2xl">
        {" "}
        {/* Logo */}{" "}
        <div className="flex justify-center mb-7">
          {" "}
          <div className="w-14 h-14 bg-pink-500 rounded-2xl flex items-center justify-center shadow-xl shadow-pink-200">
            {" "}
            {/* <Github size={32} className="text-white" strokeWidth={2} />{" "} */}
          </div>{" "}
        </div>{" "}
        {/* 404 */}{" "}
        <div className="relative inline-block">
          {" "}
          <h1 className=" text-[120px] sm:text-[160px] leading-none font-black tracking-tight text-pink-500 drop-shadow-[0_8px_0_rgba(251,207,232,0.7)] ">
            {" "}
            404{" "}
          </h1>{" "}
          {/* Small Code Badge */}{" "}
          <div className=" absolute -right-6 top-4 rotate-12 bg-white border border-pink-200 rounded-xl px-3 py-1.5 shadow-lg ">
            {" "}
            <span className="text-xs font-mono text-pink-500">
              {" "}
              &lt;/404&gt;{" "}
            </span>{" "}
          </div>{" "}
        </div>{" "}
        {/* Heading */}{" "}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-5">
          {" "}
          Oops! Page not found{" "}
        </h2>{" "}
        {/* Description */}{" "}
        <p className="text-gray-500 mt-3 max-w-md mx-auto leading-relaxed">
          {" "}
          Looks like this branch doesn't exist. The page you're looking for may
          have been moved, deleted, or never committed.{" "}
        </p>{" "}
        {/* Code Message */}{" "}
        <div className="mt-6 inline-flex items-center gap-2 bg-pink-50 border border-pink-100 px-4 py-2.5 rounded-xl">
          {" "}
          <GitBranch size={17} className="text-pink-500" />{" "}
          <span className="font-mono text-sm text-pink-600">
            {" "}
            error: branch not found{" "}
          </span>{" "}
        </div>{" "}
        {/* Buttons */}{" "}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          {" "}
          {/* Dashboard */}{" "}
          <Link
            to="/dashboard"
            className=" w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-semibold shadow-lg shadow-pink-200 transition-all duration-200 active:scale-95 "
          >
            {" "}
            <Home size={18} /> Back to Dashboard{" "}
          </Link>{" "}
          {/* Go Back */}{" "}
          <button
            onClick={() => window.history.back()}
            className=" w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-pink-50 text-gray-700 border border-gray-200 hover:border-pink-200 rounded-xl font-semibold transition-all duration-200 active:scale-95 "
          >
            {" "}
            <ArrowLeft size={18} /> Go Back{" "}
          </button>{" "}
        </div>{" "}
        {/* Search */}{" "}
        <div className="mt-8 max-w-sm mx-auto relative">
          {" "}
          <Search
            size={18}
            className=" absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 "
          />{" "}
          <input
            type="text"
            placeholder="Search GitNexus..."
            className=" w-full h-11 pl-11 pr-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm text-gray-700 placeholder-gray-400 focus:bg-white focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition "
          />{" "}
        </div>{" "}
        {/* Footer */}{" "}
        <p className="text-xs text-gray-400 mt-10">
          {" "}
          © 2026 Git <span className="text-pink-500 font-medium">
            {" "}
            Nexus{" "}
          </span>{" "}
          • Build. Collaborate. Ship. 💗{" "}
        </p>{" "}
      </div>{" "}
    </div>
  );
};
export default NotFound;
