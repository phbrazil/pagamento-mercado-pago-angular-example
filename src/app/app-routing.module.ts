import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmPasswordComponent } from './components/confirm-password/confirm-password.component';
import { HomeComponent } from './components/logged-pages/home/home.component';
import { AuthGuard } from './_services/auth.guard';

const adminModule = () => import('./components/logged-pages/admin-layout.module').then(x => x.AdminLayoutModule);

const routes: Routes = [
  { path: 'confirm-password', component: ConfirmPasswordComponent },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [{
      path: '',
      loadChildren: adminModule
    },
  ]
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
      onSameUrlNavigation: 'reload',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64]
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
