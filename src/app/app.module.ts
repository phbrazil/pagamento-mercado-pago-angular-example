import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData, CurrencyPipe } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { faFilm, faFish } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from './components/shared/shared.module';
import { AngularMaterialModule } from './components/shared/angular-material/angular-material.module';
import { NewCardComponent } from './components/new-card/new-card.component';

registerLocaleData(localePT);

@NgModule({
  declarations: [
    AppComponent,
    NewCardComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    SharedModule,
    AngularMaterialModule
    ],
  providers: [
    {  provide: LOCALE_ID, useValue: 'pt-BR' },
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
      library.add(faFilm, faFish);
    }
}
