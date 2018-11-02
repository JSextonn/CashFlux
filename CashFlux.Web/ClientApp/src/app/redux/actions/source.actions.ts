import { Action } from '@ngrx/store';
import { FluxSource } from "../reducers/source.reducer";

export const ADD = '[FluxSource] Add flux source';
export const ADD_MANY = '[FluxSource] Add many flux sources';
export const REMOVE = '[FluxSource] Remove flux source';
export const REMOVE_MANY = '[FluxSource] Remove many flux sources';

export class AddSource implements Action {
    readonly type = ADD;

    constructor(public payload: FluxSource) { }
}

export class AddSources implements Action {
    readonly type = ADD_MANY;

    constructor(public payload: FluxSource[]) { }
}

export class RemoveSource implements Action {
    readonly type = REMOVE;

    constructor(public payload: string) { }
}

export class RemoveSources implements Action {
    readonly type = REMOVE_MANY;

    constructor(public payload: string[]) { }
}

export type Actions = AddSource | AddSources | RemoveSource | RemoveSources;
