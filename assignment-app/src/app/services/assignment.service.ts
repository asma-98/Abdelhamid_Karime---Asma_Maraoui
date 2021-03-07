import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Assignment } from '../models/assignment';
@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  private baseURL = "http://localhost:8010/api/assignments";

  constructor(private httpClient: HttpClient) { }

  getAssignmentsList(a:any): Observable<{NonRendu:Assignment[],Rendu:Assignment[]}>{

    const httpHeaders=new HttpHeaders ({'auth-token':`${localStorage.getItem('tok')}`});
    return this.httpClient.get<{NonRendu:Assignment[],Rendu:Assignment[]}>(`${this.baseURL}`,{headers:httpHeaders});
  }

  createAssignment(assignment: Assignment): Observable<Assignment>{
    const httpHeaders=new HttpHeaders ({'auth-token':`${localStorage.getItem('tok')}`});
    return this.httpClient.post<Assignment>(`http://localhost:8010/api/assignments`, assignment,{headers:httpHeaders});
  }

  getAssignmentById(id: number): Observable<Assignment>{

    const httpHeaders=new HttpHeaders ({'auth-token':`${localStorage.getItem('tok')}`});
    return this.httpClient.get<Assignment>(`http://localhost:8010/api/assignments/${id}`,{headers:httpHeaders});
  }

  updateAssignment(id: number, assignment: Assignment): Observable<Assignment>{
    const httpHeaders=new HttpHeaders ({'auth-token':`${localStorage.getItem('tok')}`});
    return this.httpClient.put<Assignment>(`http://localhost:8010/api/assignments/${id}`, assignment,{headers:httpHeaders});
  }

  deleteAssignment(id: number): Observable<Object>{
    const httpHeaders=new HttpHeaders ({'auth-token':`${localStorage.getItem('tok')}`});
    return this.httpClient.delete(`${this.baseURL}/${id}`,{headers:httpHeaders});
  }


  login(assignment: Assignment): Observable<Assignment>{
    // const httpHeaders=new HttpHeaders ({'Auth-Token':`${localStorage.getItem('tok')}`});
     return this.httpClient.post<Assignment>(` http://localhost:8010/api/assignment/login`, assignment);//,{headers:httpHeaders});
   }


  getMatiersPagine(
    nextPage: Number = 1,
    limit: Number = 10
  ): Observable<Object> {
    let urlPagination =  `http://localhost:8010/api/assignment?page=${nextPage}&limit=${limit}`;

    console.log('Requête paginée envoyée : ' + urlPagination);
    return this.httpClient.get<Object>(urlPagination);
  }
}
