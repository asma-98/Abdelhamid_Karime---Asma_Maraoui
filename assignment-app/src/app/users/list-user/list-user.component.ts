import { Component,NgZone, OnInit ,ViewChild,NgModule} from '@angular/core';
import {User} from '../../models/user'
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {UserService} from '../../services/user.service';



@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: User[];
  page: Number;
  nextPage: Number = 1;
  limit: Number = 10;
  countAssignments: Number;

  constructor(private userService: UserService,
    private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.getUsers();
  // this.getAssignments();
  }

  private getUsers(){
    this.userService.getUsersList(localStorage.getItem('tok')).subscribe(data => {
      this.users=data;
      console.log(data)

    });
  }

  userDetails(id: number){
    this.router.navigate(['userDetails',id]);
  }

  updateUser(id: number){

    this.router.navigate(['updateUser', id]);

  }

  deleteUser(id: number){


    this.userService.deleteUser(id).subscribe( data => {
      this.getUsers();
    })

  }

}
