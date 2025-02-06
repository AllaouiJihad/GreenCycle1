import { Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {RequestCreateComponent} from "./particular/collection-management/request-create/request-create.component";
import {PointsSystemComponent} from "./collector/points-system/points-system.component";
import {ProfilComponent} from "./particular/profil/profil.component";

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'demande', component: RequestCreateComponent},
  {path: 'system-points', component: PointsSystemComponent},
  {path: 'profil', component: ProfilComponent},
];
