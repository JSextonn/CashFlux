import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from './app.state';
import { Store } from '@ngrx/store';
import { AddProfiles } from './actions/profile.actions';
import { AddFluxes } from './actions/flux.actions';
import { Subscription } from 'rxjs';
import { selectSourceIds } from './reducers/source.reducer';
import { selectProfileIds } from './reducers/profile.reducer';
import { AddSources } from './actions/source.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Cash Flux';

  private profileIdsSubscription: Subscription;
  private profileIds: string[] = [];

  private sourceIdsSubscription: Subscription;
  private sourceIds: string[] = [];

  constructor(private _store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.setupSubscriptions();

    // Add dummy profiles
    this._store.dispatch(new AddProfiles([{
      name: 'Test One',
      timeCreated: new Date()
    }, {
      name: 'Test Two',
      timeCreated: new Date()
    }]));

    //     Add dummy sources
    this._store.dispatch(new AddSources([{
      name: 'Wal-mart',
      category: 'Food',
      timeCreated: new Date()
    }, {
      name: 'Exxon',
      category: 'Gas',
      timeCreated: new Date()
    }]));

    this._store.dispatch(new AddFluxes([
      {
        amount: -100,
        sourceId: this.sourceIds[0],
        profileId: this.profileIds[0],
        timeCreated: new Date()
      },
      {
        amount: -100,
        sourceId: this.sourceIds[0],
        profileId: this.profileIds[0],
        timeCreated: new Date()
      },
      {
        amount: -100,
        sourceId: this.sourceIds[0],
        profileId: this.profileIds[0],
        timeCreated: new Date()
      },
      {
        amount: -90,
        sourceId: this.sourceIds[0],
        profileId: this.profileIds[0],
        timeCreated: new Date()
      },
      {
        amount: -20,
        sourceId: this.sourceIds[0],
        profileId: this.profileIds[0],
        timeCreated: new Date()
      },
      {
        amount: -19,
        sourceId: this.sourceIds[0],
        profileId: this.profileIds[0],
        timeCreated: new Date()
      },
      {
        amount: -17,
        sourceId: this.sourceIds[0],
        profileId: this.profileIds[0],
        timeCreated: new Date()
      },
      {
        amount: -10,
        sourceId: this.sourceIds[0],
        profileId: this.profileIds[0],
        timeCreated: new Date()
      }, {
        amount: -5,
        sourceId: this.sourceIds[0],
        profileId: this.profileIds[0],
        timeCreated: new Date()
      }, {
        amount: -10,
        sourceId: this.sourceIds[0],
        profileId: this.profileIds[0],
        timeCreated: new Date()
      }, {
        amount: -1,
        sourceId: this.sourceIds[0],
        profileId: this.profileIds[0],
        timeCreated: new Date()
      }, {
        amount: -50,
        sourceId: this.sourceIds[0],
        profileId: this.profileIds[0],
        timeCreated: new Date()
      }, {
        amount: -100,
        sourceId: this.sourceIds[0],
        profileId: this.profileIds[0],
        timeCreated: new Date()
      }
    ]));
  }

  ngOnDestroy(): void {
    this.profileIdsSubscription.unsubscribe();
    this.sourceIdsSubscription.unsubscribe();
  }

  private setupSubscriptions(): void {
    this.sourceIdsSubscription = this._store.select(selectSourceIds).subscribe(data => {
      this.sourceIds = data as string[];
    });

    this.profileIdsSubscription = this._store.select(selectProfileIds).subscribe(data => {
      this.profileIds = data as string[];
    });
  }
}
