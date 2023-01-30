import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FactureserviceService } from '../services/factureservice.service';

@Component({
  selector: 'app-historique-client',
  templateUrl: './historique-client.component.html',
  styleUrls: ['./historique-client.component.css']
})
export class HistoriqueClientComponent implements OnInit {

  constructor(private factureService: FactureserviceService, private route: ActivatedRoute) { }


  idClient = localStorage.getItem('idClient');

  listevoitureClient: any;
  listeHistoriqueDepot: any;

  selectedCar: any;

  idVoiture = this.route.snapshot.paramMap.get('idVoiture');

  ngOnInit(): void {
    this.getListeVoitureClient();
    this.getDepotVoiture();
  }


  getListeVoitureClient(){
    this.factureService.listeVoitureClient(this.idClient).subscribe(
      (data: any) => {
        //console.log(data);
        this.listevoitureClient = data.message;
      }
    )
  }

  getDepotVoiture(){
    this.factureService.listeDepotVoiture(this.idVoiture).subscribe(
      (data: any) => {
        console.log(data);
        this.listeHistoriqueDepot = data.message;
      }
    )
  }

  onSelectChange(event: any) {
    this.selectedCar = event.target.value;
  }

}
