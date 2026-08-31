import { supabase, BUCKET_NAME } from "../config/supabase-config.js";
import fs from "fs";
import path from "path";

const fsp = fs.promises;

export async function pull() {
  const repoPath = path.resolve(process.cwd(), ".gitNexus");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const { data: commitFolders, error: folderError } = await supabase.storage
      .from(BUCKET_NAME)
      .list("commits", { limit: 100 });

    if (folderError) {
      console.error("File listing error : ", folderError);
      return;
    }

    if (!commitFolders || commitFolders.length === 0) {
      console.log("No commit folder found in supabase storage!");
      return;
    }

    for (const folderObj of commitFolders) {
      const commitDirName = folderObj.name;
      const commitDirPath = path.join(commitsPath, commitDirName);

      await fsp.mkdir(commitDirPath, { recursive: true });

      const { data: files, error: filesError } = await supabase.storage
        .from(BUCKET_NAME)
        .list(`commits/${commitDirName}`);

      if (filesError) {
        console.error(
          `Error listing files for ${commitDirName}: `,
          filesError.message,
        );
        continue;
      }
      for (const fileObj of files) {
        const storageFilePath = `commits/${commitDirName}/${fileObj.name}`;

        const { data, error: downloadError } = await supabase.storage
          .from(BUCKET_NAME)
          .download(storageFilePath);

        if (downloadError) {
          console.error(
            `Error downloading ${fileObj.name}`,
            downloadError.message,
          );
          continue;
        }

        const buffer = Buffer.from(await data.arrayBuffer());
        const localFilePath = path.join(commitDirPath, fileObj.name);

        await fsp.writeFile(localFilePath, buffer);

        console.log("Pulled file successfully!");
      }
    }
    console.log("All commits pulled from Supabase.");
  } catch (error) {
    console.error(`Pull error : ${error.message}`);
  }
}
