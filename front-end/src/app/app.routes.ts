import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MovieComponent } from './pages/movie/movie.component';
import { LoginComponent } from './pages/login/login.component';
import { SigupComponent } from './pages/sigup/sigup.component';
import { authGuard } from './service/auth.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MovieAdminComponent } from './pages/movie-admin/movie-admin.component';

export const routes: Routes = [
    {
        path: "",
        component: MainLayoutComponent,
        children: [
            {
                path: "home",
                component: HomeComponent
            },
            {
                path: "movie",
                component: MovieComponent,
                canActivate: [authGuard]
            },
            {
                path: "",
                redirectTo: "home",
                pathMatch: "full"
            }
        ],
    },
    {
        path:"admin",
        component: AdminLayoutComponent,
        children:[
            {
                path: "movie",
                component: MovieAdminComponent
            }
        ],
    },
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path: "sigup",
        component: SigupComponent
    },

];
