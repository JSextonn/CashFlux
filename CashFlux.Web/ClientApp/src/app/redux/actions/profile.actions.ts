import { Action } from '@ngrx/store';
import { Update } from "@ngrx/entity";
import { FluxProfile } from "../reducers/profile.reducer";

export const ADD = '[FluxProfile] Add flux profile';
export const ADD_MANY = '[FluxProfile] Add many flux profiles';
export const UPDATE = '[FluxProfile] Update flux profile';
export const UPSERT = '[FluxProfile] Upsert flux profile';
export const REMOVE = '[FluxProfile] Remove flux profile';
export const REMOVE_MANY = '[FluxProfile] Remove many flux profiles';

export class AddProfile implements Action {
  readonly type = ADD;

  constructor(public payload: FluxProfile) { }
}

export class AddProfiles implements Action {
  readonly type = ADD_MANY;

  constructor(public payload: FluxProfile[]) { }
}

export class UpdateProfile implements Action {
  readonly type = UPDATE;

  constructor(public payload: Update<FluxProfile>) { }
}

export class UpsertProfile implements Action {
  readonly type = UPSERT;

  constructor(public payload: FluxProfile) { }
}

export class RemoveProfile implements Action {
  readonly type = REMOVE;

  constructor(public payload: string) { }
}

export class RemoveProfiles implements Action {
  readonly type = REMOVE_MANY;

  constructor(public payload: string[]) { }
}

export type Actions = AddProfile | AddProfiles | UpdateProfile | UpsertProfile | RemoveProfile | RemoveProfiles;
