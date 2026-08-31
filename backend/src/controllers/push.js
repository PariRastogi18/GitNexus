import fs from "fs";
import path from "path";
import { supabase, BUCKET_NAME } from "../config/supabase-config.js";
const fsp = fs.promises;

export async function push() {
  const repoPath = path.resolve(process.cwd(), ".gitNexus");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitsDir = await fsp.readdir(commitsPath);
    for (const commitDir of commitsDir) {
      const commitPath = path.join(commitsPath, commitDir);
      const files = await fsp.readdir(commitPath);

      for (const file of files) {
        const filePath = path.join(commitPath, file);
        const fileContent = await fsp.readFile(filePath);

        const bucketPath = `commits/${commitDir}/${file}`;

        const { data, error } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(bucketPath, fileContent, { upsert: true });

        if (error) {
          console.error(`Failed to upload ${file}`, error.message);
        } else {
          console.log(`${file} uploaded successfully!`);
        }
      }
    }
  } catch (error) {
    console.error("Push error", error.message);
  }
}
