import { Action } from "@ngrx/store";
import {
  AuthenticationState,
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  RegisterResponse
} from "../reducers/auth.reducer";

export const LOGIN = '[Authentication] Login process started';
export const LOGIN_SUCCESS = '[Authentication] Login was a success';
export const LOGIN_FAIL = '[Authentication] Login was a failure';
export const LOAD_PREVIOUS_LOGIN = '[Authentication] Previous login info loaded';
export const LOGOUT = '[Authentication] Logged out';

export const REGISTER = '[Register] Registration process has started';
export const REGISTER_SUCCESS = '[Register] Registration was a success';
export const REGISTER_FAIL = '[Register] Registration failed';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: LoginCredentials) { }
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: AuthResponse) { }
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payload?: any) { }
}

export class LoadPreviousLogin implements Action {
  readonly type = LOAD_PREVIOUS_LOGIN;

  constructor(public payload: AuthenticationState) { }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class Register implements Action {
  readonly type = REGISTER;

  constructor(public payload: RegisterCredentials) { }
}

export class RegisterSuccess implements Action {
  readonly type = REGISTER_SUCCESS;

  constructor(public payload: RegisterResponse) { }
}

export class RegisterFail implements Action {
  readonly type = REGISTER_FAIL;

  constructor(public payload?: any) { }
}

export type Actions =
  Login | LoginSuccess | LoginFail | LoadPreviousLogin | Logout | Register | RegisterSuccess | RegisterFail;
