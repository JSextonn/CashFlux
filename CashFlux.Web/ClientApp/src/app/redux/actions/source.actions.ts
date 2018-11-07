import { Action } from '@ngrx/store';
import { FluxSource } from "../reducers/source.reducer";

export const ADD_SOURCE = '[FluxSource] Add flux source';
export const ADD_SOURCES = '[FluxSource] Add many flux sources';
export const REMOVE_SOURCE = '[FluxSource] Remove flux source';
export const REMOVE_SOURCES = '[FluxSource] Remove many flux sources';
export const CLEAR_SOURCES = '[FluxSource] All flux sources have been cleared';

export class AddSource implements Action {
  readonly type = ADD_SOURCE;

  constructor(public payload: FluxSource) { }
}

export class AddSources implements Action {
  readonly type = ADD_SOURCES;

  constructor(public payload: FluxSource[]) { }
}

export class RemoveSource implements Action {
  readonly type = REMOVE_SOURCE;

  constructor(public payload: string) { }
}

export class RemoveSources implements Action {
  readonly type = REMOVE_SOURCES;

  constructor(public payload: string[]) { }
}

export class ClearSources implements Action {
  readonly type = CLEAR_SOURCES;
}

export type Actions = AddSource | AddSources | RemoveSource | RemoveSources | ClearSources;
