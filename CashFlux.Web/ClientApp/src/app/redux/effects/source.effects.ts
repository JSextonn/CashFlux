import { Injectable } from "@angular/core";
import * as SourceActions from "../actions/source.actions";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { SourceDeleteMultipleResult, SourceGetModel, SourceService } from "../../services/source.service";
import { Observable } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { UpdateStr } from "@ngrx/entity/src/models";
import { FluxSource, selectSourceIds } from "../reducers/source.reducer";

export type Action = SourceActions.Actions;

@Injectable()
export class SourceEffects {
  private sourceIds: string[];

  constructor(private store: Store<AppState>, private actions: Actions, private sourceService: SourceService) {
    this.store.select(selectSourceIds)
      .subscribe(data => {
        this.sourceIds = data as string[];
      })
  }

  @Effect()
  addSource: Observable<Action> = this.actions.pipe(
    ofType(SourceActions.ADD_SOURCE),
    mergeMap((action: SourceActions.AddSource) =>
      this.sourceService.add({
        userId: action.payload.userId,
        name: action.payload.model.name,
        category: action.payload.model.category
      }).pipe(
        map((data: SourceGetModel) => new SourceActions.AddSourceSuccess(data))
      )
    )
  );

  @Effect()
  addSourceSuccess: Observable<Action> = this.actions.pipe(
    ofType(SourceActions.ADD_SOURCE_SUCCESS),
    map((action: SourceActions.AddSourceSuccess) => {
      const update: UpdateStr<FluxSource> = {
        // TODO: May become a bug if two sources are created before the first gets a response back.
        id: this.sourceIds[this.sourceIds.length - 1],
        changes: {
          cloudId: action.payload.id,
          timeCreated: action.payload.timeCreated
        }
      };
      return new SourceActions.UpdateSource(update)
    })
  );

  @Effect()
  removeSources: Observable<Action> = this.actions.pipe(
    ofType(SourceActions.REMOVE_SOURCES),
    mergeMap((action: SourceActions.RemoveSources) =>
      this.sourceService.deleteMultiple(action.payload.cloudModel).pipe(
        map((data: SourceDeleteMultipleResult) => new SourceActions.RemoveSourcesSuccess(data))
      )
    )
  );
}
