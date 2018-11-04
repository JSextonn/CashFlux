import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import * as AuthActions from "../actions/auth.actions";
import { AuthResponse, RegisterResponse } from "../reducers/auth.reducer";

export type Action = AuthActions.Actions;

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private httpClient: HttpClient,
    private router: Router) { }

  @Effect()
  login: Observable<Action> = this.actions.pipe(
    ofType(AuthActions.LOGIN),
    mergeMap((action: AuthActions.Login) =>
      this.httpClient.post<AuthResponse>('api/auth', action.payload).pipe(
        map((data: AuthResponse) => new AuthActions.LoginSuccess(data)),
        catchError(error => of(new AuthActions.LoginFail({error: error.message})))
      )
    )
  );

  @Effect({dispatch: false})
  loginSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActions.LOGIN_SUCCESS),
    tap((action: AuthActions.LoginSuccess) => {
      localStorage.setItem('login', JSON.stringify({
        token: action.payload.token,
        userId: action.payload.userId
      }));
      this.router.navigateByUrl('/dashboard');
    })
  );

  @Effect({dispatch: false})
  loginFail: Observable<any> = this.actions.pipe(
    ofType(AuthActions.LOGIN_FAIL),
  );

  @Effect({dispatch: false})
  logout: Observable<any> = this.actions.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('login');
      this.router.navigateByUrl('/');
    })
  );

  @Effect()
  register: Observable<Action> = this.actions.pipe(
    ofType(AuthActions.REGISTER),
    mergeMap((action: AuthActions.Register) =>
      this.httpClient.post<RegisterResponse>('api/user', action.payload).pipe(
        map((data: RegisterResponse) => new AuthActions.RegisterSuccess(data)),
        catchError(error => of(new AuthActions.RegisterFail({error: error.message})))
      )
    )
  );

  @Effect({dispatch: false})
  registerSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActions.REGISTER_SUCCESS),
    tap((action: AuthActions.RegisterSuccess) => {
      localStorage.setItem('login', JSON.stringify({
        token: action.payload.token,
        userId: action.payload.userId
      }));
      this.router.navigateByUrl('/dashboard');
    })
  );

  @Effect({dispatch: false})
  registerFail: Observable<any> = this.actions.pipe(
    ofType(AuthActions.REGISTER_FAIL),
  );
}
