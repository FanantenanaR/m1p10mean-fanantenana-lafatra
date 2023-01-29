import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientaccueilComponent } from './clientaccueil/clientaccueil.component';
import { LoginclientComponent } from './loginclient/loginclient.component';
import { LoginresponsableComponent } from './loginresponsable/loginresponsable.component';
import { ClientinscriptionComponent } from './clientinscription/clientinscription.component';
import { ResponsableaccueilComponent } from './responsableaccueil/responsableaccueil.component';
import { ResponsabledepotComponent } from './responsabledepot/responsabledepot.component';
import { HistoriqueClientComponent } from './historique-client/historique-client.component';
import { ClientheaderComponent } from './clientheader/clientheader.component';
import { ResponsablehistoriquereparationComponent } from './responsablehistoriquereparation/responsablehistoriquereparation.component';
import { ResponsablehistoriquedetailComponent } from './responsablehistoriquedetail/responsablehistoriquedetail.component';

const routes: Routes = [
  {path: 'respAccueil', component: ResponsableaccueilComponent},
  {path: 'clientLogin', component: LoginclientComponent},
  {path: 'responsableLogin', component: LoginresponsableComponent},
  {path: 'clientAccueil', component: ClientaccueilComponent},
  {path: 'respEnregistrementDepot', component: ResponsabledepotComponent},
  {path: 'inscription', component: ClientinscriptionComponent},
  {path: 'clientHistorique', component: HistoriqueClientComponent},
  {path: 'clients', component: ClientheaderComponent},
  {path: 'historiqueReparation', component: ResponsablehistoriquereparationComponent},
  {path: 'historiqueReparation/voiture/:idVoiture', component: ResponsablehistoriquedetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
