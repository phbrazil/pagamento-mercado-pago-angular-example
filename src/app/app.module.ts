import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TryFreeComponent } from './components/try-free/try-free.component';
import { ClientsComponent } from './components/clients/clients.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { AngularMaterialModule } from './components/shared/angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from './components/shared/shared.module';
import { AdminLayoutModule } from './components/logged-pages/admin-layout.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/logged-pages/home/home.component';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { faFish } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PricingComponent } from './components/pricing/pricing.component';
import { RouterModule } from '@angular/router';
import { InterceptorModule } from './_services/interceptor.module';
import { ConfirmPasswordComponent } from './components/confirm-password/confirm-password.component';

registerLocaleData(localePT);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TryFreeComponent,
    ClientsComponent,
    CreateAccountComponent,
    LoginComponent,
    HomeComponent,
    ResetPasswordComponent,
    PricingComponent,
    ConfirmPasswordComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    AdminLayoutModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    InterceptorModule
    ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
      library.add(faFilm, faFish);
    }
}
