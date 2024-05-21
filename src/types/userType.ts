// userType.ts

import UserRoles from "../enums/UserRoles";

class userType {
  static nextId = 1;
  id: number;
  username: string;
  surname: string;
  password: string;
  role: string;

  constructor(username: string, surname: string, password: string) {
    this.id = userType.nextId++;
    this.username = username;
    this.surname = surname;
    this.password = password;
    this.role = UserRoles.Developer;
  }

  toPlainObject() {
    return {
      id: this.id,
      username: this.username,
      surname: this.surname,
      password: this.password,
      role: this.role
    };
  }
}

export default userType;
