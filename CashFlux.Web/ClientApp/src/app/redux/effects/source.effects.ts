import { Injectable } from "@angular/core";
import * as SourceActions from "../actions/source.actions";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { SourceGetModel, SourceService } from "../../services/source.service";
import { Observable } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { UpdateStr } from "@ngrx/entity/src/models";
import { FluxSource } from "../reducers/source.reducer";

export type Action = SourceActions.Actions;

@Injectable()
export class SourceEffects {
  constructor(private store: Store<AppState>, private actions: Actions, private sourceService: SourceService) { }

  @Effect()
  addSource: Observable<Action> = this.actions.pipe(
    ofType(SourceActions.ADD_SOURCE),
    mergeMap((action: SourceActions.AddSource) =>
      this.sourceService.add({
        userId: action.payload.userId,
        name: action.payload.model.name,
        category: action.payload.model.category
      }, 'api/usersource/withsource').pipe(
        map((data: SourceGetModel) => new SourceActions.AddSourceSuccess({
          model: data,
          reduxId: action.payload.userId
        }))
      )
    )
  );

  @Effect()
  addSourceSuccess: Observable<Action> = this.actions.pipe(
    ofType(SourceActions.ADD_SOURCE_SUCCESS),
    map((action: SourceActions.AddSourceSuccess) => {
      const update: UpdateStr<FluxSource> = {
        id: action.payload.reduxId,
        changes: {
          cloudId: action.payload.model.id,
          timeCreated: action.payload.model.timeCreated
        }
      };
      return new SourceActions.UpdateSource(update)
    })
  );

  // TODO: Implement remove

}
