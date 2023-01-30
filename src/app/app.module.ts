import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';


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
import { ClientfactureComponent } from './clientfacture/clientfacture.component';
import { ResponsablefactureComponent } from './responsablefacture/responsablefacture.component';
import { ResponsablefacturedetailComponent } from './responsablefacturedetail/responsablefacturedetail.component';
import { ResponsablevoituredepotComponent } from './responsablevoituredepot/responsablevoituredepot.component';
import { ResponsableDetailDepotVoitureComponent } from './responsable-detail-depot-voiture/responsable-detail-depot-voiture.component';
import { RespListeDepotComponent } from './resp-liste-depot/resp-liste-depot.component';
import { RespSideBarComponent } from './resp-side-bar/resp-side-bar.component';
import { FooterComponent } from './footer/footer.component';
import { ResponsableDepotDetailsComponent } from './responsable-depot-details/responsable-depot-details.component';

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
    ResponsablehistoriquedetailComponent,
    ClientfactureComponent,
    ResponsablefactureComponent,
    ResponsablefacturedetailComponent,
    ResponsablevoituredepotComponent,
    ResponsableDetailDepotVoitureComponent,
    RespListeDepotComponent,
    RespSideBarComponent,
    FooterComponent,
    ResponsableDepotDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatCheckboxModule,
    DragDropModule,
    MatSnackBarModule,
    MatSelectModule,
    MatListModule,
    MatIconModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
