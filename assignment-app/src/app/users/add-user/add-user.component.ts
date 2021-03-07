import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user'
import { Router } from '@angular/router';
import {UserService} from '../../services/user.service';
import {Image} from '../../models/image';
import { Role } from 'src/app/models/role';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  selectedFile:FileList;
  user: User = new User();
  role:Role=new Role();
  roles:Role[];
  src:Image=new Image();
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  imageSrc:String
  file:string;
  constructor(private _formBuilder: FormBuilder,private userService: UserService,private _snackBar: MatSnackBar,
    private router: Router) {}

  ngOnInit() {

    this.getRoles();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
       duration: 2000,
    });
 }

  saveUser(){
    this.userService.createUser(this.user).subscribe( data =>{
      this.goToUserList();
    },
    error => console.log(error));

  }

  goToUserList(){
    this.router.navigate(['/listUser']);  }


  onSubmit(){

    this.saveUser();
   // this.goToUserList();

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
           this.user.image=this.src;
         };

}

private getRoles(){
  this.userService.getRoles(localStorage.getItem('tok')).subscribe(data => {
    this.roles=data;
  });
}


disply(event:any){
  this.user.role=event;
 console.log(event);
}

}
