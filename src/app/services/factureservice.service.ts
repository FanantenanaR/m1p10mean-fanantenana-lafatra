import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FactureserviceService {
  urlBase = 'http://localhost:8002/api-facture/';
  urlSuite = ''

  constructor(
    private http: HttpClient
  ) { }

  listeVoitureClient(idClient: any){
    this.urlSuite = 'listeVoiture';
    return this.http.post(this.urlBase + this.urlSuite, { idClient: idClient });
  }

  listeDepotVoiture(idVoiture: any){
    this.urlSuite = 'depotVoiture';
    return this.http.post(this.urlBase + this.urlSuite, { idVoiture });
  }

  consultationFactureDepot(idDepot: any){
    this.urlSuite = 'factureDepot';
    return this.http.post(this.urlBase + this.urlSuite, {idDepot});
  }

  listeFactureNonPayer(){
    this.urlSuite = 'factureNonPayer';
    return this.http.get(this.urlBase + this.urlSuite);
  }

  detailFacture(idFacture: any){
    this.urlSuite = 'factureDetail';
    return this.http.post(this.urlBase + this.urlSuite, {idFacture});
  }

  payerFacture(montant: any, idFacture: any, idPersonnel: any){
    this.urlSuite = 'payer';
    return this.http.post(this.urlBase + this.urlSuite, {montant, idFacture, idPersonnel});
  }

  proposPaiement(idFacture: any){
    this.urlSuite = 'allAboutPaiement';
    return this.http.post(this.urlBase + this.urlSuite, {idFacture});
  }
}
