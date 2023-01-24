import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DepotserviceService } from '../depotservice.service';

@Component({
  selector: 'app-responsabledepot',
  templateUrl: './responsabledepot.component.html',
  styleUrls: ['./responsabledepot.component.css']
})
export class ResponsabledepotComponent implements OnInit {
  public userForm: FormGroup;
  plaque: string = "";
  nom: string = "";
  prenom: string = "";
  tel: string = "";
  email: string = "";
  rNom: string = "";
  rPrenom: string = "";
  rTel: string = "";
  rMail: string = "";

  constructor(private fb: FormBuilder, private depotService: DepotserviceService) {
    this.userForm = this.fb.group({
      plaque: '',
      nom: '',
      prenom: '',
      tel: '',
      email: '',
      rNom: '',
      rPrenom: '',
      rTel: '',
      rMail: ''
    });
  }

  ngOnInit(): void {
  }

  statusEnregistrementDepot: any;

  enregistrerDepotVoiture(){
    this.plaque = this.userForm.get('plaque')?.value;
    this.nom = this.userForm.get('nom')?.value;
    this.prenom = this.userForm.get('prenom')?.value;
    this.tel = this.userForm.get('tel')?.value;
    this.email = this.userForm.get('email')?.value;
    this.rNom = this.userForm.get('rNom')?.value;
    this.rPrenom = this.userForm.get('rPrenom')?.value;
    this.rTel = this.userForm.get('rTel')?.value;
    this.rMail = this.userForm.get('rMail')?.value;


    this.depotService.enregistrementDepotVoiture(this.plaque, this.nom, this.prenom, this.tel, this.email, this.rNom, this.rPrenom, this.rTel, this.rMail).subscribe(
      (data: any): void => {
        if(data.status == 200){
          this.statusEnregistrementDepot = 200;
          window.location.href = "respEnregistrementDepot";
        }
      }, (error: any) => {
        if(error.status == 500){
          this.statusEnregistrementDepot = 500;
        }
        if(error.status == 404){
          this.statusEnregistrementDepot = 404;
        }
      }
    )
  }
}
