import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {
  urlBase = 'http://localhost:8002/api-depot/historique/';
  urlSuite = '';

  constructor(
    private http: HttpClient
  ) { }

  historiqueClient(idClient: any){
    this.urlSuite = 'historiqueClient';
    return this.http.post(this.urlBase+this.urlSuite, {idClient: idClient});
  }

  listeVoiture(){
    this.urlSuite = 'voiture/liste';
    return this.http.get(this.urlBase + this.urlSuite);
  }

  proprietaireVoiture(idVoiture: any){
    this.urlSuite = 'ownerCar';
    return this.http.post(this.urlBase + this.urlSuite, {idVoiture: idVoiture});
  }

  listeReparation(idVoiture: any){
    this.urlSuite = 'detail';
    return this.http.post(this.urlBase + this.urlSuite, {idVoiture: idVoiture});
  }

}
