import * as SelectedProfileActions from '../actions/selected-profile.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectProfileEntities } from "./profile.reducer";

export interface SelectedProfileState {
  localId: string;
  cloudId: string
}

export const initialState: SelectedProfileState = {
  localId: null,
  cloudId: null
};

export function selectedProfileReducer(state = initialState, action: SelectedProfileActions.Actions): SelectedProfileState {
  switch (action.type) {
    case SelectedProfileActions.SELECT_PROFILE: {
      return {
        localId: action.payload.id,
        cloudId: action.payload.cloudId
      }
    }

    case SelectedProfileActions.CLEAR_SELECTED_PROFILE: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const selectSelectedProfileState = createFeatureSelector<SelectedProfileState>('selectedProfile');

export const selectSelectedProfile = createSelector(
  selectProfileEntities,
  selectSelectedProfileState,
  (profileEntity, selectedProfileState) => profileEntity[selectedProfileState.localId]
);
