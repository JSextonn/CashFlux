import { Action } from '@ngrx/store';
import { CreatedFlux, Flux } from "../reducers/flux.reducer";
import { FluxGetModel } from "../../services/flux.service";
import { EntityUpdate } from "../../services/entity.service";
import { Update } from "@ngrx/entity";

export const ADD_FLUX = '[CashFlux] Add flux';
export const ADD_FLUX_SUCCESS = '[CashFlux] Flux was successfully added to the cloud';
export const ADD_FLUX_FAIL = '[CashFlux] Something went wrong adding the flux to the cloud';
export const ADD_FLUXES = '[CashFlux] Add many fluxes';
export const UPDATE_FLUX = '[CashFlux] Flux was updated';
export const UPDATE_FLUX_LOCAL = '[CashFlux] Flux was updated locally';
export const REMOVE_FLUX = '[CashFlux] Remove flux';
export const REMOVE_LOCAL_FLUXES = '[CashFlux] Fluxes were removed locally';
export const REMOVE_CLOUD_FLUXES = '[CashFlux] Attempting to delete fluxes on the cloud';
export const REMOVE_CLOUD_FLUXES_SUCCESS = '[CashFlux] Fluxes successfully deleted from cloud';
export const REMOVE_CLOUD_FLUXES_FAIL = '[CashFlux] Fluxes failed to delete from cloud';
export const LOAD_FLUXES = '[CashFlux] Fluxes successfully loaded';
export const CLEAR_FLUXES = '[CashFlux] All fluxes were cleared from store';

export class AddFlux implements Action {
  readonly type = ADD_FLUX;

  constructor(public payload: CreatedFlux) { }
}

export class AddFluxSuccess implements Action {
  readonly type = ADD_FLUX_SUCCESS;

  constructor(public payload: FluxGetModel) { }
}

export class AddFluxFail implements Action {
  readonly type = ADD_FLUX_FAIL;

  constructor(public payload?: any) { }
}

export class AddFluxes implements Action {
  readonly type = ADD_FLUXES;

  constructor(public payload: Flux[]) { }
}

export class UpdateFlux implements Action {
  readonly type = UPDATE_FLUX;

  constructor(public payload: EntityUpdate<Flux>) { }
}

export class UpdateFluxLocal implements Action {
  readonly type = UPDATE_FLUX_LOCAL;

  constructor(public payload: Update<Flux>) { }
}

export class RemoveFlux implements Action {
  readonly type = REMOVE_FLUX;

  constructor(public payload: string) { }
}

export class RemoveLocalFluxes implements Action {
  readonly type = REMOVE_LOCAL_FLUXES;

  constructor(public payload: string[]) { }
}

export class RemoveCloudFluxes implements Action {
  readonly type = REMOVE_CLOUD_FLUXES;

  constructor(public payload: string[]) { }
}

export class RemoveCloudFluxesSuccess implements Action {
  readonly type = REMOVE_CLOUD_FLUXES_SUCCESS;

  constructor(public payload: string[]) { }
}

export class RemoveCloudFluxesFail implements Action {
  readonly type = REMOVE_CLOUD_FLUXES_FAIL;

  constructor(public payload?: any) { }
}

export class LoadFluxes implements Action {
  readonly type = LOAD_FLUXES;

  constructor(public payload: Flux[]) { }
}

export class ClearFluxes implements Action {
  readonly type = CLEAR_FLUXES;
}

export type Actions =
  AddFlux
  | AddFluxSuccess
  | AddFluxFail
  | AddFluxes
  | UpdateFlux
  | UpdateFluxLocal
  | RemoveFlux
  | RemoveLocalFluxes
  | RemoveCloudFluxes
  | LoadFluxes
  | ClearFluxes;
