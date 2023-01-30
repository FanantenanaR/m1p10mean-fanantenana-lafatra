import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortieService {
  urlBase = 'http://localhost:8002/api-sortie/';
  urlSuite = '';

  constructor(
    private http: HttpClient
  ) { }

  listeVoitureDeposee(){
    this.urlSuite = 'voituredepose';
    return this.http.get(this.urlBase+this.urlSuite);
  }

  listeDetailVoitureDeposee(idDepot: any){
    this.urlSuite = 'detailVoitureDeposee';
    return this.http.post(this.urlBase+this.urlSuite, {idDepot});
  }

  validationSortie(idDepot: any, pNom: any, pPrenom: any, pTel: any, rNom: any, rPrenom: any, rTel: any, rEmail: any){
   this.urlSuite = 'validationSortie';
   return this.http.post(this.urlBase+this.urlSuite, {idDepot, pNom, pPrenom, pTel, rNom, rPrenom, rTel, rEmail})
  }
}
