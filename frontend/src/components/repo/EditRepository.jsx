import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
export const EditRepository = () => {
  const { id } = useParams();
  const location = useLocation();
  const prevPath = location.state?.from;
  const [repoName, setRepoName] = useState("currency-converter");
  const [description, setDescription] = useState(
    "A simple currency converter project developed by Pari.",
  );
  const [visibility, setVisibility] = useState("public");
  const [issues, setIssues] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    const repoData = { repoName, description, visibility, issues };
    console.log(repoData);
    console.log(id);
  };
  return (
    <div className="min-h-screen bg-black text-white">
      {" "}
      {/* Header */}{" "}
      <div className="border-b border-zinc-800 px-6 py-4">
        {" "}
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {" "}
          <Link
            to={prevPath}
            className="text-zinc-400 hover:text-pink-500 transition"
          >
            {" "}
            ← Back to repositories{" "}
          </Link>{" "}
          <h1 className="text-xl font-semibold"> Edit repository </h1>{" "}
          <div className="w-36"></div>{" "}
        </div>{" "}
      </div>{" "}
      {/* Main */}{" "}
      <div className="max-w-3xl mx-auto px-6 py-10">
        {" "}
        <div className="mb-8">
          {" "}
          <h2 className="text-2xl font-semibold"> Repository settings </h2>{" "}
          <p className="text-zinc-400 mt-2">
            {" "}
            Update your repository information and settings.{" "}
          </p>{" "}
        </div>{" "}
        <form onSubmit={handleSubmit}>
          {" "}
          {/* Repository name */}{" "}
          <div className="border border-zinc-800 rounded-lg p-6 mb-5">
            {" "}
            <label className="block text-sm font-medium mb-2">
              {" "}
              Repository name{" "}
            </label>{" "}
            <input
              type="text"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-md px-4 py-3 outline-none focus:border-pink-500 transition"
              placeholder="Repository name"
            />{" "}
            <p className="text-sm text-zinc-500 mt-2">
              {" "}
              A repository name can contain letters, numbers, hyphens and
              underscores.{" "}
            </p>{" "}
          </div>{" "}
          {/* Description */}{" "}
          <div className="border border-zinc-800 rounded-lg p-6 mb-5">
            {" "}
            <label className="block text-sm font-medium mb-2">
              {" "}
              Description{" "}
            </label>{" "}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full bg-zinc-950 border border-zinc-700 rounded-md px-4 py-3 outline-none resize-none focus:border-pink-500 transition"
              placeholder="Describe your repository"
            />{" "}
            <p className="text-sm text-zinc-500 mt-2">
              {" "}
              A short description helps people understand your project.{" "}
            </p>{" "}
          </div>{" "}
          {/* Visibility */}{" "}
          <div className="border border-zinc-800 rounded-lg p-6 mb-5">
            {" "}
            <h3 className="font-medium mb-4"> Repository visibility </h3>{" "}
            <div className="space-y-4">
              {" "}
              {/* Public */}{" "}
              <label className="flex items-start gap-3 cursor-pointer">
                {" "}
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={visibility === "public"}
                  onChange={(e) => setVisibility(e.target.value)}
                  className="mt-1 accent-pink-500"
                />{" "}
                <div>
                  {" "}
                  <p className="font-medium"> Public </p>{" "}
                  <p className="text-sm text-zinc-500">
                    {" "}
                    Anyone can see this repository.{" "}
                  </p>{" "}
                </div>{" "}
              </label>{" "}
              {/* Private */}{" "}
              <label className="flex items-start gap-3 cursor-pointer">
                {" "}
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={visibility === "private"}
                  onChange={(e) => setVisibility(e.target.value)}
                  className="mt-1 accent-pink-500"
                />{" "}
                <div>
                  {" "}
                  <p className="font-medium"> Private </p>{" "}
                  <p className="text-sm text-zinc-500">
                    {" "}
                    Only you can see this repository.{" "}
                  </p>{" "}
                </div>{" "}
              </label>{" "}
            </div>{" "}
          </div>{" "}
          {/* Issues */}{" "}
          <div className="border border-zinc-800 rounded-lg p-6 mb-5">
            {" "}
            <div className="flex items-center justify-between">
              {" "}
              <div>
                {" "}
                <h3 className="font-medium"> Issues </h3>{" "}
                <p className="text-sm text-zinc-500 mt-1">
                  {" "}
                  Enable issues for this repository.{" "}
                </p>{" "}
              </div>{" "}
              <button
                type="button"
                onClick={() => setIssues(!issues)}
                className={`relative w-12 h-6 rounded-full transition ${issues ? "bg-pink-500" : "bg-zinc-700"}`}
              >
                {" "}
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${issues ? "left-7" : "left-1"}`}
                ></span>{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
          {/* Save section */}{" "}
          <div className="border border-zinc-800 rounded-lg p-6 flex items-center justify-between">
            {" "}
            <div>
              {" "}
              <p className="font-medium"> Save repository changes </p>{" "}
              <p className="text-sm text-zinc-500 mt-1">
                {" "}
                Your repository settings will be updated.{" "}
              </p>{" "}
            </div>{" "}
            <div className="flex gap-3">
              {" "}
              <Link
                to={prevPath}
                className="px-5 py-2.5 border border-zinc-700 rounded-md text-sm hover:bg-zinc-900 transition"
              >
                {" "}
                Cancel{" "}
              </Link>{" "}
              <button
                type="submit"
                className="px-5 py-2.5 bg-pink-500 hover:bg-pink-600 text-black font-medium rounded-md transition"
              >
                {" "}
                Save changes{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
};
