import Priority from "../enums/Priority";
import State from "../enums/State";

class userStoryType {
  static nextId = Math.random();
  id:number;
  name:string;
  description:string;
  priority: Priority;
  createdDate?: number;
  state: State;
  projectName: string;
  projectId?:string;
  type:string;

  constructor(name:string,description:string,priority:Priority,state:State,projectName:string,type:string){
    let date = new Date();
    this.id = userStoryType.nextId++;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.createdDate = date.getDate();
    this.state = state;
    this.projectName = projectName;
    this.type = type;
  }
}

export default userStoryType;