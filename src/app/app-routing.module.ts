import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientinscriptionComponent } from './clientinscription/clientinscription.component';
import { ResponsableaccueilComponent } from './responsableaccueil/responsableaccueil.component';

const routes: Routes = [
  {
    path: 'respAccueil', component: ResponsableaccueilComponent
  },
  {
    path: 'inscription', component: ClientinscriptionComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
