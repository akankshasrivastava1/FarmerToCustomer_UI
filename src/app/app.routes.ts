import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { authGuard } from './core/guards/auth-guard';
import { beforeDeactiveGuard } from './core/guards/before-deactive-guard';

import { RoleMaster } from './pages/role-master/role-master';
import { CategoryMaster } from './pages/category-master/category-master';
import { Master } from './pages/master/master';
import { MasterNavigation } from './shared/master-navigation/master-navigation';
import { Product } from './pages/product/product';
import { ProductMaster } from './pages/product-master/product-master';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'master',
        component: Master,
        canActivate: [authGuard]
    },
    {
        path: 'product',
        component: Product,
        canActivate: [authGuard]
    },
    {
        path: 'productMaster',
        component: ProductMaster,
        canActivate: [authGuard]
    }
 
    // {
    //     path: 'master',
    //     component: MasterNavigation,
    //     children: [
    //         { path: '', redirectTo: 'products', pathMatch: 'full' },
    //         { path: 'products', component: ProductMaster },
    //         { path: 'roles', component: RoleMaster },
    //         { path: 'categories', component: CategoryMaster }
    //     ]
    // },



];
