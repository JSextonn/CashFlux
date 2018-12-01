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
export const REMOVE_FLUXES = '[CashFlux] Remove many fluxes';
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

export class RemoveFluxes implements Action {
  readonly type = REMOVE_FLUXES;

  constructor(public payload: string[]) { }
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
  | RemoveFluxes
  | ClearFluxes;
