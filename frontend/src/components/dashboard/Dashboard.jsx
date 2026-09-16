import React from "react";
import {
  Home,
  GitBranch,
  Star,
  Compass,
  Settings,
  Search,
  Plus,
  Bell,
  ChevronDown,
  Code2,
  GitPullRequest,
  CircleDot,
  Menu,
  X,
  BookOpen,
  Users,
} from "lucide-react";
import { useState } from "react";
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      description: "A modern stock trading platform built with MERN.",
      language: "JavaScript",
      stars: 18,
      forks: 4,
    },
    {
      name: "HeloMeet",
      description: "Real-time video meeting application.",
      language: "JavaScript",
      stars: 12,
      forks: 3,
    },
    {
      name: "WanderLust",
      description: "Airbnb-inspired travel application.",
      language: "JavaScript",
      stars: 9,
      forks: 2,
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {" "}
      {/* ================= HEADER ================= */}{" "}
      <header className="h-16 bg-white border-b border-pink-100 flex items-center px-4 lg:px-6 sticky top-0 z-50">
        {" "}
        {/* Mobile Menu */}{" "}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden mr-4 text-gray-600 hover:text-pink-500"
        >
          {" "}
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}{" "}
        </button>{" "}
        {/* Logo */}{" "}
        <div className="flex items-center gap-2 mr-8">
          {" "}
          <div className="w-9 h-9 rounded-xl bg-pink-500 flex items-center justify-center shadow-md shadow-pink-200">
            {" "}
            {/* <Github size={22} className="text-white" />{" "} */}
          </div>{" "}
          <span className="text-xl font-bold hidden sm:block">
            {" "}
            Git<span className="text-pink-500">Nexus</span>{" "}
          </span>{" "}
        </div>{" "}
        {/* Search */}{" "}
        <div className="relative flex-1 max-w-xl">
          {" "}
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />{" "}
          <input
            type="text"
            placeholder="Search repositories, users..."
            className=" w-full h-10 pl-10 pr-4 rounded-xl bg-gray-50 border border-gray-200 outline-none text-sm focus:bg-white focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition "
          />{" "}
        </div>{" "}
        {/* Header Right */}{" "}
        <div className="flex items-center gap-4 ml-4">
          {" "}
          <button className="relative text-gray-500 hover:text-pink-500">
            {" "}
            <Bell size={20} />{" "}
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full"></span>{" "}
          </button>{" "}
          <button className="hidden sm:flex items-center gap-2">
            {" "}
            <div className="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center">
              {" "}
              <span className="text-sm font-bold text-pink-600"> P </span>{" "}
            </div>{" "}
            <ChevronDown size={16} className="text-gray-400" />{" "}
          </button>{" "}
        </div>{" "}
      </header>{" "}
      {/* ================= MAIN ================= */}{" "}
      <div className="flex">
        {" "}
        {/* ================= SIDEBAR ================= */}{" "}
        <aside
          className={` fixed lg:sticky top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] bg-white border-r border-pink-100 p-5 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} `}
        >
          {" "}
          {/* Profile */}{" "}
          <div className="flex items-center gap-3 pb-5 border-b border-gray-100">
            {" "}
            <div className="w-11 h-11 rounded-full bg-pink-100 flex items-center justify-center">
              {" "}
              <span className="text-lg font-bold text-pink-600"> P </span>{" "}
            </div>{" "}
            <div className="min-w-0">
              {" "}
              <p className="font-semibold truncate"> Pari Rastogi </p>{" "}
              <p className="text-xs text-gray-500 truncate">
                {" "}
                @parirastogi{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
          {/* Navigation */}{" "}
          <nav className="mt-6 space-y-1">
            {" "}
            <SidebarItem
              icon={<Home size={19} />}
              text="Dashboard"
              active
            />{" "}
            <SidebarItem icon={<BookOpen size={19} />} text="Repositories" />{" "}
            <SidebarItem icon={<GitBranch size={19} />} text="Pull Requests" />{" "}
            <SidebarItem icon={<CircleDot size={19} />} text="Issues" />{" "}
            <SidebarItem icon={<Star size={19} />} text="Stars" />{" "}
            <SidebarItem icon={<Compass size={19} />} text="Explore" />{" "}
          </nav>{" "}
          {/* Bottom */}{" "}
          <div className="absolute bottom-5 left-5 right-5">
            {" "}
            <SidebarItem icon={<Settings size={19} />} text="Settings" />{" "}
          </div>{" "}
        </aside>{" "}
        {/* ================= CONTENT ================= */}{" "}
        <main className="flex-1 min-w-0 p-5 lg:p-8">
          {" "}
          <div className="max-w-7xl mx-auto">
            {" "}
            {/* Welcome */}{" "}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              {" "}
              <div>
                {" "}
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {" "}
                  Good evening, Pari 👋{" "}
                </h1>{" "}
                <p className="text-gray-500 mt-1">
                  {" "}
                  Here's what's happening with your repositories.{" "}
                </p>{" "}
              </div>{" "}
              <button className=" flex items-center justify-center gap-2 px-5 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-semibold shadow-lg shadow-pink-200 transition ">
                {" "}
                <Plus size={19} /> New repository{" "}
              </button>{" "}
            </div>{" "}
            {/* ================= STATS ================= */}{" "}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {" "}
              <StatCard
                icon={<BookOpen size={20} />}
                title="Repositories"
                value="12"
              />{" "}
              <StatCard icon={<Star size={20} />} title="Stars" value="86" />{" "}
              <StatCard
                icon={<Users size={20} />}
                title="Followers"
                value="142"
              />{" "}
              <StatCard
                icon={<GitBranch size={20} />}
                title="Contributions"
                value="328"
              />{" "}
            </div>{" "}
            {/* ================= GRID ================= */}{" "}
            <div className="grid xl:grid-cols-3 gap-6">
              {" "}
              {/* Repositories */}{" "}
              <div className="xl:col-span-2">
                {" "}
                <div className="bg-white border border-pink-100 rounded-2xl overflow-hidden">
                  {" "}
                  <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    {" "}
                    <div>
                      {" "}
                      <h2 className="font-bold text-lg">
                        {" "}
                        Your repositories{" "}
                      </h2>{" "}
                      <p className="text-sm text-gray-500 mt-1">
                        {" "}
                        Your most recent projects{" "}
                      </p>{" "}
                    </div>{" "}
                    <button className="text-sm text-pink-500 font-semibold hover:underline">
                      {" "}
                      View all{" "}
                    </button>{" "}
                  </div>{" "}
                  <div className="divide-y divide-gray-100">
                    {" "}
                    {repositories.map((repo) => (
                      <RepositoryCard key={repo.name} {...repo} />
                    ))}{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              {/* Activity */}{" "}
              <div>
                {" "}
                <div className="bg-white border border-pink-100 rounded-2xl p-5">
                  {" "}
                  <div className="flex items-center justify-between mb-6">
                    {" "}
                    <div>
                      {" "}
                      <h2 className="font-bold text-lg">
                        {" "}
                        Recent activity{" "}
                      </h2>{" "}
                      <p className="text-sm text-gray-500 mt-1">
                        {" "}
                        Your latest actions{" "}
                      </p>{" "}
                    </div>{" "}
                    <GitPullRequest size={20} className="text-pink-500" />{" "}
                  </div>{" "}
                  <div className="space-y-6">
                    {" "}
                    <Activity
                      title="Pushed 3 commits"
                      repo="GitNexus"
                      time="2 hours ago"
                    />{" "}
                    <Activity
                      title="Created repository"
                      repo="HeloMeet"
                      time="Yesterday"
                    />{" "}
                    <Activity
                      title="Opened pull request"
                      repo="StockSphere"
                      time="2 days ago"
                    />{" "}
                    <Activity
                      title="Starred repository"
                      repo="WanderLust"
                      time="3 days ago"
                    />{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            {/* ================= CONTRIBUTIONS ================= */}{" "}
            <div className="bg-white border border-pink-100 rounded-2xl p-5 mt-6">
              {" "}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
                {" "}
                <div>
                  {" "}
                  <h2 className="font-bold text-lg"> Contributions </h2>{" "}
                  <p className="text-sm text-gray-500">
                    {" "}
                    328 contributions in the last year{" "}
                  </p>{" "}
                </div>{" "}
                <span className="text-sm text-pink-500 font-medium">
                  {" "}
                  2026{" "}
                </span>{" "}
              </div>{" "}
              {/* Contribution Grid */}{" "}
              <div className="overflow-x-auto">
                {" "}
                <div className="min-w-162.5">
                  {" "}
                  {/* Months */}{" "}
                  <div className="flex ml-7 mb-2 text-xs text-gray-400">
                    {" "}
                    <span className="w-20">Jan</span>{" "}
                    <span className="w-20">Feb</span>{" "}
                    <span className="w-20">Mar</span>{" "}
                    <span className="w-20">Apr</span>{" "}
                    <span className="w-20">May</span>{" "}
                    <span className="w-20">Jun</span>{" "}
                    <span className="w-20">Jul</span>{" "}
                    <span className="w-20">Aug</span>{" "}
                    <span className="w-20">Sep</span>{" "}
                  </div>{" "}
                  <div className="flex gap-1">
                    {" "}
                    {/* Week columns */}{" "}
                    {Array.from({ length: 40 }).map((_, column) => (
                      <div key={column} className="flex flex-col gap-1">
                        {" "}
                        {Array.from({ length: 7 }).map((_, row) => {
                          const level = Math.floor(Math.random() * 5);
                          return (
                            <div
                              key={row}
                              className={` w-3 h-3 rounded-sm ${level === 0 ? "bg-pink-50" : level === 1 ? "bg-pink-100" : level === 2 ? "bg-pink-200" : level === 3 ? "bg-pink-300" : "bg-pink-500"} `}
                            ></div>
                          );
                        })}{" "}
                      </div>
                    ))}{" "}
                  </div>{" "}
                  {/* Legend */}{" "}
                  <div className="flex justify-end items-center gap-2 mt-4 text-xs text-gray-400">
                    {" "}
                    Less <span className="w-3 h-3 rounded-sm bg-pink-50"></span>{" "}
                    <span className="w-3 h-3 rounded-sm bg-pink-100"></span>{" "}
                    <span className="w-3 h-3 rounded-sm bg-pink-200"></span>{" "}
                    <span className="w-3 h-3 rounded-sm bg-pink-300"></span>{" "}
                    <span className="w-3 h-3 rounded-sm bg-pink-500"></span>{" "}
                    More{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </main>{" "}
      </div>{" "}
    </div>
  );
};
/* ================= SIDEBAR ITEM ================= */ const SidebarItem = ({
  icon,
  text,
  active = false,
}) => {
  return (
    <button
      className={` w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${active ? "bg-pink-50 text-pink-600" : "text-gray-600 hover:bg-pink-50 hover:text-pink-500"} `}
    >
      {" "}
      {icon} {text}{" "}
    </button>
  );
};
/* ================= STAT CARD ================= */ const StatCard = ({
  icon,
  title,
  value,
}) => {
  return (
    <div className="bg-white border border-pink-100 rounded-2xl p-5">
      {" "}
      <div className="flex items-center justify-between">
        {" "}
        <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-pink-500">
          {" "}
          {icon}{" "}
        </div>{" "}
        <span className="text-xs text-gray-400"> +12% </span>{" "}
      </div>{" "}
      <p className="text-2xl font-bold mt-4"> {value} </p>{" "}
      <p className="text-sm text-gray-500 mt-1"> {title} </p>{" "}
    </div>
  );
};
/* ================= REPOSITORY CARD ================= */ const RepositoryCard =
  ({ name, description, language, stars, forks }) => {
    return (
      <div className="p-5 hover:bg-pink-50/40 transition">
        {" "}
        <div className="flex items-start justify-between gap-4">
          {" "}
          <div className="min-w-0">
            {" "}
            <div className="flex items-center gap-2">
              {" "}
              <Code2 size={17} className="text-pink-500" />{" "}
              <h3 className="font-semibold text-pink-600 hover:underline cursor-pointer">
                {" "}
                {name}{" "}
              </h3>{" "}
              <span className="text-xs border border-pink-200 text-pink-500 px-2 py-0.5 rounded-full">
                {" "}
                Public{" "}
              </span>{" "}
            </div>{" "}
            <p className="text-sm text-gray-500 mt-2"> {description} </p>{" "}
            <div className="flex items-center gap-5 mt-4 text-xs text-gray-500">
              {" "}
              <span className="flex items-center gap-1.5">
                {" "}
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span>{" "}
                {language}{" "}
              </span>{" "}
              <span className="flex items-center gap-1">
                {" "}
                <Star size={14} /> {stars}{" "}
              </span>{" "}
              <span className="flex items-center gap-1">
                {" "}
                <GitBranch size={14} /> {forks}{" "}
              </span>{" "}
            </div>{" "}
          </div>{" "}
          <button className="hidden sm:block px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium hover:bg-white">
            {" "}
            Star{" "}
          </button>{" "}
        </div>{" "}
      </div>
    );
  };
/* ================= ACTIVITY ================= */ const Activity = ({
  title,
  repo,
  time,
}) => {
  return (
    <div className="flex gap-3">
      {" "}
      <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
        {" "}
        <GitBranch size={15} className="text-pink-500" />{" "}
      </div>{" "}
      <div>
        {" "}
        <p className="text-sm text-gray-700">
          {" "}
          {title}{" "}
          <span className="font-semibold text-pink-500"> {repo} </span>{" "}
        </p>{" "}
        <p className="text-xs text-gray-400 mt-1"> {time} </p>{" "}
      </div>{" "}
    </div>
  );
};
export default Dashboard;
