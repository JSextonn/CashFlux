import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Authentication } from "../reducers/auth.reducer";
import { Router } from "@angular/router";

import * as AuthActions from "../actions/auth.actions";

export type Action = AuthActions.Actions;

export interface AuthResponse {
  success: boolean;
  token: string;
  userId: string;
}

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
}
