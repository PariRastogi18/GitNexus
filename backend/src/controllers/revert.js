import fs from "fs";
import path from "path";
import { promisify } from "util";

const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

export async function revert(commitId) {
  const repoPath = path.resolve(process.cwd(), ".gitNexus");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitDir = path.resolve(commitsPath, commitId);
    const files = await readdir(commitDir);
    const parentDir = path.resolve(repoPath, "..");

    for (const file of files) {
      await copyFile(path.join(commitDir, file), path.join(parentDir, file));
    }

    console.log(`Commit ${commitId} revert successfully!`);
  } catch (error) {
    console.error("Unable to revert", error.message);
  }
}
