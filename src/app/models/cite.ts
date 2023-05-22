import { Family } from "./family";

export class Cite extends Family{
  constructor(
    override name:string,
    override lastname:string,
    override type_document:string,
    override document:string,
    override phone:string,
    override eps:string,
    public speciality:string,
    public status:string,

  ){
    super(name, lastname, type_document, document, phone, eps)
  }
}
