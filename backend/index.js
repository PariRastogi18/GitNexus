import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "./src/config/config.js";
import { connectDB } from "./src/config/database.js";
import authRouter from "./src/routes/auth.routes.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { init } from "./src/controllers/init.js";
import { add } from "./src/controllers/add.js";
import { commit } from "./src/controllers/commit.js";
import { push } from "./src/controllers/push.js";
import { pull } from "./src/controllers/pull.js";
import { revert } from "./src/controllers/revert.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

yargs(hideBin(process.argv))
  .command("init", "Initialize a new repository", {}, init)
  .command(
    "add <file>",
    "Add file to the repository",
    (yargs) => {
      yargs.positional("file", {
        type: "string",
        description: "File to add to staging area",
      });
    },
    add,
  )
  .command(
    "commit <message>",
    "Commit the staged file",
    (yargs) => {
      yargs.positional("message", {
        type: "string",
        description: "Commit massage",
      });
    },
    commit,
  )
  .command("push", "Push commits to GitNexus", {}, push)
  .command("pull", "Pull commits from GitNexus", {}, pull)
  .command(
    "revert <commitId>",
    "Revert to the specific commit",
    (yargs) => {
      yargs.positional("commitId", {
        type: "string",
        description: "Commit Id to revert to",
      });
    },
    revert,
  )
  .demandCommand(1, "You need write at least one command")
  .help().argv;

const { PORT } = config;

app.use("/api/auth", authRouter);

// connectDB();
// app.listen(PORT, () => {
//   console.log("Server running on port 5000");
// });
