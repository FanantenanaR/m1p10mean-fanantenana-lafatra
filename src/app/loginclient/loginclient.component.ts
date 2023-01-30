import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginserviceService } from '../services/loginservice.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-loginclient',
  templateUrl: './loginclient.component.html',
  styleUrls: ['./loginclient.component.css']
})
export class LoginclientComponent implements OnInit {

  public userForm: FormGroup;
  login: string = "";
  mdp: string = "";

  constructor(private loginService: LoginserviceService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      login: 'fanantenana',
      mdp: 'fanantenana123'
    });
  }

  ngOnInit(): void {

  }

  statusError: any;

  /**
   * variable statusError: pour afficher les erreurs sy il y en a
   * error 404: pas d'identification correspondant
   * error 500: champs vide
   */
  traitementLogin(){
    this.login = this.userForm.get('login')?.value;
    this.mdp = this.userForm.get('mdp')?.value;

    this.loginService.loginClient(this.login, this.mdp).subscribe(
      (data: any) => {



        localStorage.setItem('idClient',data._id);
        window.location.href = "clientAccueil";
        console.log(data._id);

      }, (error: any) => {
        console.log(error.status);
        if(error.status == 404){
          this.statusError = 404;
        }
        if(error.status == 500){
          this.statusError = 500;
        }
      }
    )
  }


}
