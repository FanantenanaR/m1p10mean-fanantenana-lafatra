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
import { ClientfactureComponent } from './clientfacture/clientfacture.component';
import { ResponsablefactureComponent } from './responsablefacture/responsablefacture.component';
import { ResponsablefacturedetailComponent } from './responsablefacturedetail/responsablefacturedetail.component';
import { ResponsablevoituredepotComponent } from './responsablevoituredepot/responsablevoituredepot.component';
import { ResponsableDetailDepotVoitureComponent } from './responsable-detail-depot-voiture/responsable-detail-depot-voiture.component';
import { RespListeDepotComponent } from './resp-liste-depot/resp-liste-depot.component';
import { ResponsableDepotDetailsComponent } from './responsable-depot-details/responsable-depot-details.component';

const routes: Routes = [
  {path: 'respAccueil', component: ResponsableaccueilComponent},
  {path: 'clientLogin', component: LoginclientComponent},
  {path: 'responsableLogin', component: LoginresponsableComponent},
  {path: 'clientAccueil', component: ClientaccueilComponent},
  {path: 'respEnregistrementDepot', component: ResponsabledepotComponent},
  {path: 'inscription', component: ClientinscriptionComponent},
  {path: 'clientHistorique', component: HistoriqueClientComponent},
  {path: 'clientHistorique/depot/:idVoiture', component: HistoriqueClientComponent},
  {path: 'clientFacture/:idDepot', component: ClientfactureComponent},
  {path: 'clients', component: ClientheaderComponent},
  {path: 'historiqueReparation', component: ResponsablehistoriquereparationComponent},
  {path: 'historiqueReparation/voiture/:idVoiture', component: ResponsablehistoriquedetailComponent},
  {path: 'responsableFacture', component: ResponsablefactureComponent},
  {path: 'responsableFacture/facture/:idFacture/:idDepot', component: ResponsablefacturedetailComponent},
  {path: 'responsableVoitureDeposee', component: ResponsablevoituredepotComponent},
  {path: 'responsableVoitureDeposee/detail/:idDepot', component: ResponsableDetailDepotVoitureComponent}
  {path: 'depot/:idDepot', component: ResponsableDepotDetailsComponent},
  {path: 'respListeDepot',component: RespListeDepotComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
