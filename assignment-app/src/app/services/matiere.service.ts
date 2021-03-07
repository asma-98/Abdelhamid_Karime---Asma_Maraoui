import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Matiere } from '../models/matiere';
@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  private baseURL = "http://localhost:8010/api/matier";

  constructor(private httpClient: HttpClient) { }

  getMatieresList(a:any): Observable<Matiere[]>{

  //  const httpHeaders=new HttpHeaders ({'Auth-Token':`${a}`})
  const httpHeaders=new HttpHeaders ({'auth-token':`${localStorage.getItem('tok')}`});
  console.log(localStorage.getItem('tok'))
    return this.httpClient.get<Matiere[]>(`${this.baseURL}`,{headers:httpHeaders});
  }

  createMatiere(matiere: Matiere): Observable<Matiere>{
   // const httpHeaders=new HttpHeaders ({'Auth-Token':`${localStorage.getItem('tok')}`});
    return this.httpClient.post<Matiere>(`${this.baseURL}`, matiere);//,{headers:httpHeaders});
  }

  getMatiereById(id: number): Observable<Matiere>{

    //const httpHeaders=new HttpHeaders ({'Auth-Token':`${localStorage.getItem('tok')}`})
    return this.httpClient.get<Matiere>(`http://localhost:8010/api/matier/${id}`);//,{headers:httpHeaders});
  }

  updateMatiere(id: number, matiere: Matiere): Observable<Matiere>{
   // const httpHeaders=new HttpHeaders ({'Auth-Token':`${localStorage.getItem('tok')}`})
    return this.httpClient.put<Matiere>(`http://localhost:8010/api/matier/${id}`, matiere);//,{headers:httpHeaders});
  }

  deleteMatiere(id: number): Observable<Object>{
   // const httpHeaders=new HttpHeaders ({'Auth-Token':`${localStorage.getItem('tok')}`})
    return this.httpClient.delete(`http://localhost:8010/api/matier/${id}`);//,{headers:httpHeaders});
  }




  getMatiersPagine(
    nextPage: Number = 1,
    limit: Number = 10
  ): Observable<Object> {
    let urlPagination =  `http://localhost:8010/api/matier?page=${nextPage}&limit=${limit}`;

    console.log('Requête paginée envoyée : ' + urlPagination);
    return this.httpClient.get<Object>(urlPagination);
  }
}
