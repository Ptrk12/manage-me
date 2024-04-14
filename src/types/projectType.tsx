import userStoryType from "./userStoryType";

class projectType {
  static nextId = Math.random();

  id: number;
  projectId: string;
  projectName: string;
  projectDescription: string;
  isActive?:boolean = false;
  userStories?: userStoryType[];
  type:string;

  constructor(projectId: string, projectName: string, projectDescription: string,type:string) {
      this.id = projectType.nextId++;
      this.projectId = projectId;
      this.projectName = projectName;
      this.projectDescription = projectDescription;
      this.userStories = [];
      this.type = type;
  }
}

export default projectType;
