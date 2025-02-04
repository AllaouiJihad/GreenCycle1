import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Auth } from './auth.model';
import {User} from "../../models/user.model";

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Register User': props<{ user: User }>(),
    'Register User Success': props<{ user: User }>(),
    'Register User Failure': props<{ error: string }>(),

    'Login User': props<{ login: LoginRequest }>(),
    'Login User Success': props<{ user: User }>(),
    'Login User Failure': props<{ error: string }>(),
  }
});
