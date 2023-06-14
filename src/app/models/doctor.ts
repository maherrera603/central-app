import { Speciality } from "./speciality";

export class Doctor extends Speciality{
  constructor(
    public name:string,
    public lastname:string,
    public type_document:string,
    public document:string,
    public phone:string,
    public status:string,
    override speciality:string
  ){
    super(speciality);
  }
}
