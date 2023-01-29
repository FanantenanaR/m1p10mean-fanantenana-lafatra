import { Component, OnInit } from '@angular/core';
import { HistoriqueService } from '../services/historique.service';

@Component({
  selector: 'app-responsablehistoriquereparation',
  templateUrl: './responsablehistoriquereparation.component.html',
  styleUrls: ['./responsablehistoriquereparation.component.css']
})
export class ResponsablehistoriquereparationComponent implements OnInit {

  constructor(private historiqueService: HistoriqueService) { }

  ngOnInit(): void {
    this.getlisteVoiture();
  }

  listeVoiture: any;

  getlisteVoiture(){
    this.historiqueService.listeVoiture().subscribe(
      (data: any) => {
        this.listeVoiture = data.message;
      }
    )
  }

}
