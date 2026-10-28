import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login';
import { Layout } from './pages/auth/layout/layout';
import { CustomerList } from './pages/customers/customer-list/customer-list';
import { CustomerForm } from './pages/customers/customer-form/customer-form';
import { authGuard } from './core/guards/auth-guard';
import { Warehouse } from './pages/warehouse/warehouse';
import { EmployeeList } from './pages/employee/employee-list/employee-list';
import { NewEmployee } from './pages/employee/new-employee/new-employee';
import { BookingList } from './pages/booking/booking-list/booking-list';
import { BookingForm } from './pages/booking/booking-form/booking-form';
import { Dashboard } from './pages/dashboard/dashboard';

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
                path:'dashboard',
                component: Dashboard
            },
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
            },
            {
                path:'employees',
                component:EmployeeList
            },
            {
                path:'employee-form/:empId',
                component:NewEmployee
            },
            {
                path:'booking-list',
                component:BookingList
            },
            {
                path:'booking-form/:bookingId',
                component:BookingForm
            }
        ]
    }
];
