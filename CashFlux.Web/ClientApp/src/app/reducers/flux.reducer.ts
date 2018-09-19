import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CashFlux } from '../models/flux.model';
import * as FluxActions from '../actions/flux.actions';
import * as fromSource from './source.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { nextId } from '../util/id-tools';
import { FluxTableModel } from '../models/flux-table.model';
import { FluxSource } from '../models/source.model';

export interface State extends EntityState<CashFlux> { }

export const adapter: EntityAdapter<CashFlux> = createEntityAdapter<CashFlux>();

export const initialState: State = adapter.getInitialState();

export function fluxReducer(state = initialState, action: FluxActions.Actions): State {
    switch (action.type) {
        case FluxActions.ADD: {
            action.payload.id = nextId(state.ids as string[]);
            return adapter.addOne(action.payload, state);
        }

        case FluxActions.ADD_MANY: {
            action.payload.map(flux => flux.id = nextId(state.ids as string[]));
            return adapter.addMany(action.payload, state);
        }

        case FluxActions.REMOVE: {
            return adapter.removeOne(action.payload, state);
        }

        case FluxActions.REMOVE_MANY: {
            return adapter.removeMany(action.payload, state);
        }

        default: {
            return state;
        }
    }
}

export const selectFluxState = createFeatureSelector<State>('fluxes');
export const selectSourceState = createFeatureSelector<fromSource.State>('sources');
export const selectedProfileState = createFeatureSelector<string>('selectedProfile');

// Default selectors
const { selectIds, selectEntities, selectAll } = adapter.getSelectors();

export const selectFluxIds = createSelector(
    selectFluxState,
    selectIds
);

export const selectAllFluxes = createSelector(
    selectFluxState,
    selectAll
);

export const selectFluxEntities = createSelector(
    selectFluxState,
    selectEntities
);

export const selectFluxesInSelectedProfile = createSelector(
    selectAllFluxes,
    selectedProfileState,
    (fluxes, selectedProfile) => fluxes.filter(flux => flux.profileId === selectedProfile)
);

export const selectFluxTableModels = createSelector(
    selectFluxesInSelectedProfile,
    fromSource.selectSourceEntities,
    (fluxes, sources) => {
        const models: FluxTableModel[] = [];

        fluxes.forEach(flux => {
            const source: FluxSource = sources[flux.sourceId];
            models.push({
                id: flux.id,
                amount: flux.amount,
                source: source.name,
                category: source.category,
                timeCreated: flux.timeCreated
            });
        });
        return models;
    }
);
