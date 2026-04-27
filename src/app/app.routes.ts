import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { authGuard } from './core/guards/auth-guard';
import { beforeDeactiveGuard } from './core/guards/before-deactive-guard';
import { Master } from './pages/master/master';
import { Product } from './pages/product/product';

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
        path:'master',
        component: Master,
        canActivate: [authGuard]
    },
    {
        path:'product',
        component: Product,
        canActivate: [authGuard]
    }
];
