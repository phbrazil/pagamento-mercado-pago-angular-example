import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";


export const AdminLayoutRoutes: Routes = [

    //NOVAS ROTAS INTERNAS DO SITE DEVEM SER INCLUIDAS AQUI
    { path: 'home', component: HomeComponent },
    { path: '**', component: HomeComponent },
];
