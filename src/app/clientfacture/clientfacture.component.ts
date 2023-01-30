import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FactureserviceService } from '../services/factureservice.service';
import { HistoriqueService } from '../services/historique.service';

@Component({
  selector: 'app-clientfacture',
  templateUrl: './clientfacture.component.html',
  styleUrls: ['./clientfacture.component.css']
})
export class ClientfactureComponent implements OnInit {

  constructor(private factureService: FactureserviceService, private route: ActivatedRoute) { }

  idDepot = this.route.snapshot.paramMap.get('idDepot');

  facture: any;
  detailFacture: any;
  voiture: any;
  depot: any;


  ngOnInit(): void {
    this.getFactureDepot();
  }

  getFactureDepot(){
    this.factureService.consultationFactureDepot(this.idDepot).subscribe(
      (data: any) => {
        //console.log(data);
        console.log(data);
        this.depot = data.proposDepot;
        this.voiture = data.proposVoiture;
        this.facture = data.message;
        this.detailFacture = data.message[0].detailFacture;
      }
    )
  }

}
