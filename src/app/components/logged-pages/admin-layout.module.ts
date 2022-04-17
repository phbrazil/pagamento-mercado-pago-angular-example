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
import { ProfileComponent } from './manage/profile/profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faFilm, faFish } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { NewEntryComponent } from './time/new-entry/new-entry.component';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TasksComponent } from './time/tasks/tasks.component';
import { LoggedFooterComponent } from './logged-footer/logged-footer.component';
import { EditTaskComponent } from './time/tasks/edit-task/edit-task.component';
import { DeleteTaskComponent } from './time/tasks/delete-task/delete-task.component';
import { NewAdvanceComponent } from './advance/new-advance/new-advance.component';
import { ProjectsComponent } from './manage/projects/projects.component';
import { NewProjectComponent } from './manage/projects/new-project/new-project.component';
import { TasksManagerComponent } from './tasks-manager/tasks-manager.component';
import { NewTaskManagerComponent } from './tasks-manager/new-task-manager/new-task-manager.component';
import { PlanAccountComponent } from './manage/plan-account/plan-account.component';
import { ReportsComponent } from './reports/reports.component';
import { LbdChartComponent } from './lbd/lbd-chart/lbd-chart.component';
import { SettingsComponent } from './manage/settings/settings.component';
import { MyTimeComponent } from './time/my-time/my-time.component';

@NgModule({
  declarations: [
    NavbarComponent,
    TimeComponent,
    AdvanceComponent,
    RefundComponent,
    ManageComponent,
    ProfileComponent,
    NewEntryComponent,
    TasksComponent,
    LoggedFooterComponent,
    EditTaskComponent,
    DeleteTaskComponent,
    NewAdvanceComponent,
    ProjectsComponent,
    NewProjectComponent,
    TasksManagerComponent,
    NewTaskManagerComponent,
    PlanAccountComponent,
    ReportsComponent,
    LbdChartComponent,
    SettingsComponent,
    MyTimeComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FontAwesomeModule,
    AngularMaterialModule,
    NgbDatepickerModule,
    NgSelectModule
  ], exports: [
    NavbarComponent,
    TimeComponent,
    AdvanceComponent,
    LoggedFooterComponent,

  ],
})
export class AdminLayoutModule {

  constructor() {
    library.add(faFilm, faFish, faCoffee);
  }

}
