import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientaccueilComponent } from './clientaccueil/clientaccueil.component';
import { LoginclientComponent } from './loginclient/loginclient.component';
import { LoginresponsableComponent } from './loginresponsable/loginresponsable.component';
import { ClientinscriptionComponent } from './clientinscription/clientinscription.component';
import { ResponsableaccueilComponent } from './responsableaccueil/responsableaccueil.component';
import { ResponsabledepotComponent } from './responsabledepot/responsabledepot.component';
import { RespListeDepotComponent } from './resp-liste-depot/resp-liste-depot.component';

const routes: Routes = [
  {path: 'respAccueil', component: ResponsableaccueilComponent},
  {path: 'clientLogin', component: LoginclientComponent},
  {path: 'responsableLogin', component: LoginresponsableComponent},
  {path: 'clientAccueil', component: ClientaccueilComponent},
  {path: 'respEnregistrementDepot', component: ResponsabledepotComponent},
  {path: 'inscription', component: ClientinscriptionComponent},
  {path: 'respListeDepot',component: RespListeDepotComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
