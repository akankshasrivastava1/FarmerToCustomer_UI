import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Category } from './pages/category/category';
import { authGuard } from './core/guards/auth-guard';
import { beforeDeactiveGuard } from './core/guards/before-deactive-guard';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full',
    },
    {
        path:'home',
        component: Home
    },
    {
        path:'login',
        component: Login
    },
    {
        path:'category',
        component: Category,
        canActivate: [authGuard],
        canDeactivate: [beforeDeactiveGuard]
    },
];
