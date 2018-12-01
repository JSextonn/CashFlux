import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { FluxGetModel, FluxService } from "../../services/flux.service";
import { Flux, selectFluxIds } from "../reducers/flux.reducer";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { UpdateStr } from "@ngrx/entity/src/models";
import * as FluxActions from "../actions/flux.actions";

export type Action = FluxActions.Actions;

@Injectable()
export class FluxEffects {
  private fluxIds: string[];

  constructor(private store: Store<AppState>, private actions: Actions, private fluxService: FluxService) {
    this.store.select(selectFluxIds).subscribe(data => {
      this.fluxIds = data as string[];
    });
  }

  @Effect()
  addFlux: Observable<Action> = this.actions.pipe(
    ofType(FluxActions.ADD_FLUX),
    mergeMap((action: FluxActions.AddFlux) =>
      this.fluxService.add({
        amount: action.payload.flux.amount,
        profileId: action.payload.cloudIds.profileId,
        sourceId: action.payload.cloudIds.sourceId
      }).pipe(
        map((data: FluxGetModel) => new FluxActions.AddFluxSuccess(data)),
        catchError(error => of(new FluxActions.AddFluxFail({error: error.message})))
      )
    )
  );

  @Effect()
  addFluxSuccess: Observable<Action> = this.actions.pipe(
    ofType(FluxActions.ADD_FLUX_SUCCESS),
    map((action: FluxActions.AddFluxSuccess) => {
      const update: UpdateStr<Flux> = {
        // TODO: May become a bug if two sources are created before the first gets a response back.
        // Selects the last id that was inserted into the flux state.
        id: this.fluxIds[this.fluxIds.length - 1],
        changes: {
          cloudId: action.payload.id,
          timeCreated: action.payload.timeCreated
        }
      };
      return new FluxActions.UpdateFluxLocal(update)
    })
  );

  @Effect({dispatch: false})
  addFluxFail: Observable<any> = this.actions.pipe(
    ofType(FluxActions.ADD_FLUX_FAIL),
  );
}

