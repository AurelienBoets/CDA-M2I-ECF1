import express from "express";
import projects from "./routes/projects.js";
import cors from "cors";

const app = express();
app.use("/projects", projects);
app.use(express.json());

app.listen("3000", () => {
  console.log("run at http://127.0.0.1:3000");
});
