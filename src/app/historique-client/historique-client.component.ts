import { Component, OnInit } from '@angular/core';
import { HistoriqueService } from '../services/historique.service';

@Component({
  selector: 'app-historique-client',
  templateUrl: './historique-client.component.html',
  styleUrls: ['./historique-client.component.css']
})
export class HistoriqueClientComponent implements OnInit {

  constructor(private historiqueService: HistoriqueService) { }

  ngOnInit(): void {
    this.getlisteHistorique();
  }

  idClient = localStorage.getItem('idClient');
  listeHistorique: any;

  getlisteHistorique(){
    this.historiqueService.historiqueClient(this.idClient).subscribe(
      (data: any) => {
        // if(data.status == 200){
        //   this.listeHistorique = data;
        // }
        console.log(data.message);
        this.listeHistorique = data.message;
      }
    )
  }

}
