import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Role } from '../models/role';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = "http://localhost:8010/api/user";

  constructor(private httpClient: HttpClient) { }

  getUsersList(a:any): Observable<User[]>{

  //  const httpHeaders=new HttpHeaders ({'Auth-Token':`${a}`})
    return this.httpClient.get<User[]>(`${this.baseURL}`);//,{headers:httpHeaders});
  }
  getRoles(a:any): Observable<Role[]>{

    //  const httpHeaders=new HttpHeaders ({'Auth-Token':`${a}`})
      return this.httpClient.get<Role[]>(`http://localhost:8010/api/role`);//,{headers:httpHeaders});
    }
  createUser(user: User): Observable<User>{
   // const httpHeaders=new HttpHeaders ({'Auth-Token':`${localStorage.getItem('tok')}`});
    return this.httpClient.post<User>(`http://localhost:8010/api/user`, user);//,{headers:httpHeaders});
  }

  getUserById(id: number): Observable<User>{

    //const httpHeaders=new HttpHeaders ({'Auth-Token':`${localStorage.getItem('tok')}`})
    return this.httpClient.get<User>(`http://localhost:8010/api/user/${id}`);//,{headers:httpHeaders});
  }

  updateUser(id: number, user: User): Observable<User>{
   // const httpHeaders=new HttpHeaders ({'Auth-Token':`${localStorage.getItem('tok')}`})
    return this.httpClient.put<User>(`http://localhost:8010/api/user/${id}`, user);//,{headers:httpHeaders});
  }

  deleteUser(id: number): Observable<Object>{
   // const httpHeaders=new HttpHeaders ({'Auth-Token':`${localStorage.getItem('tok')}`})
    return this.httpClient.delete(`http://localhost:8010/api/user/${id}`);//,{headers:httpHeaders});
  }


  login(user: User): Observable<User>{
    // const httpHeaders=new HttpHeaders ({'Auth-Token':`${localStorage.getItem('tok')}`});
     return this.httpClient.post<User>(` http://localhost:8010/api/user/login`, user);//,{headers:httpHeaders});
   }


  getMatiersPagine(
    nextPage: Number = 1,
    limit: Number = 10
  ): Observable<Object> {
    let urlPagination =  `http://localhost:8010/api/user?page=${nextPage}&limit=${limit}`;

    console.log('Requête paginée envoyée : ' + urlPagination);
    return this.httpClient.get<Object>(urlPagination);
  }
}
