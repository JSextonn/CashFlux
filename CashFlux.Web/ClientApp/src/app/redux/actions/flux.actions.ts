import { Action } from '@ngrx/store';
import { Flux as CashFlux } from "../reducers/flux.reducer";

export const ADD_FLUX = '[CashFlux] Add flux';
export const ADD_FLUXES = '[CashFlux] Add many fluxes';
export const REMOVE_FLUX = '[CashFlux] Remove flux';
export const REMOVE_FLUXES = '[CashFlux] Remove many fluxes';
export const CLEAR_FLUXES = '[CashFlux] All fluxes were cleared from store';

export class AddFlux implements Action {
  readonly type = ADD_FLUX;

  constructor(public payload: CashFlux) { }
}

export class AddFluxes implements Action {
  readonly type = ADD_FLUXES;

  constructor(public payload: CashFlux[]) { }
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

export type Actions = AddFlux | AddFluxes | RemoveFlux | RemoveFluxes | ClearFluxes;
