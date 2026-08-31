import fs from "fs";
import path from "path";

const fsp = fs.promises;

export async function add(filePath) {
  const repoPath = path.resolve(process.cwd(), ".gitNexus");
  const stagingPath = path.join(repoPath, "staging");

  try {
    await fsp.mkdir(stagingPath, { recursive: true });
    const fileName = path.basename(filePath);
    await fsp.copyFile(filePath, path.join(stagingPath, fileName));
    console.log(`File ${fileName} is added in staging area`);
  } catch (error) {
    console.error("Staging file error : ", error);
  }
}
