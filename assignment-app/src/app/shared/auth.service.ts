import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;
  private baseURL = "http://localhost:8010/api/user";

  constructor(private httpClient: HttpClient) { }

  logIn(user: User): Observable<{ Token:string,Role: string}>{
        return this.httpClient.post<{ Token:string,Role: string}>(`http://localhost:8010/api/user/login`, user);
      }
    // login

  logOut() {
    this.loggedIn = false;
  }

  // cette méthode renvoie une promesse (on devra traiter le résultat avec un then...)
  // la valeur renvoyé (qu'on récupèrera dans le then(val => {....}) est la valeur
  // de la propriété loggedIn. En gros, si on est loggué, on est admin...
  isAdmin(): Promise<any> {
    const isUserAdmin = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });

    return isUserAdmin;
  }
}
