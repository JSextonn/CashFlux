import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";

import * as ResourceActions from "../actions/resource.actions";
import { LoadResourcesComplete } from "../actions/resource.actions";
import { ClearProfiles, LoadProfiles } from "../actions/profile.actions";
import { ClearSources, LoadSources } from "../actions/source.actions";

import { ClearProfileSelection } from "../actions/selected-profile.actions";
import { ClearFluxes, LoadFluxes } from "../actions/flux.actions";
import { ClearPersonalUserInfo, LoadPersonalUserInfo } from "../actions/personal-user-info.actions";
import { NormalizedResources, ResourceMapper } from "../resource-mapper";

export type Action = ResourceActions.Actions;

@Injectable()
export class ResourceEffects {
  constructor(private actions: Actions, private resourceMapper: ResourceMapper) { }

  @Effect()
  loadResources: Observable<any> = this.actions.pipe(
    ofType(ResourceActions.LOAD_RESOURCES),
    map((action: ResourceActions.LoadResources) => this.resourceMapper.mapToNormalizedData(action.payload)),
    switchMap((resources: NormalizedResources) => [
      new LoadPersonalUserInfo(resources.personalInfo),
      new LoadSources(resources.sources),
      new LoadProfiles(resources.profiles),
      new LoadFluxes(resources.fluxes),
      new LoadResourcesComplete()
    ])
  );

  @Effect({dispatch: false})
  loadResourcesComplete: Observable<any> = this.actions.pipe(
    ofType(ResourceActions.LOAD_RESOURCES_COMPLETE)
  );

  @Effect()
  clearResources: Observable<any> = this.actions.pipe(
    ofType(ResourceActions.CLEAR_RESOURCES),
    switchMap(() => [
      // Clear all of previous users data
      new ClearPersonalUserInfo(),
      new ClearProfiles(),
      new ClearSources(),
      new ClearProfileSelection(),
      new ClearFluxes()
    ]),
  );
}
