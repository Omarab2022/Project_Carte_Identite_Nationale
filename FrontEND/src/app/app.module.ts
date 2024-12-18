import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';

import { HomeComponent } from './views/home/home.component';
import { FeaturesComponent } from './views/features/features.component';
import { PricingComponent } from './views/pricing/pricing.component';
import { BlogComponent } from './views/blog/blog.component';
import { ContactComponent } from './views/contact/contact.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material/material.module';
import { FooterComponent } from './shared/footer/footer.component';
import { InputWithButtonComponent } from './views/home/input-with-button/input-with-button.component';
import { HomeCardComponent } from './views/home/home-card/home-card.component';
import { BlogCardComponent } from './views/blog/blog-card/blog-card.component';
import { ButtonComponent } from './shared/button/button.component';
import { PrincingCardComponent } from './views/pricing/princing-card/princing-card.component';
import { PrincingButtonComponent } from './views/pricing/princing-button/princing-button.component';
import { PreDemandeComponent } from './views/pre-demande/pre-demande.component';
import { SuivreDemandeComponent } from './views/suivre-demande/suivre-demande.component';
import { CitoyenMarocainComponent } from './views/citoyen-marocain/citoyen-marocain.component';
import { EtrangerComponent } from './views/etranger/etranger.component';
import { HttpClientModule } from '@angular/common/http';
import { RequestsComponent } from './views/requests/requests.component';
import { EtatDemandeComponent } from './views/etat-demande/etat-demande.component';
import { RenouvellementComponent } from './views/renouvellement/renouvellement.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    HomeComponent,
    FeaturesComponent,
    PricingComponent,
    BlogComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    InputWithButtonComponent,
    HomeCardComponent,
    BlogCardComponent,
    ButtonComponent,
    PrincingCardComponent,
    PrincingButtonComponent,
    PreDemandeComponent,
    SuivreDemandeComponent,
    CitoyenMarocainComponent,
    EtrangerComponent,
    RequestsComponent,
    EtatDemandeComponent,
    RenouvellementComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
