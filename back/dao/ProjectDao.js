import fs from "fs";
import path from "path";

export class ProjectDao {
  constructor() {
    this.file = path.resolve("./data/project.json");
    this.projects = [];
  }

  readFile() {
    const file = fs.readFileSync(this.file, { encoding: "utf-8" });
    this.projects = JSON.parse(file);
  }

  writeFile() {
    fs.writeFileSync(this.file, JSON.stringify(this.projects));
  }

  getAll() {
    return this.projects;
  }

  getById(id) {
    const project = this.projects.find((project) => project.id === id);
    return project;
  }

  remove(id) {
    this.projects = this.projects.filter((project) => project.id !== id);
    this.writeFile();
  }

  edit(newProject) {
    const project = this.getById(newProject.id);
    if (!project) {
      return false;
    }
    project.title = newProject.title;
    project.description = newProject.description;
    project.endDate = newProject.endDate;
    project.startDate = newProject.startDate;
    project.state = newProject.state;
    this.writeFile();
    return true;
  }

  add(project) {
    this.projects.push(project);
    this.writeFile();
  }
}
