import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './+component/home/home.component';
import {AuthGuard} from './_guards/auth.guard';
import {AdminComponent} from './+component/admin/admin.component';
import {LoginComponent} from './+component/login/login.component';
import {Role} from './_model/role';
import {RegisterComponent} from './+component/register/register.component';
import {ValidatorComponent} from './+component/form/validator/validator.component';


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [ AuthGuard ]},
  {path: 'admin', component: AdminComponent,  canActivate: [AuthGuard], data: { roles: [Role.Admin]}},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'validator', component: ValidatorComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
