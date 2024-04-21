import UserRoles from "../enums/UserRoles";

class userType {
  static nextId = 1;
  id:number;
  username:string;
  surname:string;
  password:string;
  role:string;

  constructor(username:string, surname:string,password:string){
    this.id = userType.nextId++;
    this.username = username;
    this.surname = surname;
    this.password = password;
    this.role=UserRoles.Developer
  }
}

export default userType;