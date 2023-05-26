import { Family } from "./family";

export class Cite extends Family{
  constructor(
    public id : number,
    override name:string,
    override lastname:string,
    override type_document:string,
    override document:string,
    override phone:string,
    override eps:string,
    public speciality:string,
    public status:string,
    public id_speciality:string,
    public doctor:string,
    public id_status:string,
    public date:string,
    public hour:string

  ){
    super(name, lastname, type_document, document, phone, eps)
  }
}
