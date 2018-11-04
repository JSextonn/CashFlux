import * as AuthActions from "../actions/auth.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  userId: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string
}

export interface RegisterResponse {
  userId: string;
  token: string;
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
const registerFailureMessage = 'That username appears to already be in use.';

export function authReducer(state = initialState, action: AuthActions.Actions): AuthenticationState {
  switch (action.type) {
    case AuthActions.LOGIN: {
      return {...state, loading: true};
    }

    case AuthActions.LOAD_PREVIOUS_LOGIN:
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

    case AuthActions.REGISTER: {
      return {...state, loading: true};
    }

    case AuthActions.REGISTER_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        token: action.payload.token,
        userId: action.payload.userId,
        errorMessage: null,
        loading: false
      };
    }

    case AuthActions.REGISTER_FAIL: {
      return {...state, errorMessage: registerFailureMessage, loading: false};
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

