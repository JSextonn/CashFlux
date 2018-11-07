import * as ResourceActions from "../actions/resource.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface LoadResourcesState {
  loading: boolean;
  errorMessage: string;
}

export const initialState: LoadResourcesState = {
  loading: false,
  errorMessage: null
};

export function resourceReducer(state = initialState, action: ResourceActions.Actions): LoadResourcesState {
  switch (action.type) {
    case ResourceActions.LOAD_RESOURCES: {
      return {...state, loading: true}
    }
    case ResourceActions.LOAD_RESOURCES_COMPLETE: {
      return {loading: false, errorMessage: null}
    }
    case ResourceActions.CLEAR_RESOURCES: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export const selectLoadResourceState = createFeatureSelector<LoadResourcesState>('resources');

// Default selectors
export const selectLoadResources = createSelector(
  selectLoadResourceState,
  (state) => state
);


