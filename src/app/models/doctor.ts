import { Speciality } from "./speciality";

export class Doctor{
  constructor(
    public id:number,
    public name:string,
    public last_name:string,
    public type_document:string,
    public document:string,
    public phone:string,
    public status:number,
    public speciality:Speciality
  ){
  }
}
