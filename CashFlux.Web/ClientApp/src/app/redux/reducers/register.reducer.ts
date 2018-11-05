
import * as RegisterActions from "../actions/register.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface RegisterState {
  loading: boolean;
  errorMessage: string;
}

export const initialState: RegisterState = {
  loading: false,
  errorMessage: null
};

const registerFailureMessage = 'That username appears to already be in use.';

export function registerReducer(state = initialState, action: RegisterActions.Actions): RegisterState {
  switch (action.type) {
    case RegisterActions.REGISTER: {
      return {...state, loading: true};
    }

    case RegisterActions.REGISTER_SUCCESS: {
      return {
        ...state,
        errorMessage: null,
        loading: false
      };
    }

    case RegisterActions.REGISTER_FAIL: {
      return {...state, errorMessage: registerFailureMessage, loading: false};
    }

    default: {
      return state;
    }
  }
}

export const selectRegisterState = createFeatureSelector<RegisterState>('register');

// Default selectors
export const selectRegister = createSelector(
  selectRegisterState,
  (state) => state
);

