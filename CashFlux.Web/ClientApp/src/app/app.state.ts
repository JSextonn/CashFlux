import * as fromProfile from './redux/reducers/profile.reducer';
import * as fromFlux from './redux/reducers/flux.reducer';
import * as fromSource from './redux/reducers/source.reducer';

export interface AppState {
    profiles: fromProfile.State;
    fluxes: fromFlux.State;
    sources: fromSource.State;
    selectedProfileId: string;
}
