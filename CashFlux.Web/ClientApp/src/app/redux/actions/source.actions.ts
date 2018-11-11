import { Action } from '@ngrx/store';
import { FluxSource } from "../reducers/source.reducer";
import { CloudTransferModel } from "../cloud-transfer.model";
import {
  SourceDeleteMultipleResult,
  SourceGetModel,
  SourceMainDeleteMultipleModel
} from "../../services/source.service";
import { Update } from "@ngrx/entity";

export const ADD_SOURCE = '[FluxSource] Add flux source';
export const ADD_SOURCE_SUCCESS = '[FluxSource] Flux source was successfully added';
export const UPDATE_SOURCE = '[FluxSource] Flux Source was updated';
export const ADD_SOURCES = '[FluxSource] Add many flux sources';
export const REMOVE_SOURCES = '[FluxSource] Remove many flux sources';
export const REMOVE_SOURCES_SUCCESS = '[FluxSource] Flux sources were successfully removed';
export const CLEAR_SOURCES = '[FluxSource] All flux sources have been cleared';

export class AddSource implements Action {
  readonly type = ADD_SOURCE;

  constructor(public payload: CloudTransferModel<FluxSource>) { }
}

export class AddSourceSuccess implements Action {
  readonly type = ADD_SOURCE_SUCCESS;

  constructor(public payload: SourceGetModel) { }
}

export class UpdateSource implements Action {
  readonly type = UPDATE_SOURCE;

  constructor(public payload: Update<FluxSource>) { }
}

export class AddSources implements Action {
  readonly type = ADD_SOURCES;

  constructor(public payload: FluxSource[]) { }
}

export class RemoveSources implements Action {
  readonly type = REMOVE_SOURCES;

  constructor(public payload: SourceMainDeleteMultipleModel) { }
}

export class RemoveSourcesSuccess implements Action {
  readonly type = REMOVE_SOURCES_SUCCESS;

  constructor(public payload: SourceDeleteMultipleResult) { }
}

export class ClearSources implements Action {
  readonly type = CLEAR_SOURCES;
}

export type Actions =
  AddSource
  | AddSourceSuccess
  | UpdateSource
  | AddSources
  | RemoveSources
  | RemoveSourcesSuccess
  | ClearSources;
