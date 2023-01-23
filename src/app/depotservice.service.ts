import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepotserviceService {
  urlBase = 'http://localhost:3000/depot/';
  urlSuite = '';

  constructor(private http: HttpClient) { }

  enregistrementDepotVoiture(plaque: any, nom: any, prenom: any, tel: any, email:any, rNom: any, rPrenom: any, rTel: any, rMail: any){
    this.urlSuite = 'enregistrementDepot';
    this.http.post(this.urlBase+this.urlSuite, {plaque: plaque, nom: nom, prenom: prenom, tel: tel, email: email, rNom: rNom, rPrenom: rPrenom, rTel: rTel, rMail: rMail});
  }
}
