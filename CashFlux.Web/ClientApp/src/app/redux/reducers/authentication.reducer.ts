import * as AuthActions from "../actions/authentication.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserGetModel } from "../../services/user.service";

export interface AuthenticationSuccessInfo {
  token: string;
  userId: string;
  userDetails: UserGetModel;
}

export interface AuthenticationState {
  loggedIn: boolean;
  token: string;
  userId: string;
  loading: boolean;
  errorMessage: string;
}

export const initialState: AuthenticationState = {
  loggedIn: false,
  token: null,
  userId: null,
  loading: false,
  errorMessage: null
};

const loginFailureMessage = 'Login failed with given credentials';

export function authenticationReducer(state = initialState, action: AuthActions.Actions): AuthenticationState {
  switch (action.type) {
    case AuthActions.LOGIN: {
      return {...state, loading: true};
    }
    case AuthActions.LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        token: action.payload.token,
        userId: action.payload.userId,
        errorMessage: null,
        loading: false
      };
    }
    case AuthActions.LOGIN_FAIL: {
      return {...state, errorMessage: loginFailureMessage, loading: false};
    }
    case AuthActions.LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export const selectAuthenticationState = createFeatureSelector<AuthenticationState>('authentication');

// Default selectors
export const selectAuthentication = createSelector(
  selectAuthenticationState,
  (state) => state
);

