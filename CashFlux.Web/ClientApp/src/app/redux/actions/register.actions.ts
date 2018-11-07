import { Action } from "@ngrx/store";
import { UserCreateModel, UserPostModel } from "../../services/user.service";

export const REGISTER = '[Register] Registration process has started';
export const REGISTER_SUCCESS = '[Register] Registration was a success';
export const REGISTER_FAIL = '[Register] Registration failed';

export class Register implements Action {
  readonly type = REGISTER;

  constructor(public payload: UserPostModel) { }
}

export class RegisterSuccess implements Action {
  readonly type = REGISTER_SUCCESS;

  constructor(public payload: UserCreateModel) { }
}

export class RegisterFail implements Action {
  readonly type = REGISTER_FAIL;

  constructor(public payload?: any) { }
}

export type Actions = Register | RegisterSuccess | RegisterFail;
