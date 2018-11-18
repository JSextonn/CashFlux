import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";

import * as ProfileActions from "../actions/profile.actions";
import { UpdateProfileLocal } from "../actions/profile.actions";
import { ProfileDeleteModel, ProfileGetModel, ProfilePutModel, ProfileService } from "../../services/profile.service";
import { FluxProfile, selectProfileIds } from "../reducers/profile.reducer";
import { UpdateStr } from "@ngrx/entity/src/models";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";

export type Action = ProfileActions.Actions;

@Injectable()
export class ProfileEffects {
  private profileIds: string[];

  constructor(private store: Store<AppState>, private actions: Actions, private profileService: ProfileService) {
    this.store.select(selectProfileIds)
      .subscribe(data => {
        this.profileIds = data as string[];
      })
  }

  @Effect()
  addProfile: Observable<Action> = this.actions.pipe(
    ofType(ProfileActions.ADD_PROFILE),
    mergeMap((action: ProfileActions.AddProfile) =>
      this.profileService.add({
        userId: action.payload.userId,
        name: action.payload.model.name
      }).pipe(
        map((data: ProfileGetModel) => new ProfileActions.AddProfileSuccess(data)),
        catchError(error => of(new ProfileActions.AddProfileFail({error: error.message})))
      )
    )
  );

  @Effect()
  addProfileSuccess: Observable<Action> = this.actions.pipe(
    ofType(ProfileActions.ADD_PROFILE_SUCCESS),
    map((action: ProfileActions.AddProfileSuccess) => {
      const update: UpdateStr<FluxProfile> = {
        // TODO: May become a bug if two sources are created before the first gets a response back.
        id: this.profileIds[this.profileIds.length - 1],
        changes: {
          cloudId: action.payload.id,
          timeCreated: action.payload.timeCreated
        }
      };
      return new ProfileActions.UpdateProfileLocal(update)
    })
  );

  @Effect({dispatch: false})
  addProfileFail: Observable<any> = this.actions.pipe(
    ofType(ProfileActions.ADD_PROFILE_FAIL),
  );

  @Effect()
  updateProfile: Observable<any> = this.actions.pipe(
    ofType(ProfileActions.UPDATE_PROFILE),
    tap((action: ProfileActions.UpdateProfile) => new UpdateProfileLocal(action.payload.update)),
    mergeMap((action: ProfileActions.UpdateProfile) =>
      this.profileService.update(action.payload.cloudId, action.payload.update.changes as ProfilePutModel).pipe(
        map(() => new ProfileActions.UpdateProfileSuccess())
      )
    )
  );

  // TODO: Needs to be tested
  @Effect()
  removeProfile: Observable<any> = this.actions.pipe(
    ofType(ProfileActions.REMOVE_PROFILE),
    mergeMap((action: ProfileActions.RemoveProfile) =>
      this.profileService.delete(action.payload).pipe(
        map((data: ProfileDeleteModel) => new ProfileActions.RemoveProfileSuccess(data)),
        catchError(error => of(new ProfileActions.RemoveProfileFail({error: error.message})))
      )
    )
  );
}
