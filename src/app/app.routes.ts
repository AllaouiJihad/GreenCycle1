import { Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {RequestCreateComponent} from "./particular/request-create/request-create.component";

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'demande', component: RequestCreateComponent},
];
