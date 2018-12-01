import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as FluxActions from '../actions/flux.actions';
import * as fromSource from './source.reducer';
import { FluxSource } from './source.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { currentIdOrNext } from "../id.tools";
import { selectSelectedProfile } from "./selected-profile.reducer";
import { ProfileGetModel } from "../../services/profile.service";
import ADD_FLUX = FluxActions.ADD_FLUX;

export interface State extends EntityState<Flux> {}

export interface FluxTableModel {
  id: string;
  cloudId: string;
  amount: number;
  source: string;
  category: string;
  timeCreated: Date;
}

export interface Flux {
  id?: string;
  cloudId?: string;
  amount: number;
  profileId: string;
  sourceId: string;
  timeCreated: Date;
}

export interface CreatedFlux {
  flux: Flux;
  cloudIds: {
    profileId: string;
    sourceId: string;
  }
}

export const adapter: EntityAdapter<Flux> = createEntityAdapter<Flux>({
  sortComparer: (fluxOne, fluxTwo) => {
    if (fluxOne.timeCreated.getTime() > fluxTwo.timeCreated.getTime()) {
      return 1;
    } else if (fluxOne.timeCreated.getTime() < fluxTwo.timeCreated.getTime()) {
      return -1;
    } else {
      return 0;
    }
  }
});

export const initialState: State = adapter.getInitialState();

export function fluxReducer(state = initialState, action: FluxActions.Actions): State {
  switch (action.type) {
    case ADD_FLUX: {
      action.payload.flux.id = currentIdOrNext(action.payload.flux.id, state.ids as string[]);
      return adapter.addOne(action.payload.flux, state);
    }

    case FluxActions.ADD_FLUXES: {
      action.payload.map(flux => flux.id = currentIdOrNext(flux.id, state.ids as string[]));
      return adapter.addMany(action.payload, state);
    }

    case FluxActions.UPDATE_FLUX: {
      return adapter.updateOne(action.payload.update, state);
    }

    case FluxActions.UPDATE_FLUX_LOCAL: {
      return adapter.updateOne(action.payload, state);
    }

    case FluxActions.REMOVE_FLUX: {
      return adapter.removeOne(action.payload, state);
    }

    case FluxActions.REMOVE_FLUXES: {
      return adapter.removeMany(action.payload, state);
    }

    case FluxActions.CLEAR_FLUXES: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const selectFluxState = createFeatureSelector<State>('fluxes');
export const selectSourceState = createFeatureSelector<fromSource.State>('sources');

// Default selectors
const {selectIds, selectEntities, selectAll} = adapter.getSelectors();

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
  selectSelectedProfile,
  (fluxes, selectedProfile) => fluxes.filter(flux => flux.profileId === selectedProfile.id)
);

export const selectFluxTableModels = createSelector(
  selectFluxesInSelectedProfile,
  fromSource.selectSourceEntities,
  (fluxes, sources) => {
    const models: FluxTableModel[] = [];

    // Every selected flux will be paired with its sources properties
    // in a denormalized fashion.
    fluxes.forEach(flux => {
      const source: FluxSource = sources[flux.sourceId];
      models.push({
        id: flux.id,
        cloudId: flux.cloudId,
        amount: flux.amount,
        source: source.name,
        category: source.category,
        timeCreated: flux.timeCreated
      });
    });
    return models;
  }
);

export function mapProfileResponseToClientFluxes(profiles: ProfileGetModel[]): Flux[] {
  return [];
}
