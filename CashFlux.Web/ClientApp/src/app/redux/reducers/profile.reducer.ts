import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as ProfileActions from '../actions/profile.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { nextId } from "../../util/id-tools";

export interface State extends EntityState<FluxProfile> {}

export interface FluxProfile {
  id?: string;
  name: string;
  timeCreated: Date;
}

export const adapter: EntityAdapter<FluxProfile> = createEntityAdapter<FluxProfile>();

export const initialState: State = adapter.getInitialState();

export function profileReducer(state = initialState, action: ProfileActions.Actions): State {
  switch (action.type) {
    case ProfileActions.ADD: {
      action.payload.id = nextId(state.ids as string[]);
      return adapter.addOne(action.payload, state);
    }
    case ProfileActions.ADD_MANY: {
      action.payload.map(profile => profile.id = nextId(state.ids as string[]));
      return adapter.addMany(action.payload, state);
    }
    case ProfileActions.UPDATE: {
      return adapter.updateOne(action.payload, state);
    }
    case ProfileActions.UPSERT: {
      return adapter.upsertOne(action.payload, state);
    }
    case ProfileActions.REMOVE: {
      return adapter.removeOne(action.payload, state);
    }
    case ProfileActions.REMOVE_MANY: {
      return adapter.removeMany(action.payload, state);
    }
    default: {
      return state;
    }
  }
}

export const selectProfileState = createFeatureSelector<State>('profiles');

// Default selectors
const {selectIds, selectEntities, selectAll} = adapter.getSelectors();

export const selectProfileIds = createSelector(
  selectProfileState,
  selectIds
);

export const selectAllProfiles = createSelector(
  selectProfileState,
  selectAll
);

export const selectProfileEntities = createSelector(
  selectProfileState,
  selectEntities
);
