import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginserviceService } from '../loginservice.service';

@Component({
  selector: 'app-loginresponsable',
  templateUrl: './loginresponsable.component.html',
  styleUrls: ['./loginresponsable.component.css']
})
export class LoginresponsableComponent implements OnInit {

  public userForm: FormGroup;
  login: string = "";
  mdp: string = "";

  constructor(private loginService: LoginserviceService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      login: '',
      mdp: ''
    });
  }

  ngOnInit(): void {
  }

  statusError: any;

  traitementLogin(){
    this.login = this.userForm.get('login')?.value;
    this.mdp = this.userForm.get('mdp')?.value;


    this.loginService.loginResponsable(this.login, this.mdp).subscribe(
      (data: any) => {
        if(data.status == 200){
          //localStorage.setItem('idResponsable', )
          window.location.href = "respAccueil";
        }
      }, (error: any) => {
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
