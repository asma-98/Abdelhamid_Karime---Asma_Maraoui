import { Matiere } from "./matiere";
import { User } from "./user";

export class Assignment {
  _id:string;
  dateDeRendu:Date;
  nom:string;
  rendu: boolean;
  matiere:Matiere;
  prof:User;
  note:number;
  remarques:string;

}
