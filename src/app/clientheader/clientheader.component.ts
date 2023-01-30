import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientheader',
  templateUrl: './clientheader.component.html',
  styleUrls: ['./clientheader.component.css']
})
export class ClientheaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  idClient = localStorage.getItem('idClient');

  logout(){
    localStorage.removeItem('idClient');
    window.location.href = "clientAccueil";
  }

}
