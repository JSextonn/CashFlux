import * as fromProfile from './reducers/profile.reducer';
import * as fromFlux from './reducers/flux.reducer';
import * as fromSource from './reducers/source.reducer';

export interface AppState {
    profiles: fromProfile.State;
    fluxes: fromFlux.State;
    sources: fromSource.State;
    selectedProfileId: string;
}
