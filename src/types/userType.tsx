class userType {
  static nextId = 1;
  id:number;
  username:string;
  surname:string;

  constructor(username:string, surname:string){
    this.id = userType.nextId++;
    this.username = username;
    this.surname = surname;
  }
}

export default userType;