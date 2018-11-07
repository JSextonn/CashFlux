import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";

import * as ResourceActions from "../actions/resource.actions";
import { AddProfiles, ClearProfiles } from "../actions/profile.actions";
import { AddSources, ClearSources } from "../actions/source.actions";
import { mapProfileResponseToClientProfile } from "../../services/profile.service";
import { mapSourceResponseToClientSource } from "../../services/source.service";
import { ClearProfileSelection } from "../actions/selected-profile.actions";
import { ClearFluxes } from "../actions/flux.actions";
import { LoadResourcesComplete } from "../actions/resource.actions";

export type Action = ResourceActions.Actions;

@Injectable()
export class ResourceEffects {
  constructor(private actions: Actions) { }

  @Effect()
  loadResources: Observable<any> = this.actions.pipe(
    ofType(ResourceActions.LOAD_RESOURCES),
    switchMap((action: ResourceActions.LoadResources) => [
      // TODO: Load rest of resources
      new AddProfiles(mapProfileResponseToClientProfile(action.payload.profiles)),
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
      new ClearProfiles(),
      new ClearSources(),
      new ClearProfileSelection(),
      new ClearFluxes()
    ]),
  );
}
