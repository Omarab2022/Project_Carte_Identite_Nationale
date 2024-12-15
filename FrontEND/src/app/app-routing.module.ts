import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { FeaturesComponent } from './views/features/features.component';
import { PricingComponent } from './views/pricing/pricing.component';
import { BlogComponent } from './views/blog/blog.component';
import { ContactComponent } from './views/contact/contact.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { PreDemandeComponent } from './views/pre-demande/pre-demande.component';
import { SuivreDemandeComponent } from './views/suivre-demande/suivre-demande.component';
import { CitoyenMarocainComponent } from './views/citoyen-marocain/citoyen-marocain.component';
import { EtrangerComponent } from './views/etranger/etranger.component';
import { RequestsComponent } from './views/requests/requests.component';
import { EtatDemandeComponent } from './views/etat-demande/etat-demande.component';
import { RenouvellementComponent } from './views/renouvellement/renouvellement.component';

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'pre-demande', component: PreDemandeComponent },
  { path: 'suivre-demande', component: SuivreDemandeComponent },
  { path: 'pre-demande/citoyen-marocain', component: CitoyenMarocainComponent },
  { path: 'pre-demande/etranger', component: EtrangerComponent },
  { path: 'requests', component: RequestsComponent },
  { path: 'etat-demande/:numeroPreDemande', component: EtatDemandeComponent },
  { path: 'renouvellement/:id', component: RenouvellementComponent },






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
