import { Type } from "typescript";

export class localStorageWorker {

  static add(key:string,item:any){
    localStorage.setItem(key,JSON.stringify(item));
  }

  static getById(key: string): any | null {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        const project: any = JSON.parse(item);
        return project;
      } catch (error) {
        console.error("Error parsing project from localStorage:", error);
        return null;
      }
    }
    return null;
  }

  static delete(key:string){
    localStorage.removeItem(key);
  }

  static getAllItems():Array<any>{
    var list = new Array<any>();

    for(var i =0;i<localStorage.length;i++){
      var key = localStorage.key(i);
      if(key != null){
        var value = localStorage.getItem(key);
        if(value != null){
          var item = JSON.parse(value)
          list.push(item);
        }
      }
    }
    return list;
  }
}