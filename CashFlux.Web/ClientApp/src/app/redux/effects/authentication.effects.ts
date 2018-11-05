import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { Router } from "@angular/router";

import * as RegisterActions from "../actions/register.actions";
import * as AuthActions from "../actions/authentication.actions";
import { AuthenticationResponse, AuthenticationService } from "../../services/authentication.service";

export type Action = AuthActions.Actions;

@Injectable()
export class AuthenticationEffects {
  constructor(
    private actions: Actions,
    private authService: AuthenticationService,
    private router: Router) { }

  @Effect()
  login: Observable<Action> = this.actions.pipe(
    ofType(AuthActions.LOGIN),
    mergeMap((action: AuthActions.Login) =>
      this.authService.login(action.payload).pipe(
        map((data: AuthenticationResponse) => new AuthActions.LoginSuccess(data)),
        catchError(error => of(new AuthActions.LoginFail({error: error.message})))
      )
    )
  );

  @Effect({dispatch: false})
  loginSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActions.LOGIN_SUCCESS, RegisterActions.REGISTER_SUCCESS),
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
}
