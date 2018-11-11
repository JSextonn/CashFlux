import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, withLatestFrom } from "rxjs/operators";

import * as ProfileActions from "../actions/profile.actions";
import { ProfileDeleteModel, ProfileGetModel, ProfileService } from "../../services/profile.service";
import { FluxProfile, selectProfileEntities } from "../reducers/profile.reducer";
import { UpdateStr } from "@ngrx/entity/src/models";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";

export type Action = ProfileActions.Actions;

@Injectable()
export class ProfileEffects {
  constructor(private store: Store<AppState>, private actions: Actions, private profileService: ProfileService) { }

  @Effect()
  addProfile: Observable<Action> = this.actions.pipe(
    ofType(ProfileActions.ADD_PROFILE),
    mergeMap((action: ProfileActions.AddProfile) =>
      this.profileService.add({
        userId: action.payload.userId,
        name: action.payload.model.name
      }).pipe(
        map((data: ProfileGetModel) => new ProfileActions.AddProfileSuccess({
          model: data,
          reduxId: action.payload.userId
        })),
        catchError(error => of(new ProfileActions.AddProfileFail({error: error.message})))
      )
    )
  );

  @Effect()
  addProfileSuccess: Observable<Action> = this.actions.pipe(
    ofType(ProfileActions.ADD_PROFILE_SUCCESS),
    map((action: ProfileActions.AddProfileSuccess) => {
      const update: UpdateStr<FluxProfile> = {
        id: action.payload.reduxId,
        changes: {
          cloudId: action.payload.model.id,
          timeCreated: action.payload.model.timeCreated
        }
      };
      return new ProfileActions.UpdateProfile(update)
    })
  );

  @Effect({dispatch: false})
  addProfileFail: Observable<any> = this.actions.pipe(
    ofType(ProfileActions.ADD_PROFILE_FAIL),
  );

  @Effect()
  removeProfile: Observable<any> = this.actions.pipe(
    ofType(ProfileActions.REMOVE_PROFILE),
    withLatestFrom(this.store.select(selectProfileEntities),
      (action: ProfileActions.RemoveProfile, profiles) => {
        return profiles[action.payload];
      }),
    map((profile: FluxProfile) => {
      this.profileService.delete(profile.cloudId).pipe(
        map((data: ProfileDeleteModel) => new ProfileActions.RemoveProfileSuccess(data)),
        catchError(error => of(new ProfileActions.RemoveProfileFail({error: error.message})))
      )
    })
  );
}
