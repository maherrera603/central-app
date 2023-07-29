import { Employee } from "./employee";

export class Speciality {
  constructor(
    public id:number,
    public speciality:string,
    public employee:Employee
  ){}
}
