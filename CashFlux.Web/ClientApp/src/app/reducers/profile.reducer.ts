import { FluxProfile } from '../models/profile.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ProfileActions from '../actions/profile.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends EntityState<FluxProfile> { }

export const adapter: EntityAdapter<FluxProfile> = createEntityAdapter<FluxProfile>();

export const initialState: State = adapter.getInitialState();

export function profileReducer(state = initialState, action: ProfileActions.Actions): State {
    switch (action.type) {
        case ProfileActions.ADD: {
            return adapter.addOne(action.payload, state);
        }

        case ProfileActions.ADD_MANY: {
            return adapter.addMany(action.payload, state);
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
const { selectIds, selectEntities, selectAll } = adapter.getSelectors();

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
