import * as fromProfile from '../redux/reducers/profile.reducer';
import * as fromFlux from '../redux/reducers/flux.reducer';
import * as fromSource from '../redux/reducers/source.reducer';
import { AuthenticationState } from "./reducers/authentication.reducer";
import { RegisterState } from "./reducers/register.reducer";
import { LoadResourcesState } from "./reducers/resource.reducer";
import { PersonalUserInfoState } from "./reducers/personal-user-info.reducer";

export interface AppState {
  authorization: AuthenticationState;
  register: RegisterState;
  resources: LoadResourcesState;
  personalUserInfo: PersonalUserInfoState;
  profiles: fromProfile.State;
  fluxes: fromFlux.State;
  sources: fromSource.State;
  selectedProfileId: string;
}
