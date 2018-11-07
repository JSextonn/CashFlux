import { Action } from "@ngrx/store";
import { UserGetModel } from "../../services/user.service";

export const LOAD_USER_INFO = '[PersonalUserInfo] Loaded personal user info into state';
export const CLEAR_USER_INFO = '[PersonalUserInfo] Cleared personal user info from state';

export class LoadPersonalUserInfo implements Action {
  readonly type = LOAD_USER_INFO;

  constructor(public payload: UserGetModel) { }
}

export class ClearPersonalUserInfo implements Action {
  readonly type = CLEAR_USER_INFO;
}

export type Actions = LoadPersonalUserInfo | ClearPersonalUserInfo;

