import { Pattient } from "./Pattient";

export class Family
{
  constructor(
    public name:string,
    public last_name:string,
    public type_document:string,
    public document:string,
    public phone:string,
    public eps:string,
    public pattient:Pattient
  ){}
}
