import userStoryType from "./userStoryType";

class projectType {
  static nextId = 1;

  id: number;
  projectId: string;
  projectName: string;
  projectDescription: string;
  isActive?:boolean = false;
  userStories?: userStoryType[];

  constructor(projectId: string, projectName: string, projectDescription: string) {
      this.id = projectType.nextId++;
      this.projectId = projectId;
      this.projectName = projectName;
      this.projectDescription = projectDescription;
      this.userStories = [];
  }
}

export default projectType;
