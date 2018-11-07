import { Action } from "@ngrx/store";
import { AuthenticationRequest } from "../../services/authentication.service";
import { AuthenticationSuccessInfo } from "../reducers/authentication.reducer";

export const LOGIN = '[Authentication] Login process started';
export const LOGIN_WITH_LOCAL_STORAGE = '[Authentication] Login process started with local storage data';
export const LOGIN_SUCCESS = '[Authentication] Login was a success';
export const LOGIN_FAIL = '[Authentication] Login was a failure';
export const LOGOUT = '[Authentication] Logged out';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: AuthenticationRequest) { }
}

export class LoginWithLocalStorage implements Action {
  readonly type = LOGIN_WITH_LOCAL_STORAGE;

  constructor(public payload: { token: string, userId: string }) { }
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: AuthenticationSuccessInfo) { }
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payload?: any) { }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type Actions =
  Login
  | LoginSuccess
  | LoginFail
  | Logout;
