import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/logged-pages/home/home.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { AuthGuard } from './_services/auth.guard';

const adminModule = () => import('./components/logged-pages/admin-layout.module').then(x => x.AdminLayoutModule);

const routes: Routes = [
  { path: 'pricing', component: PricingComponent },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [{
      path: '',
      loadChildren: adminModule
    }]
  },
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      onSameUrlNavigation: 'reload' 
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
