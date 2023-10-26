export class Project {
  static id = 1;
  constructor(title, description, startDate, endDate, state) {
    this.id = `${Project.id++}`;
    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.state = state;
  }
}
