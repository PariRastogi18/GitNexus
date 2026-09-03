import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "./src/config/config.js";
import { connectDB, db } from "./src/config/database.js";
import authRouter from "./src/routes/auth.routes.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { init } from "./src/controllers/init.js";
import { add } from "./src/controllers/add.js";
import { commit } from "./src/controllers/commit.js";
import { push } from "./src/controllers/push.js";
import { pull } from "./src/controllers/pull.js";
import { revert } from "./src/controllers/revert.js";
import http from "http";
import { Server } from "socket.io";
import mainRouter from "./src/routes/mainRouter.js";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.send("Welcome!");
// });

const PORT = config.PORT;

yargs(hideBin(process.argv))
  .command("start", "server started successfully!", start)
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
    (argv) => {
      add(argv.file);
    },
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
    (argv) => {
      commit(argv.message);
    },
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
    (argv) => {
      revert(argv.commitId);
    },
  )
  .demandCommand(1, "You need write at least one command")
  .help().argv;

app.use("/api/auth", mainRouter);

function start() {
  connectDB();
  const user = "test";
  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    socket.on("joinRoom", (userId) => {
      user = userId;
      console.log("===");
      console.log(user);
      console.log("===");
      socket.join(user);
    });
  });

  db.once("open", async () => {
    console.log("CRUD operations called!");
  });

  httpServer.listen(PORT, () => {
    console.log("Server running on port 5000");
  });
}
