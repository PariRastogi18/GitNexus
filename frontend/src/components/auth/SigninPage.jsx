import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, GitBranch } from "lucide-react";
const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {" "}
      {/* Background Decorations */}{" "}
      <div className="absolute top-25 left-25 w-72 h-72 bg-pink-100 rounded-full blur-3xl opacity-70"></div>{" "}
      <div className="absolute bottom-30 right-20 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-50"></div>{" "}
      {/* Git Branch Decorations */}{" "}
      <div className="absolute top-20 left-10 text-pink-200 hidden lg:block">
        {" "}
        <GitBranch size={100} strokeWidth={1} />{" "}
      </div>{" "}
      <div className="absolute bottom-20 right-10 text-pink-200 hidden lg:block">
        {" "}
        <GitBranch size={120} strokeWidth={1} />{" "}
      </div>{" "}
      {/* Main Container */}{" "}
      <div className="w-full max-w-md relative z-10">
        {" "}
        {/* Logo */}{" "}
        <div className="text-center mb-8">
          {" "}
          <div className="flex justify-center mb-4">
            {" "}
            <div className="w-14 h-14 rounded-2xl bg-pink-500 flex items-center justify-center shadow-lg shadow-pink-200">
              {" "}
              {/* <Github size={32} className="text-white" strokeWidth={2} />{" "} */}
            </div>{" "}
          </div>{" "}
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            {" "}
            Git<span className="text-pink-500">Nexus</span>{" "}
          </h1>{" "}
          <p className="text-gray-500 mt-2 text-sm">
            {" "}
            Build. Collaborate. Ship.{" "}
          </p>{" "}
        </div>{" "}
        {/* Sign In Card */}{" "}
        <div className="bg-white border border-pink-100 rounded-3xl p-7 sm:p-8 shadow-xl shadow-pink-100/50">
          {" "}
          {/* Heading */}{" "}
          <div className="mb-7">
            {" "}
            <h2 className="text-2xl font-bold text-gray-900">
              {" "}
              Welcome back{" "}
            </h2>{" "}
            <p className="text-sm text-gray-500 mt-1">
              {" "}
              Sign in to continue to GitNexus{" "}
            </p>{" "}
          </div>{" "}
          {/* Form */}{" "}
          <form onSubmit={handleSubmit} className="space-y-5">
            {" "}
            {/* Email */}{" "}
            <div>
              {" "}
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {" "}
                Email address{" "}
              </label>{" "}
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className=" w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:bg-white focus:border-pink-400 focus:ring-4 focus:ring-pink-100 "
              />{" "}
            </div>{" "}
            {/* Password */}{" "}
            <div>
              {" "}
              <div className="flex items-center justify-between mb-2">
                {" "}
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  {" "}
                  Password{" "}
                </label>{" "}
                <Link
                  to="/forgot-password"
                  className=" text-sm text-pink-500 hover:text-pink-600 hover:underline font-medium "
                >
                  {" "}
                  Forgot password?{" "}
                </Link>{" "}
              </div>{" "}
              <div className="relative">
                {" "}
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className=" w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:bg-white focus:border-pink-400 focus:ring-4 focus:ring-pink-100 "
                />{" "}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className=" absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 transition "
                >
                  {" "}
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}{" "}
                </button>{" "}
              </div>{" "}
            </div>{" "}
            {/* Remember Me */}{" "}
            <div className="flex items-center gap-2">
              {" "}
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 accent-pink-500"
              />{" "}
              <label
                htmlFor="remember"
                className="text-sm text-gray-500 cursor-pointer"
              >
                {" "}
                Remember me{" "}
              </label>{" "}
            </div>{" "}
            {/* Sign In Button */}{" "}
            <button
              type="submit"
              className=" w-full py-3.5 rounded-xl bg-pink-500 hover:bg-pink-600 active:scale-[0.98] text-white font-semibold shadow-lg shadow-pink-200 transition-all duration-200 "
            >
              {" "}
              Sign in{" "}
            </button>{" "}
          </form>{" "}
          {/* Divider */}{" "}
          <div className="flex items-center gap-4 my-6">
            {" "}
            <div className="h-px bg-gray-200 flex-1"></div>{" "}
            <span className="text-xs text-gray-400"> OR </span>{" "}
            <div className="h-px bg-gray-200 flex-1"></div>{" "}
          </div>{" "}
          {/* GitHub Login */}{" "}
          <button
            type="button"
            className=" w-full py-3 rounded-xl border border-gray-200 bg-white hover:bg-pink-50 hover:border-pink-200 text-gray-700 font-medium flex items-center justify-center gap-3 transition-all duration-200 "
          >
            {" "}
            {/* <Github size={20} /> Continue with GitHub{" "} */}
          </button>{" "}
          {/* Signup */}{" "}
          <p className="text-center text-sm text-gray-500 mt-7">
            {" "}
            Don't have an account?{" "}
            <Link
              to="/signup"
              className=" text-pink-500 font-semibold hover:text-pink-600 hover:underline "
            >
              {" "}
              Create account{" "}
            </Link>{" "}
          </p>{" "}
        </div>{" "}
        {/* Footer */}{" "}
        <p className="text-center text-xs text-gray-400 mt-6">
          {" "}
          © 2026 GitNexus. Built for developers 💗{" "}
        </p>{" "}
      </div>{" "}
    </div>
  );
};
export default SignIn;
