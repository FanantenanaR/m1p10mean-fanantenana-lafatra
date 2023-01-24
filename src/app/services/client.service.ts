import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient
  ) { }

  inscription(
    nom: string,
    prenom: string,
    dateNaissance: string,
    tel: string,
    email: string,
    adresse: string,
    numerocin: number,
    dateDelivrance: string,
    lieuDelivrance: string,
    login: string,
    mdp: string
  ) {
    const data = {
      nom,
      prenom,
      dateNaissance,
      tel,
      email,
      adresse,
      numerocin,
      dateDelivrance,
      lieuDelivrance,
      login,
      mdp,
    };
    const option = {
      "Content-Type": ""
    };
    return this.http.post(`${environment.baseURL}api-client/inscription`, data);
  }
}
