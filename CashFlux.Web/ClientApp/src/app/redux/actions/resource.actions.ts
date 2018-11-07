import { Action } from "@ngrx/store";
import { UserGetModel } from "../../services/user.service";

export const LOAD_RESOURCES = '[LoadResources] Started loading user resources';
export const LOAD_RESOURCES_COMPLETE = '[LoadResources] User resources have been loaded';
export const CLEAR_RESOURCES = '[LoadResources] All resources have been cleared';

export class LoadResources implements Action {
  readonly type = LOAD_RESOURCES;

  constructor(public payload: UserGetModel) { }
}

export class LoadResourcesComplete implements Action {
  readonly type = LOAD_RESOURCES_COMPLETE;
}

export class ClearResources implements Action {
  readonly type = CLEAR_RESOURCES;
}

export type Actions = LoadResources | LoadResourcesComplete | ClearResources;
