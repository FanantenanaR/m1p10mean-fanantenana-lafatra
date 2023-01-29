import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HistoriqueService } from '../services/historique.service';

@Component({
  selector: 'app-responsablehistoriquedetail',
  templateUrl: './responsablehistoriquedetail.component.html',
  styleUrls: ['./responsablehistoriquedetail.component.css']
})
export class ResponsablehistoriquedetailComponent implements OnInit {

  constructor(private historiqueService: HistoriqueService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProprietaire();
    this.getListeReparation();
  }

  idVoiture = this.route.snapshot.paramMap.get('idVoiture');

  proprietaire: any;
  voiture: any;
  listeReparation: any;

  getProprietaire(){
    this.historiqueService.proprietaireVoiture(this.idVoiture).subscribe(
      (data: any) => {
        this.proprietaire = data.aboutProprietaire;
        this.voiture = data.aboutVoiture;
      }
    )
  }

  getListeReparation(){
    this.historiqueService.listeReparation(this.idVoiture).subscribe(
      (data: any) => {
        this.listeReparation = data.message;
      }
    )
  }

}
