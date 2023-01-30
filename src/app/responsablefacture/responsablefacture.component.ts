import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FactureserviceService } from '../services/factureservice.service';

@Component({
  selector: 'app-responsablefacture',
  templateUrl: './responsablefacture.component.html',
  styleUrls: ['./responsablefacture.component.css']
})
export class ResponsablefactureComponent implements OnInit {

  constructor(private factureService: FactureserviceService) {

  }

  ngOnInit(): void {
    this.getListeFactureNonPayer();
  }

  listeFacture: any;

  getListeFactureNonPayer(){
    this.factureService.listeFactureNonPayer().subscribe(
      (data: any) => {
        this.listeFacture = data;
        console.log(data);
      }
    )
  }

}
