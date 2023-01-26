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
import { RespListeDepotComponent } from './resp-liste-depot/resp-liste-depot.component';
import { RespSideBarComponent } from './resp-side-bar/resp-side-bar.component';
import { FooterComponent } from './footer/footer.component';

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
    RespListeDepotComponent,
    RespSideBarComponent,
    FooterComponent
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
