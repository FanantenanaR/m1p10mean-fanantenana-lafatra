import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResponsableaccueilComponent } from './responsableaccueil/responsableaccueil.component';
import { ResponsbleheaderComponent } from './responsbleheader/responsbleheader.component';
import { LoginclientComponent } from './loginclient/loginclient.component';
import { ClientaccueilComponent } from './clientaccueil/clientaccueil.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { LoginresponsableComponent } from './loginresponsable/loginresponsable.component';
import { ResponsabledepotComponent } from './responsabledepot/responsabledepot.component';

@NgModule({
  declarations: [
    AppComponent,
    ResponsableaccueilComponent,
    ResponsbleheaderComponent,
    LoginclientComponent,
    ClientaccueilComponent,
    LoginresponsableComponent,
    ResponsabledepotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
