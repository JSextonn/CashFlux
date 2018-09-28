import {Component, OnInit} from '@angular/core';
import {AppState} from '../app.state';
import {Store} from '@ngrx/store';
import {FluxProfile} from '../models/profile.model';
import {Subscription} from 'rxjs';
import {selectAllProfiles} from '../reducers/profile.reducer';
import {FluxCreationComponent} from '../flux-creation/flux-creation.component';
import {MatDialog, MatOption} from '@angular/material';
import {selectAllSources} from '../reducers/source.reducer';
import {selectSelectedProfile} from '../reducers/selected-profile.reducer';
import {SelectProfile} from '../actions/selected-profile.actions';
import {SourceCreationComponent} from '../source-creation/source-creation.component';
import {FluxSource} from '../models/source.model';
import {AddFlux} from '../actions/flux.actions';
import {AddSource} from '../actions/source.actions';

@Component({
  selector: 'app-dashboard-toolbar',
  templateUrl: './dashboard-toolbar.component.html',
  styleUrls: ['./dashboard-toolbar.component.css']
})
export class DashboardToolbarComponent implements OnInit {

  // Profile resources
  profiles: FluxProfile[] = [];
  profilesSubscription: Subscription;

  // Source resources
  sources: FluxSource[] = [];
  sourcesSubscription: Subscription;

  selectedProfile = '';
  selectedProfileSubscription: Subscription;

  constructor(private _store: Store<AppState>, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    // Profile state
    this.profilesSubscription = this._store.select(selectAllProfiles)
      .subscribe(data => {
        this.profiles = data;
      });

    // Selected Profile state
    this.selectedProfileSubscription = this._store.select(selectSelectedProfile)
      .subscribe(data => {
        this.selectedProfile = data;
      });

    // Sources state
    this.sourcesSubscription = this._store.select(selectAllSources)
      .subscribe(data => {
        this.sources = data;
      });

    // Select first profile if it exists
    if (!this.selectedProfile && this.profiles.length > 0) {
      const profileId = this.profiles[0].id;
      this.selectedProfile = profileId;
      this._store.dispatch(new SelectProfile(profileId));
    }
  }

  openFluxCreationDialog(): void {
    let height;
    // Different content is displayed when no sources are passed.
    // Dialog must be adjusted.
    if (this.sources.length === 0) {
      height = '225px';
    } else {
      height = '500px';
    }

    const dialogRef = this.dialog.open(FluxCreationComponent, {
      height: height,
      autoFocus: true,
      data: {
        sources: this.sources,
        profile: this.selectedProfile
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._store.dispatch(new AddFlux(result));
      }
    });
  }

  openSourceCreationDialog(): void {
    const dialogRef = this.dialog.open(SourceCreationComponent, {
      height: '325px',
      autoFocus: true,
      data: {
        sources: this.sources
      }
    });

    dialogRef.afterClosed().subscribe((result: FluxSource) => {
      if (result !== undefined) {
        this._store.dispatch(new AddSource(result));
      }
    });
  }

  updateSelectedProfile(event: MatOption) {
    this._store.dispatch(new SelectProfile(event.value));
  }
}
