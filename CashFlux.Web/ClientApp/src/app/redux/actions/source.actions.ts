import { Action } from '@ngrx/store';
import { FluxSource } from "../reducers/source.reducer";
import { CloudTransferModel } from "../cloud-transfer.model";
import { ClientGetModel } from "../client-get.model";
import { SourceGetModel } from "../../services/source.service";
import { Update } from "@ngrx/entity";

export const ADD_SOURCE = '[FluxSource] Add flux source';
export const ADD_SOURCE_SUCCESS = '[FluxSource] Flux source was successfully added';
export const UPDATE_SOURCE = '[FluxSource] Flux Source was updated';
export const ADD_SOURCES = '[FluxSource] Add many flux sources';
export const REMOVE_SOURCE = '[FluxSource] Remove flux source';
export const REMOVE_SOURCE_SUCCESS = '[FluxSource] Flux source was successfully removed';
export const REMOVE_SOURCES = '[FluxSource] Remove many flux sources';
export const REMOVE_SOURCEs_SUCCESS = '[FluxSource] Flux sources were successfully removed';
export const CLEAR_SOURCES = '[FluxSource] All flux sources have been cleared';

export class AddSource implements Action {
  readonly type = ADD_SOURCE;

  constructor(public payload: CloudTransferModel<FluxSource>) { }
}

export class AddSourceSuccess implements Action {
  readonly type = ADD_SOURCE_SUCCESS;

  constructor(public payload: ClientGetModel<SourceGetModel>) { }
}

export class UpdateSource implements Action {
  readonly type = UPDATE_SOURCE;

  constructor(public payload: Update<FluxSource>) { }
}

export class AddSources implements Action {
  readonly type = ADD_SOURCES;

  constructor(public payload: FluxSource[]) { }
}

export class RemoveSource implements Action {
  readonly type = REMOVE_SOURCE;

  constructor(public payload: string) { }
}

// TODO: Allow client to remove sources one at a time
//export class RemoveSourceSuccess implements Action {
//  readonly type = ADD_SOURCE;
//
//  constructor(public payload: FluxSource) { }
//}

export class RemoveSources implements Action {
  readonly type = REMOVE_SOURCES;

  constructor(public payload: string[]) { }
}

// TODO: Allow client to remove multiple sources at once
//export class RemoveSourcesSuccess implements Action {
//  readonly type = REMOVE_SOURCES;
//
//  constructor(public payload: string[]) { }
//}

export class ClearSources implements Action {
  readonly type = CLEAR_SOURCES;
}

export type Actions =
  AddSource
  | AddSourceSuccess
  | UpdateSource
  | AddSources
  | RemoveSource
  | RemoveSources
  | ClearSources;
