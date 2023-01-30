import { Component, OnInit } from '@angular/core';
import { DepotserviceService } from '../services/depotservice.service';

@Component({
  selector: 'app-resp-liste-depot',
  templateUrl: './resp-liste-depot.component.html',
  styleUrls: ['./resp-liste-depot.component.css']
})
export class RespListeDepotComponent implements OnInit {

  constructor(private depotService: DepotserviceService) { }

  ngOnInit(): void {
    this.updateList();
  }

  updateList(): void {
    this.depotService.getListeDepot().subscribe((data: any) => {
      this.listeDepot = data;
    }, (error: any) => {
      console.log("error init");
    })
  }

  goTo(idDepot: string): void {

  }

  listeDepot: any = [];
}
