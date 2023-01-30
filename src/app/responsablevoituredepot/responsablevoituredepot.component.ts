import { Component, OnInit } from '@angular/core';
import { SortieService } from '../services/sortie.service';

@Component({
  selector: 'app-responsablevoituredepot',
  templateUrl: './responsablevoituredepot.component.html',
  styleUrls: ['./responsablevoituredepot.component.css']
})
export class ResponsablevoituredepotComponent implements OnInit {

  constructor(private sortieService: SortieService) { }

  ngOnInit(): void {
    this.getListeVoitureDeposee();
  }

  listeVoiture: any;

  getListeVoitureDeposee(){
    this.sortieService.listeVoitureDeposee().subscribe(
      (data: any) => {
        console.log(data);
        this.listeVoiture = data.message;
      }
    )
  }

}
