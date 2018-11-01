import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from './app.state';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AddProfiles } from "./redux/actions/profile.actions";
import { AddFluxes } from "./redux/actions/flux.actions";
import { AddSources } from "./redux/actions/source.actions";
import { selectSourceIds } from "./redux/reducers/source.reducer";
import { selectProfileIds } from "./redux/reducers/profile.reducer";
import { NavigationStart, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { AuthenticationService } from "./services/authentication.service";

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

  constructor(private _store: Store<AppState>,
              private router: Router,
              private authService: AuthenticationService) {
    router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .pipe(filter((event: NavigationStart) => event.url === '/dashboard'))
      .subscribe((event: NavigationStart) => {
        // Redirect users to login if they're not logged in trying to access dashboard.
        if (!this.authService.loggedIn.value) {
          this.router.navigate(['/login']);
        }
      })
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
