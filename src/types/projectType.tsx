class projectType {
  static nextId = 1;

  id: number;
  projectId: string;
  projectName: string;
  projectDescription: string;
  isActive?:boolean = false;

  constructor(projectId: string, projectName: string, projectDescription: string) {
      this.id = projectType.nextId++;
      this.projectId = projectId;
      this.projectName = projectName;
      this.projectDescription = projectDescription;
  }
}

export default projectType;
