import { Action } from '@ngrx/store';
import { Flux as CashFlux } from "../reducers/flux.reducer";

export const ADD = '[CashFlux] Add flux';
export const ADD_MANY = '[CashFlux] Add many fluxes';
export const REMOVE = '[CashFlux] Remove flux';
export const REMOVE_MANY = '[CashFlux] Remove many fluxes';

export class AddFlux implements Action {
    readonly type = ADD;

    constructor(public payload: CashFlux) { }
}

export class AddFluxes implements Action {
    readonly type = ADD_MANY;

    constructor(public payload: CashFlux[]) { }
}

export class RemoveFlux implements Action {
    readonly type = REMOVE;

    constructor(public payload: string) { }
}

export class RemoveFluxes implements Action {
    readonly type = REMOVE_MANY;

    constructor(public payload: string[]) { }
}

export type Actions = AddFlux | AddFluxes | RemoveFlux | RemoveFluxes;
