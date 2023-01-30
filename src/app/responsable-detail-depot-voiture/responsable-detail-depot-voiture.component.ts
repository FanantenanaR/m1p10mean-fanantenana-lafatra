import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SortieService } from '../services/sortie.service';

@Component({
  selector: 'app-responsable-detail-depot-voiture',
  templateUrl: './responsable-detail-depot-voiture.component.html',
  styleUrls: ['./responsable-detail-depot-voiture.component.css']
})
export class ResponsableDetailDepotVoitureComponent implements OnInit {
  public userForm: FormGroup;
  pNom: String = '';
  pPrenom: String = '';
  pTel: String = '';
  rNom: String = '';
  rPrenom: String = '';
  rTel: String = '';
  email: String = '';

  constructor(private sortieService: SortieService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.userForm = this.fb.group({
      pNom: '',
      pPrenom: '',
      pTel: '',
      rNom:'',
      rPrenom:'',
      rTel:'',
      email:''
    });
  }
  ngOnInit(): void {
    this.getDetailDepot();
  }

  idDepot = this.route.snapshot.paramMap.get('idDepot');
  voiture: any;
  facture: any;
  depot: any;
  detailfacture: any;

  getDetailDepot(){
    this.sortieService.listeDetailVoitureDeposee(this.idDepot).subscribe(
      (data: any) => {
        console.log(data);
        this.voiture = data.voiture;
        this.depot = data.depot;
        this.facture = data.facture;
        this.detailfacture = data.facture.detailFacture;
      }
    )
  }

  sortie(){
    this.pNom = this.userForm.get('pNom')?.value;
    this.pPrenom = this.userForm.get('pPrenom')?.value;
    this.pTel = this.userForm.get('pTel')?.value;
    this.rNom = this.userForm.get('rNom')?.value;
    this.rPrenom = this.userForm.get('rPrenom')?.value;
    this.rTel = this.userForm.get('rTel')?.value;
    this.email = this.userForm.get('email')?.value;

    //console.log(this.userForm.get('rTel')?.value);

    this.sortieService.validationSortie(this.idDepot, this.pNom, this.pPrenom, this.pTel, this.rNom, this.rPrenom, this.rTel, this.email).subscribe(
      (data: any) => {
        window.location.href = 'responsableVoitureDeposee/detail/'+this.idDepot;
      }
    )
  }

}
