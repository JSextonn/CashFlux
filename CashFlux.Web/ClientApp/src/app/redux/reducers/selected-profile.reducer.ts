import * as SelectedProfileActions from '../actions/selected-profile.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const initialState = '';

export function selectedProfileReducer(state = initialState, action: SelectedProfileActions.Actions): string {
  switch (action.type) {
    case SelectedProfileActions.SELECT: {
      return action.payload;
    }

    case SelectedProfileActions.CLEAR: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const selectSelectedProfileState = createFeatureSelector<string>('selectedProfile');

// Default selectors
export const selectSelectedProfile = createSelector(
  selectSelectedProfileState,
  (state) => state
);
