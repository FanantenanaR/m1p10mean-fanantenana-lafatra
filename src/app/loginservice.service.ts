import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  urlBase = 'http://localhost:3000/';
  urlSuite = '';

  constructor(private http: HttpClient) { }

  /**
   * service login client
   */
  loginClient(login: any, mdp: any){
    this.urlSuite = 'loginClient';
    return this.http.post(this.urlBase+this.urlSuite, {login: login, mdp: mdp});
  }

  /**
   * service login responsable
   */
  loginResponsable(login: any, mdp: any){
    this.urlSuite = 'loginPersonnel';
    return this.http.post(this.urlBase+this.urlSuite, {login: login, mdp: mdp});
  }

}
