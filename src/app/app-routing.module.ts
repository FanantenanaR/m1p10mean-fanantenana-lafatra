import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResponsableaccueilComponent } from './responsableaccueil/responsableaccueil.component';

const routes: Routes = [
  {path: 'respAccueil', component: ResponsableaccueilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
