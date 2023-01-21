import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientaccueilComponent } from './clientaccueil/clientaccueil.component';
import { LoginclientComponent } from './loginclient/loginclient.component';
import { ResponsableaccueilComponent } from './responsableaccueil/responsableaccueil.component';

const routes: Routes = [
  {path: 'respAccueil', component: ResponsableaccueilComponent},
  {path: 'clientLogin', component: LoginclientComponent},
  {path: 'clientAccueil', component: ClientaccueilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
