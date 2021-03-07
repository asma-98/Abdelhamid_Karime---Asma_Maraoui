import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { User } from 'src/app/models/user';
import{AuthService} from '../shared/auth.service';
import{Router ,ActivatedRoute} from"@angular/router"

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  user: User = new User();
  constructor( private loginService:AuthService,private route:Router) {

  }

  ngOnInit(): void {

  }


  onSubmit(){

    this.loginService.logIn(this.user).subscribe( data =>{

      localStorage.setItem('tok',data.Token);
      localStorage.setItem('role',data.Role);

      this.route.navigate(['/listAssignment']);



      // if(localStorage.getItem('validate')==null){

      //   localStorage.setItem('validate','ok');
      //   location.reload();
      // }
      // console.log(localStorage.getItem('rol')+"ooooooooooooooooooo")
      // if(data.access_token!=null){
      //   this.route.navigate(['/saleAdCreate']);
      // }
    },
    error => console.log(error));

      }

}
