import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ClientService } from '../services/client.service';
import * as moment from 'moment';

@Component({
  selector: 'app-clientinscription',
  templateUrl: './clientinscription.component.html',
  styleUrls: ['./clientinscription.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class ClientinscriptionComponent implements OnInit {



  constructor(
    private _formBuilder: FormBuilder,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
  }

  inscrire(): void {

    if(!this.firstFormGroup.valid || !this.secondFormGroup.valid || !this.thirdFormGroup.valid || !this.fourthFormGroup.valid) {
      // TODO form non valid
      console.log("firstFormGroup", this.firstFormGroup.valid);
      console.log("secondFormGroup", this.secondFormGroup.valid);
      console.log("thirdFormGroup", this.thirdFormGroup.valid);
      console.log("fourthFormGroup", this.fourthFormGroup.valid);

    } else {

      let dateNaissance = this.firstFormGroup.get('dateNaissance')?.value;

      if (dateNaissance === null) {
        dateNaissance = moment().format("LL");
      } else {
        dateNaissance = moment(dateNaissance).format("LL");
      }

      let dateDelivrance = this.thirdFormGroup.get('dateDelivrance')?.value;
      if (dateDelivrance === null) {
        dateDelivrance = moment().format("LL");
      } else {
        dateDelivrance = moment(dateDelivrance).format("LL");
      }
      let numeroCIN: number | string | null = this.thirdFormGroup.get('numeroCIN')?.value || null;
      if (numeroCIN === null) {
        return;
      } else {
        numeroCIN = Number.parseInt(numeroCIN);
      }

      this.clientService.inscription(
        this.firstFormGroup.get('nom')?.value || '',
        this.firstFormGroup.get('prenom')?.value || '',
        dateNaissance,
        this.secondFormGroup.get('numeroTel')?.value || '',
        this.secondFormGroup.get('email')?.value || '',
        this.secondFormGroup.get('adresse')?.value || '',
        numeroCIN,
        dateDelivrance,
        this.thirdFormGroup.get('lieuDelivrance')?.value || '',
        this.fourthFormGroup.get('login')?.value || '',
        this.fourthFormGroup.get('mdp')?.value || '',

      ).subscribe((data: any) => {
        if (data.status === 200) {
          console.log(data);
          window.location.href = "clientAccueil";
        }
      }, (error: any) => {
        console.log("error ", error);
      });
    }

  }

  firstFormGroup = this._formBuilder.group({
    nom: ['', Validators.required],
    prenom: [''],
    dateNaissance: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    numeroTel: ['', Validators.required],
    email: ['', Validators.email],
    adresse: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    numeroCIN: ['', Validators.required],
    dateDelivrance: ['', Validators.required],
    lieuDelivrance: ['', Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
    login: ['', Validators.required],
    mdp: ['', Validators.required],
  });

}
