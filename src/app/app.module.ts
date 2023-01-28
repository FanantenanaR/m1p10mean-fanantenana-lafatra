import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatStepperModule} from '@angular/material/stepper';

import { ResponsableaccueilComponent } from './responsableaccueil/responsableaccueil.component';
import { ResponsbleheaderComponent } from './responsbleheader/responsbleheader.component';
import { LoginclientComponent } from './loginclient/loginclient.component';
import { ClientaccueilComponent } from './clientaccueil/clientaccueil.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { LoginresponsableComponent } from './loginresponsable/loginresponsable.component';
import { ResponsabledepotComponent } from './responsabledepot/responsabledepot.component';
import { ClientinscriptionComponent } from './clientinscription/clientinscription.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HistoriqueClientComponent } from './historique-client/historique-client.component';
import { ClientheaderComponent } from './clientheader/clientheader.component';
import { ResponsablehistoriquereparationComponent } from './responsablehistoriquereparation/responsablehistoriquereparation.component';
import { ResponsablehistoriquedetailComponent } from './responsablehistoriquedetail/responsablehistoriquedetail.component';

@NgModule({
  declarations: [
    AppComponent,
    ResponsableaccueilComponent,
    ResponsbleheaderComponent,
    LoginclientComponent,
    ClientaccueilComponent,
    LoginresponsableComponent,
    ResponsabledepotComponent,
    ClientinscriptionComponent,
    HistoriqueClientComponent,
    ClientheaderComponent,
    ResponsablehistoriquereparationComponent,
    ResponsablehistoriquedetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
