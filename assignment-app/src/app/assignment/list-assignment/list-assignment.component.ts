import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Assignment } from 'src/app/models/assignment';
import { MatiereService } from 'src/app/services/matiere.service';
import {Matiere} from "../../models/matiere"
import {AssignmentService} from "../../services/assignment.service";
@Component({
  selector: 'app-list-assignment',
  templateUrl: './list-assignment.component.html',
  styleUrls: ['./list-assignment.component.css']
})
export class ListAssignmentComponent implements OnInit {

  assignment:Assignment=new Assignment();
  assignmentsNonRendue:Assignment[];
  assignmentsRendue:Assignment[];
  matiere:Matiere=new Matiere();
  selectedValue: string;
  selectedCar: string;
  constructor(private _formBuilder: FormBuilder,private assignmentService: AssignmentService,private matiereService: MatiereService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAssignment();

  }

  private getAssignment(){
    this.assignmentService.getAssignmentsList(localStorage.getItem('tok')).subscribe(data => {
      this.assignmentsNonRendue=data.NonRendu;
      this.assignmentsRendue=data.Rendu;
      console.log("ok");
    });
  }
  updateAssignment(id: number){

    this.router.navigate(['updateAssignment', id]);

  }
  async deleteAssignment(id: number){

    await  this.assignmentService.deleteAssignment(id).subscribe( data => {
      this.getAssignment();
    })
    console.log(id);

  }

}
