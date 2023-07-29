import { Pattient } from "./Pattient";
import { Family } from "./family";
import { Doctor } from "./doctor";
import { Speciality } from "./speciality";
import { Status } from "./status";

export class Cite{
  constructor(
    public id : number,
    public name:string,
    public last_name:string,
    public type_document:string,
    public document:string,
    public phone:string,
    public eps:string,
    public speciality:Speciality,
    public status:Status,
    public doctor:Doctor,
    public date_cite:string,
    public hour_cite:string,
    public pattient:Pattient

  ){}
}
