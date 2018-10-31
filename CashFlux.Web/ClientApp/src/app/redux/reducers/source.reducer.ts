import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as SourceActions from '../actions/source.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { nextId } from '../../util/id-tools';
import { FluxSource } from '../models/source.model';

export interface State extends EntityState<FluxSource> { }

export const adapter: EntityAdapter<FluxSource> = createEntityAdapter<FluxSource>();

export const initialState: State = adapter.getInitialState();

export function sourceReducer(state = initialState, action: SourceActions.Actions): State {
    switch (action.type) {
        case SourceActions.ADD: {
            action.payload.id = nextId(state.ids as string[]);
            return adapter.addOne(action.payload, state);
        }

        case SourceActions.ADD_MANY: {
            action.payload.map(flux => flux.id = nextId(state.ids as string[]));
            return adapter.addMany(action.payload, state);
        }

        case SourceActions.REMOVE: {
            return adapter.removeOne(action.payload, state);
        }

        case SourceActions.REMOVE_MANY: {
            return adapter.removeMany(action.payload, state);
        }

        default: {
            return state;
        }
    }
}

export const selectSourceState = createFeatureSelector<State>('sources');

// Default selectors
const { selectIds, selectEntities, selectAll } = adapter.getSelectors();

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
