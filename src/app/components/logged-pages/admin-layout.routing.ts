import { Routes } from "@angular/router";
import { AdvanceComponent } from "./advance/advance.component";
import { DashboardsComponent } from "./dashboards/dashboards.component";
import { HomeComponent } from "./home/home.component";
import { ManageComponent } from "./manage/manage.component";
import { ProfileComponent } from "./profile/profile.component";
import { RefundComponent } from "./refund/refund.component";
import { TimeComponent } from "./time/time.component";


export const AdminLayoutRoutes: Routes = [

    //NOVAS ROTAS INTERNAS DO SITE DEVEM SER INCLUIDAS AQUI
    { path: 'home', component: HomeComponent },
    { path: 'time', component: TimeComponent },
    { path: 'advance', component: AdvanceComponent },
    { path: 'refund', component: RefundComponent },
    { path: 'manage', component: ManageComponent },
    { path: 'dash', component: DashboardsComponent },
    //{ path: 'profile', component: ProfileComponent },
    { path: '**', component: TimeComponent },
];
