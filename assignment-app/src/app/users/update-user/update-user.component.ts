import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user'
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from '../../services/user.service';
import {Image} from '../../models/image';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  user:User=new User();
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
  constructor(private _formBuilder: FormBuilder,private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.userService.getUserById(this.id).subscribe(data => {
      this.user = data;
      this.src = this.user.image;
    },error => console.log(error));
  }

  onSubmit(){
   if(!this.added){
     this.user.image=this.src;
   }
    this.userService.updateUser(this.id, this.user).subscribe( data =>{
      this.goToUserList();
      console.log(data);
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
           this.user.image=this.src;

         };
         this.added=true;}
goToUserList(){
  this.router.navigate(['/listUser']);
}

}
