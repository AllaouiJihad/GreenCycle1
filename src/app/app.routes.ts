import { Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {RequestCreateComponent} from "./particular/collection-management/request-create/request-create.component";
import {PointsSystemComponent} from "./collector/points-system/points-system.component";
import {ProfilComponent} from "./particular/profil/profil.component";
import {RequestListComponent} from "./collector/request-list/request-list.component";
import {authGuard} from "./core/guards/auth.guard";

export const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'demande', component: RequestCreateComponent, canActivate: [authGuard]},
  {path: 'system-points', component: PointsSystemComponent, canActivate: [authGuard]},
  {path: 'profil', component: ProfilComponent, canActivate: [authGuard]},
  {path: 'request-list', component: RequestListComponent, canActivate: [authGuard]},
  {path: '', component: LoginComponent},
  { path: '**', redirectTo: '' }
];
