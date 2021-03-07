import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Assignment } from 'src/app/models/assignment';
import { MatiereService } from 'src/app/services/matiere.service';
import {Matiere} from "../../models/matiere"
import {AssignmentService} from "../../services/assignment.service";

@Component({
  selector: 'app-update-assignment',
  templateUrl: './update-assignment.component.html',
  styleUrls: ['./update-assignment.component.css']
})
export class UpdateAssignmentComponent implements OnInit {

  matieres:Matiere[];
  matiere:Matiere=new Matiere();
  id: number;
assignment: Assignment = new Assignment();
  constructor(private _formBuilder: FormBuilder,private assignmentService: AssignmentService,private route: ActivatedRoute,private  matiereService:MatiereService,
    private router: Router) { }


ngOnInit(): void {
  this.getMatieres();
  this.id = this.route.snapshot.params['id'];

  this.assignmentService.getAssignmentById(this.id).subscribe(data => {
    this.assignment = data;
  }, error => console.log(error));
}

onSubmit(){
  this.assignmentService.updateAssignment(this.id, this.assignment).subscribe( data =>{
    this.goToAssignmentList();
  }
  , error => console.log(error));
}
private getMatieres(){
  this.matiereService.getMatieresList(localStorage.getItem('tok')).subscribe(data => {
    this.matieres=data;
    console.log(this.matieres[0]._id);
  });
}

goToAssignmentList(){
  this.router.navigate(['/listAssignment']);
}


disply(event:any){
  this.assignment.matiere=event;
  console.log(this.assignment.matiere)
}

}
