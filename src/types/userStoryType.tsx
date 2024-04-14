import Priority from "../enums/Priority";
import State from "../enums/State";
import TaskType from "./TaskType";
import userType from "./userType";

class userStoryType {
  static nextId = Math.random();
  id:number;
  name:string;
  description:string;
  priority: Priority;
  createdDate?: number;
  state: State;
  createdBy: userType;
  projectName: string;
  projectId?:string;
  type:string;

  constructor(name:string,description:string,priority:Priority,state:State,createdBy:userType,projectName:string,type:string){
    let date = new Date();
    this.id = userStoryType.nextId++;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.createdDate = date.getDate();
    this.state = state;
    this.createdBy = createdBy;
    this.projectName = projectName;
    this.type = type;
  }
}

export default userStoryType;