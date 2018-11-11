import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as SourceActions from '../actions/source.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { currentIdOrNext } from "../id.tools";

export interface State extends EntityState<FluxSource> {}

export interface FluxSource {
  id?: string;
  cloudId?: string;
  name: string;
  category: string;
  timeCreated: Date;
}

export const adapter: EntityAdapter<FluxSource> = createEntityAdapter<FluxSource>();

export const initialState: State = adapter.getInitialState();

export function sourceReducer(state = initialState, action: SourceActions.Actions): State {
  switch (action.type) {
    case SourceActions.ADD_SOURCE: {
      action.payload.model.id = currentIdOrNext(action.payload.model.id, state.ids as string[]);
      return adapter.addOne(action.payload.model, state);
    }

    case SourceActions.ADD_SOURCES: {
      action.payload.map(source => source.id = currentIdOrNext(source.id, state.ids as string[]));
      return adapter.addMany(action.payload, state);
    }

    case SourceActions.UPDATE_SOURCE: {
      return adapter.updateOne(action.payload, state);
    }

    case SourceActions.REMOVE_SOURCES: {
      return adapter.removeMany(action.payload.reduxIds, state);
    }

    case SourceActions.CLEAR_SOURCES: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const selectSourceState = createFeatureSelector<State>('sources');

// Default selectors
const {selectIds, selectEntities, selectAll} = adapter.getSelectors();

export const selectSourceIds = createSelector(
  selectSourceState,
  selectIds
);

export const selectAllSources = createSelector(
  selectSourceState,
  selectAll
);

export const selectSourceEntities = createSelector(
  selectSourceState,
  selectEntities
);
