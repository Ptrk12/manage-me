import Priority from "../enums/Priority";
import State from "../enums/State";
import userType from "./userType";

class userStoryType {
  static nextId = 1;
  id:number;
  name:string;
  description:string;
  priority: Priority;
  createdDate?: number;
  state: State;
  createdBy: userType;

  constructor(name:string,description:string,priority:Priority,state:State,createdBy:userType){
    let date = new Date();
    this.id = userStoryType.nextId++;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.createdDate = date.getDate();
    this.state = state;
    this.createdBy = createdBy;
  }
}

export default userStoryType;