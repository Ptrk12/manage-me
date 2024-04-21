import { Type } from "typescript";
import axios from "axios";

export class localStorageWorker {

  static add(key:string,item:any){
    localStorage.setItem(key,JSON.stringify(item));
  }

  static getById(key: string | undefined): any | null {
    if(key != undefined){
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
  }

  static delete(key:string){
    localStorage.removeItem(key);
  }

  static getAllItems(): Array<any> {
    const list = new Array<any>();
  
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      console.log(`Processing key: ${key}`); // Log the key being processed
      if (key !== null && key !== "token") {
        const value = localStorage.getItem(key);
        console.log(`Value for ${key}: ${value}`); // Log the value
        if (value !== null) {
          try {
            const item = JSON.parse(value);
            list.push(item);
          } catch (e) {
            console.error(`Error parsing JSON from localStorage at key '${key}':`, e);
          }
        }
      }
    }
    return list;
  }
  
}