import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as ProfileActions from '../actions/profile.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { currentIdOrNext } from "../id.tools";
import { ProfileGetModel } from "../../services/profile.service";

export interface State extends EntityState<FluxProfile> {}

export interface FluxProfile {
  id?: string;
  // Cloud id is nullable because the response with the id might not have arrived.
  cloudId?: string;
  name: string;
  timeCreated: Date;
}

export const adapter: EntityAdapter<FluxProfile> = createEntityAdapter<FluxProfile>();

export const initialState: State = adapter.getInitialState();

export function profileReducer(state = initialState, action: ProfileActions.Actions): State {
  switch (action.type) {
    case ProfileActions.ADD_PROFILE: {
      action.payload.model.id = currentIdOrNext(action.payload.model.id, state.ids as string[]);
      return adapter.addOne(action.payload.model, state);
    }

    case ProfileActions.ADD_MANY_PROFILES: {
      action.payload.map(profile => profile.id = currentIdOrNext(profile.id, state.ids as string[]));
      return adapter.addMany(action.payload, state);
    }

    case ProfileActions.UPDATE_PROFILE: {
      return adapter.updateOne(action.payload.update, state);
    }

    case ProfileActions.UPDATE_PROFILE_LOCAL: {
      return adapter.updateOne(action.payload, state);
    }

    case ProfileActions.REMOVE_PROFILE: {
      return adapter.removeOne(action.payload, state);
    }

    // TODO: Currently remove success and fail are being triggered but not being handled.

    case ProfileActions.CLEAR_PROFILES: {
      return initialState;
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

export const selectProfileCloudIds = createSelector(
  selectAllProfiles,
  (profiles) => profiles.map(profile => profile.cloudId)
);

export function mapProfileResponseToClientProfile(profiles: ProfileGetModel[]): FluxProfile[] {
  return profiles.map(profile => {
    return {
      cloudId: profile.id,
      name: profile.name,
      timeCreated: profile.timeCreated
    };
  });
}
