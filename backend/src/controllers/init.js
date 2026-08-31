import fs from "fs";
import path from "path";

const fsp = fs.promises;

export async function init() {
  const repoPath = path.resolve(process.cwd(), ".gitNexus");
  const commitsPath = path.join(repoPath, "commits");

  try {
    await fsp.mkdir(repoPath, { recursive: true });
    await fsp.mkdir(commitsPath, { recursive: true });
    await fsp.writeFile(
      path.join(repoPath, "config.json"),
      JSON.stringify({ Bucket: "s3 bucket" }),
    );

    console.log("Repository Initialized!");
  } catch (error) {
    console.error("Repository initialization error", error);
  }
}
