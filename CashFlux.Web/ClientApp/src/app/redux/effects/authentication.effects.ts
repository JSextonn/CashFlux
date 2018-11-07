import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { Router } from "@angular/router";

import * as RegisterActions from "../actions/register.actions";
import * as AuthActions from "../actions/authentication.actions";
import { AuthenticationResponse, AuthenticationService } from "../../services/authentication.service";
import { ClearResources, LoadResources } from "../actions/resource.actions";
import { UserGetModel, UserService } from "../../services/user.service";

export type Action = AuthActions.Actions;

@Injectable()
export class AuthenticationEffects {
  constructor(
    private actions: Actions,
    private authService: AuthenticationService,
    private userService: UserService,
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

  @Effect()
  loginWithLocalStorage: Observable<Action> = this.actions.pipe(
    ofType(AuthActions.LOGIN_WITH_LOCAL_STORAGE),
    mergeMap((action: AuthActions.LoginWithLocalStorage) =>
      this.userService.get(action.payload.userId).pipe(
        map((data: UserGetModel) => new AuthActions.LoginSuccess({
          ...action.payload,
          userDetails: data
        })),
        catchError(error => of(new AuthActions.LoginFail({error: error.message})))
      )
    )
  );

  @Effect()
  loginSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActions.LOGIN_SUCCESS, RegisterActions.REGISTER_SUCCESS),
    tap((action: AuthActions.LoginSuccess) => {
      // Store retrieved authentication info
      localStorage.setItem('login', JSON.stringify({
        userId: action.payload.userId,
        token: action.payload.token
      }));

      this.router.navigateByUrl('/dashboard');
    }),
    map((action: AuthActions.LoginSuccess) => new LoadResources(action.payload.userDetails))
  );

  @Effect({dispatch: false})
  loginFail: Observable<any> = this.actions.pipe(
    ofType(AuthActions.LOGIN_FAIL),
  );

  @Effect()
  logout: Observable<any> = this.actions.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('login');
      this.router.navigateByUrl('/');
    }),
    map(() => new ClearResources())
  );
}
