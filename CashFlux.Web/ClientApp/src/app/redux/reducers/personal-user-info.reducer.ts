import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as PersonalUserInfoAction from "../actions/personal-user-info.actions";

export interface PersonalUserInfoState {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  timeCreated: Date;
}

export const initialState: PersonalUserInfoState = {
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  timeCreated: null
};

export function personalUserInfoReducer(state = initialState, action: PersonalUserInfoAction.Actions): PersonalUserInfoState {
  switch (action.type) {
    case PersonalUserInfoAction.LOAD_USER_INFO: {
      return {
        username: action.payload.username,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        timeCreated: action.payload.timeCreated
      }
    }

    case PersonalUserInfoAction.CLEAR_USER_INFO: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const selectPersonalUserInfoState = createFeatureSelector<PersonalUserInfoState>('personalUserInfo');

// Default selectors
export const selectPersoanlUserInfo = createSelector(
  selectPersonalUserInfoState,
  (state) => state
);

