import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FactureserviceService } from '../services/factureservice.service';

@Component({
  selector: 'app-responsablefacturedetail',
  templateUrl: './responsablefacturedetail.component.html',
  styleUrls: ['./responsablefacturedetail.component.css']
})
export class ResponsablefacturedetailComponent implements OnInit {
  public userForm: FormGroup;
  montant: number = 0;

  constructor(private factureService: FactureserviceService, private route: ActivatedRoute, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      montant: ''
    });
  }

  ngOnInit(): void {
    this.getdetailFacture();
    this.voirPaiement();
  }

  idDepot = this.route.snapshot.paramMap.get('idDepot');
  idFacture = this.route.snapshot.paramMap.get('idFacture');

  idPersonnel = localStorage.getItem('idResponsable');

  facture: any;
  detailFacture: any;
  voiture: any;
  depot: any;

  statusPaiement: any;
  detailPaiement: any;
  total = 0;

  getdetailFacture(){
    this.factureService.consultationFactureDepot(this.idDepot).subscribe(
      (data: any) => {
        this.depot = data.proposDepot;
        this.voiture = data.proposVoiture;
        this.facture = data.message;
        this.detailFacture = data.message[0].detailFacture;
      }
    )
  }

  ajouterPaiement(){
    this.montant = this.userForm.get('montant')?.value;
    this.factureService.payerFacture(this.montant, this.idFacture, this.idPersonnel).subscribe(
      (data: any): void => {
          window.location.href = "responsableFacture/facture/"+this.idFacture+"/"+this.idDepot;
        }
    )
  }

  voirPaiement(){
    this.factureService.proposPaiement(this.idFacture).subscribe(
      (data: any) => {
        this.detailPaiement = data.paiement[0].details;

        console.log(data.paiement[0].details);

        let tab = data.paiement[0].details;
        for (let i = 0; i < tab.length; i++) {
          this.total += parseInt(tab[i].montant);
        }
        console.log(this.total);
      }
    )
  }

}
