import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";

import * as ResourceActions from "../actions/resource.actions";
import { LoadResourcesComplete } from "../actions/resource.actions";
import { AddProfiles, ClearProfiles } from "../actions/profile.actions";
import { AddSources, ClearSources } from "../actions/source.actions";

import { ClearProfileSelection } from "../actions/selected-profile.actions";
import { AddFluxes, ClearFluxes } from "../actions/flux.actions";
import { ClearPersonalUserInfo, LoadPersonalUserInfo } from "../actions/personal-user-info.actions";
import { mapProfileResponseToClientProfile } from "../reducers/profile.reducer";
import { mapSourceResponseToClientSource } from "../reducers/source.reducer";
import { mapProfileResponseToClientFluxes } from "../reducers/flux.reducer";

export type Action = ResourceActions.Actions;

@Injectable()
export class ResourceEffects {
  constructor(private actions: Actions) { }

  @Effect()
  loadResources: Observable<any> = this.actions.pipe(
    ofType(ResourceActions.LOAD_RESOURCES),
    switchMap((action: ResourceActions.LoadResources) => [
      // TODO: Load rest of resources
      new LoadPersonalUserInfo(action.payload),
      new AddProfiles(mapProfileResponseToClientProfile(action.payload.profiles)),
      new AddFluxes(mapProfileResponseToClientFluxes(action.payload.profiles)),
      new AddSources(mapSourceResponseToClientSource(action.payload.sources)),
      new LoadResourcesComplete()
    ])
  );

  @Effect({dispatch: false})
  loadResourcesSuccess: Observable<any> = this.actions.pipe(
    ofType(ResourceActions.LOAD_RESOURCES_COMPLETE)
  );

  @Effect()
  clearResources: Observable<any> = this.actions.pipe(
    ofType(ResourceActions.CLEAR_RESOURCES),
    switchMap((action: ResourceActions.ClearResources) => [
      // Make sure to clear all previous users data
      new ClearPersonalUserInfo(),
      new ClearProfiles(),
      new ClearSources(),
      new ClearProfileSelection(),
      new ClearFluxes()
    ]),
  );
}
