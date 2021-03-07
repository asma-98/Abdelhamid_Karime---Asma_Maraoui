import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Assignment } from 'src/app/models/assignment';
import { MatiereService } from 'src/app/services/matiere.service';
import {Matiere} from "../../models/matiere"
import {AssignmentService} from "../../services/assignment.service";
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})


export class AddAssignmentComponent implements OnInit {

  assignment:Assignment=new Assignment();
  matieres:Matiere[];
  matiere:Matiere=new Matiere();
  selectedValue: string;
  selectedCar: string;
  constructor(private _formBuilder: FormBuilder,private assignmentService: AssignmentService,private _snackBar: MatSnackBar,private matiereService: MatiereService,
    private router: Router) { }

  ngOnInit(): void {
    this.getMatieres();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
       duration: 2000,
    });
 }

  saveAssignment(){
    this.assignmentService.createAssignment(this.assignment).subscribe( data =>{

      this.goToAssignmentList();
    },
    error => console.log(error));
  }

  goToAssignmentList(){
    this.router.navigate(['/listAssignment']);
  }

  onSubmit(){
    console.log(this.assignment);
    this.saveAssignment();
    console.log(this.assignment);
  }

  private getMatieres(){
    this.matiereService.getMatieresList(localStorage.getItem('tok')).subscribe(data => {
      this.matieres=data;
      console.log(this.matieres[0]._id);
    });
  }
  disply(event:any){
    this.assignment.matiere=event;
    console.log(this.assignment.matiere)
 }



}
