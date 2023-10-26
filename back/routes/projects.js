import { ProjectDao } from "../dao/ProjectDao.js";
import express from "express";
import { Project } from "../model/Project.js";
import cors from "cors";

const projectDao = new ProjectDao();
const projects = express.Router();
projects.use(express.json());
projects.use(cors());

projects.get("/", (req, res) => {
  res.send(projectDao.getAll());
});

projects.get("/:id", (req, res) => {
  const project = projectDao.getById(req.params.id);
  if (project) {
    res.send(project);
  } else {
    res.sendStatus(404);
  }
});

projects.delete("/:id", (req, res) => {
  const project = projectDao.getById(req.params.id);
  if (project) {
    projectDao.remove(req.params.id);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

projects.put("/:id", (req, res) => {
  const newProject = req.body;
  const isUpdate = projectDao.edit(newProject);
  if (isUpdate) {
    res.send(newProject);
  } else {
    res.sendStatus(404);
  }
});

projects.post("/", (req, res) => {
  const { title, description, startDate, endDate, state } = req.body;
  let project = new Project(title, description, startDate, endDate, state);
  projectDao.add(project);
  res.sendStatus(201);
});

export default projects;
