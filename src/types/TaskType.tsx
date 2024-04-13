import Priority from "../enums/Priority";

class TaskType {
  static nextId = Math.random();
  id:number
  data:string;
  name:string;
  projectName: string;
  startDate: number;
  endDate?: number;
  workHours: number;
  assigner: string;
  priority:Priority;
  userStoryId: string;

  constructor(data:string,projectName:string,startDate:number,workHours:number,assigner:string,name:string,priority:Priority,userStoryId:string){
    let date = new Date();
    this.id = TaskType.nextId++;
    this.data = data;
    this.projectName = projectName;
    this.startDate = startDate;
    this.workHours = workHours;
    this.assigner = assigner;
    this.name = name;
    this.priority = priority;
    this.userStoryId = userStoryId;
  }
}

export default TaskType;