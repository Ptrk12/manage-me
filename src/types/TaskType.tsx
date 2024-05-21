import Priority from "../enums/Priority";
import State from "../enums/State";

class TaskType {
  static nextId = Math.random();
  id:number
  description:string;
  name:string;
  projectName: string;
  startDate?: number | null;
  endDate?: number | null;
  startDateDate?:Date | null;
  endDateDate?:Date | null;
  workHours: number;
  assigner: string;
  priority:Priority;
  userStoryId: string;
  projectId:string;
  state:State;
  type:string;

  constructor(description:string,projectName:string,startDate:number,workHours:number,assigner:string,name:string,
    priority:Priority,userStoryId:string,state:State,projectId:string,type:string){
    let date = new Date();
    this.id = TaskType.nextId++;
    this.description = description;
    this.projectName = projectName;
    this.startDate = startDate;
    this.workHours = workHours;
    this.assigner = assigner;
    this.name = name;
    this.priority = priority;
    this.userStoryId = userStoryId;
    this.state = state;
    this.projectId = projectId;
    this.type = type;
  }
}

export default TaskType;