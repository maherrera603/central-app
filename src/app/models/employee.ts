import { User } from "./User";

export class Employee {
  constructor(
    public name:string,
    public last_name:string,
    public type_document:string,
    public document:string,
    public phone:string,
    public user: User
  ){}
}
