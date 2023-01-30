import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepotserviceService {
  urlBase = 'http://localhost:8002/api/depot/';
  urlSuite = '';

  constructor(private http: HttpClient) { }

  /**
   * inserttion dans "depot", dateHeure: default now
   */
  enregistrementDepotVoiture(plaque: any, nom: any, prenom: any, tel: any, email:any, rNom: any, rPrenom: any, rTel: any, rMail: any){
    this.urlSuite = 'enregistrementDepot';
    return this.http.post(this.urlBase+this.urlSuite, {plaque: plaque, nom: nom, prenom: prenom, tel: tel, email: email, rNom: rNom, rPrenom: rPrenom, rTel: rTel, rMail: rMail});
  }

  getListeDepot(){
    this.urlSuite = '';
    return this.http.get(this.urlBase+this.urlSuite);
  }

  getDetailsDepot(idDepot: string){
    this.urlSuite = 'detailsDepot';
    const data = {
      idDepot: idDepot
    };
    return this.http.post(this.urlBase+this.urlSuite, data);
  }

  getListReparation(idDepot: string){
    this.urlSuite = 'listeReparation';
    const data = {
      idDepot: idDepot
    };
    return this.http.post(this.urlBase+this.urlSuite, data);
  }

  getListReparationNonEntamer(idDepot: string){
    this.urlSuite = 'listeReparationNonEntamer';
    const data = {
      idDepot: idDepot
    };
    return this.http.post(this.urlBase+this.urlSuite, data);
  }

  getListReparationEncours(idDepot: string){
    this.urlSuite = 'listeReparationEncours';
    const data = {
      idDepot: idDepot
    };
    return this.http.post(this.urlBase+this.urlSuite, data);
  }

  getListReparationTermine(idDepot: string){
    this.urlSuite = 'listeReparationTermine';
    const data = {
      idDepot: idDepot
    };
    return this.http.post(this.urlBase+this.urlSuite, data);
  }

  ajouterReparation(libelle: any, prix: any, idDepot: string, updateIfExiste: boolean) {
    this.urlSuite = 'ajouterReparation';
    const data = {
      idDepot: idDepot,
      aReparer: libelle,
      prix: prix,
      updateIfExiste: updateIfExiste
    };
    return this.http.post(this.urlBase+this.urlSuite, data);
  }

  assignerResponsable(idReparation: string, idResponsable: string) {
    this.urlSuite = 'assignerReparation';
    const data = {
      idResponsable: idResponsable,
      idReparation: idReparation
    };
    return this.http.post(this.urlBase+this.urlSuite, data);
  }

  entamerReparation(idReparation: string) {
    this.urlSuite = 'entamerReparation';
    const data = {
      idReparation: idReparation
    };
    return this.http.post(this.urlBase+this.urlSuite, data);
  }

  getResponsable() {
    this.urlSuite = 'listerResponsable';
    return this.http.get(this.urlBase+this.urlSuite);
  }

}
