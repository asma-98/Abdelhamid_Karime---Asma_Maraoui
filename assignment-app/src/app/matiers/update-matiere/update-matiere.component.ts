import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Matiere} from '../../models/matiere'
import { ActivatedRoute, Router } from '@angular/router';
import {MatiereService} from '../../services/matiere.service';
import {Image} from '../../models/image';

@Component({
  selector: 'app-update-matiere',
  templateUrl: './update-matiere.component.html',
  styleUrls: ['./update-matiere.component.css']
})
export class UpdateMatiereComponent implements OnInit {

  matiere:Matiere=new Matiere();
  image=new Array<Image>();
  added:boolean=false;


  curentFile:File;
  imageSrc:String
  file:string;
  id: number;
  src:Image=new Image();;
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  constructor(private _formBuilder: FormBuilder,private matiereService: MatiereService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.matiereService.getMatiereById(this.id).subscribe(data => {
      this.matiere = data;
      this.src = this.matiere.image;
    },error => console.log(error));
  }

  onSubmit(){
   if(!this.added){
     this.matiere.image=this.src;
   }
    this.matiereService.updateMatiere(this.id, this.matiere).subscribe( data =>{
      this.goToMatiereList();
    }
    , error => console.log(error));


  }

selctFile(event:any):void{
  var reader=new FileReader();
  const[file]=event.target.files;
   reader.readAsDataURL(file);
   reader.onload=()=>{
     this.imageSrc = reader.result as string;
           this.myForm.patchValue({
             fileSource: reader.result
           });
           this.src.image=this.myForm.value.fileSource;
           this.matiere.image=this.src;

         };
         this.added=true;}
goToMatiereList(){
  this.router.navigate(['/listMatiere']);
}

}
