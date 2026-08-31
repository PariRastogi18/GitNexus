import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
const fsp = fs.promises;

export async function commit(message) {
  const repoPath = path.resolve(process.cwd(), ".gitNexus");
  const stagingPath = path.join(repoPath, "staging");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitId = uuidv4();
    const commitDir = path.join(commitsPath, commitId);
    await fsp.mkdir(commitDir, { recursive: true });
    const files = await fsp.readdir(stagingPath);
    for (const file of files) {
      await fsp.cp(path.join(stagingPath, file), path.join(commitDir, file), {
        recursive: true,
      });
    }

    await fsp.writeFile(
      path.join(commitDir, "commit.json"),
      JSON.stringify({ message: message, date: new Date().toISOString() }),
    );

    console.log(`Commit ${commitId} created with message : ${message}`);
  } catch (error) {
    console.error("Error committing files", error);
  }
}
