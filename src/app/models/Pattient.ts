import { User } from "./User";

export class Pattient extends User{
  constructor(
    public name:string,
    public lastname:string,
    public type_document:string,
    public document:string,
    public phone:string,
    public eps:string,
    override email:string,
    override password:string
  ){
    super(email, password);
  }
}
