import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Matiere} from '../../models/matiere'
import { Router } from '@angular/router';
import {MatiereService} from '../../services/matiere.service';
import {Image} from '../../models/image';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-matiere',
  templateUrl: './add-matiere.component.html',
  styleUrls: ['./add-matiere.component.css']
})
export class AddMatiereComponent implements OnInit {
  durationInSeconds = 5;
  selectedFile:FileList;
  matiere: Matiere = new Matiere();
  src:Image=new Image();
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  imageSrc:String
  file:string;
  constructor(private _formBuilder: FormBuilder,private matiereService: MatiereService,private _snackBar: MatSnackBar,
    private router: Router) {}

  ngOnInit() {

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
       duration: 2000,
    });
 }
  saveMatiere(){

    this.matiereService.createMatiere(this.matiere).subscribe( data =>{
      this.goToMatiereList();
    },
    error => console.log(error));
  }

  goToMatiereList(){
    this.router.navigate(['listMatiere']);  }


  onSubmit(){
    this.saveMatiere();
  }

selctFile(event:any):void{
  console.log("ok");
  var reader=new FileReader();
   const[file]:any=event.target.files;
    reader.readAsDataURL(file);
   reader.onload=()=>{
     this.imageSrc = reader.result as string;
           this.myForm.patchValue({
             fileSource: reader.result
           });
           this.src.image=this.myForm.value.fileSource
           this.matiere.image=this.src;
          console.log( this.matiere.image.image)
         };

}
}
