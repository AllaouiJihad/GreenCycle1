import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './auth.actions';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, map, switchMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerUser),
      switchMap(({ register }) =>
        this.authService.register(register).pipe(
          map((response) => AuthActions.registerUserSuccess({ user: response })),
          catchError((error: Error) =>
            of(AuthActions.registerUserFailure({ error: error.message }))
          )
        )
      )
    )
  );

  redirectAfterRegister$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerUserSuccess),
        tap(() => this.router.navigate(['/login']))
      ),
    { dispatch: false }
  );

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginUser),
      switchMap(({ user }) =>
        this.authService.login(user).pipe(
          map((response) => AuthActions.loginUserSuccess({ user: response })),
          catchError((error: Error) =>
            of(AuthActions.loginUserFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
