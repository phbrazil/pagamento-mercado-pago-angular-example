import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { TimeComponent } from './time/time.component';
import { AdvanceComponent } from './advance/advance.component';
import { RefundComponent } from './refund/refund.component';
import { ManageComponent } from './manage/manage.component';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    NavbarComponent,
    TimeComponent,
    AdvanceComponent,
    RefundComponent,
    ManageComponent,
    DashboardsComponent,
    ProfileComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(AdminLayoutRoutes),
  ], exports: [
    NavbarComponent,
    TimeComponent,
    AdvanceComponent
  ],
})
export class AdminLayoutModule { }
