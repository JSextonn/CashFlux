import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import * as RegisterActions from "../actions/register.actions";
import * as AuthActions from "../actions/authentication.actions";
import { UserCreateModel, UserService } from "../../services/user.service";

export type Action = RegisterActions.Actions;

@Injectable()
export class RegisterEffects {
  constructor(private actions: Actions, private userService: UserService) { }

  @Effect()
  register: Observable<Action> = this.actions.pipe(
    ofType(RegisterActions.REGISTER),
    mergeMap((action: RegisterActions.Register) =>
      this.userService.add(action.payload).pipe(
        map((data: UserCreateModel) => new RegisterActions.RegisterSuccess(data)),
        catchError(error => of(new RegisterActions.RegisterFail({error: error.message})))
      )
    )
  );

  @Effect()
  registerSuccess: Observable<any> = this.actions.pipe(
    ofType(RegisterActions.REGISTER_SUCCESS),
    map((action: RegisterActions.RegisterSuccess) => new AuthActions.LoginSuccess(action.payload)),
    catchError(error => of(new AuthActions.LoginFail({error: error.message})))
  );

  @Effect({dispatch: false})
  registerFail: Observable<any> = this.actions.pipe(
    ofType(RegisterActions.REGISTER_FAIL),
  );
}
