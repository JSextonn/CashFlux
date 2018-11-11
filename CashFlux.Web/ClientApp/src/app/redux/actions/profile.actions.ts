import { Action } from '@ngrx/store';
import { Update } from "@ngrx/entity";
import { ProfileDeleteModel, ProfileGetModel } from "../../services/profile.service";
import { FluxProfile } from "../reducers/profile.reducer";
import { ClientGetModel } from "../client-get.model";
import { CloudTransferModel } from "../cloud-transfer.model";

export const ADD_PROFILE = '[FluxProfile] Added flux profile';
export const ADD_PROFILE_SUCCESS = '[FluxProfile] Adding flux profile was a success on the cloud';
export const ADD_PROFILE_FAIL = '[FluxProfile] Adding flux profile was a failure on the cloud';
export const ADD_MANY_PROFILES = '[FluxProfile] Add many flux profiles';
export const UPDATE_PROFILE = '[FluxProfile] Update flux profile';
export const REMOVE_PROFILE = '[FluxProfile] Remove flux profile';
export const REMOVE_PROFILE_SUCCESS = '[FluxProfile] Removing flux profile from the cloud was a success';
export const REMOVE_PROFILE_FAIL = '[FluxProfile] Removing flux profile from the cloud failed';
export const CLEAR_PROFILES = '[FluxProfile] All profiles were cleared';

export class AddProfile implements Action {
  readonly type = ADD_PROFILE;

  constructor(public payload: CloudTransferModel<FluxProfile>) { }
}

export class AddProfileSuccess implements Action {
  readonly type = ADD_PROFILE_SUCCESS;

  constructor(public payload: ClientGetModel<ProfileGetModel>) { }
}

export class AddProfileFail implements Action {
  readonly type = ADD_PROFILE_FAIL;

  constructor(public payload?: any) { }
}

export class AddProfiles implements Action {
  readonly type = ADD_MANY_PROFILES;

  constructor(public payload: FluxProfile[]) { }
}

export class UpdateProfile implements Action {
  readonly type = UPDATE_PROFILE;

  constructor(public payload: Update<FluxProfile>) { }
}

export class RemoveProfile implements Action {
  readonly type = REMOVE_PROFILE;

  constructor(public payload: string) { }
}

export class RemoveProfileSuccess implements Action {
  readonly type = REMOVE_PROFILE_SUCCESS;

  constructor(public payload: ProfileDeleteModel) { }
}

export class RemoveProfileFail implements Action {
  readonly type = REMOVE_PROFILE_FAIL;

  constructor(public payload?: any) { }
}

export class ClearProfiles implements Action {
  readonly type = CLEAR_PROFILES;
}

export type Actions =
  AddProfile
  | AddProfileSuccess
  | AddProfileFail
  | AddProfiles
  | UpdateProfile
  | RemoveProfile
  | RemoveProfileSuccess
  | RemoveProfileFail
  | ClearProfiles;
