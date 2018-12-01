import { Action } from '@ngrx/store';
import { FluxProfile } from "../reducers/profile.reducer";

export const SELECT_PROFILE = '[SelectedProfile] Selected the given profile';
export const CLEAR_SELECTED_PROFILE = '[SelectedProfile] Set selected profile to none.';

export class SelectProfile implements Action {
  readonly type = SELECT_PROFILE;

  constructor(public payload: FluxProfile) { }
}

export class ClearProfileSelection implements Action {
  readonly type = CLEAR_SELECTED_PROFILE;
}

export type Actions = SelectProfile | ClearProfileSelection;
