import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login';
import { Layout } from './pages/auth/layout/layout';
import { CustomerList } from './pages/customers/customer-list/customer-list';
import { CustomerForm } from './pages/customers/customer-form/customer-form';
import { authGuard } from './core/guards/auth-guard';
import { Warehouse } from './pages/warehouse/warehouse';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:Login
    },
    {
        path:'admin',
        component:Layout,
        canActivate:[authGuard],
        children:[
            {
                path:'customer-list',
                component:CustomerList
            },
            {
                path:'customer-form/:id',
                component:CustomerForm
            },
            {
                path:'warehouse-list',
                component:Warehouse
            }
        ]
    }
];
