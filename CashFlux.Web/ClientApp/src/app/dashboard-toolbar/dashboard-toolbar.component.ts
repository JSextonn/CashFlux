import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { FluxProfile } from '../models/profile.model';
import { Subscription } from 'rxjs';
import { selectAllProfiles } from '../reducers/profile.reducer';
import { FluxCreationComponent } from '../flux-creation/flux-creation.component';
import { MatDialog, MatSelectChange, MatOption } from '@angular/material';
import { selectAllSources } from '../reducers/source.reducer';
import { selectSelectedProfile } from '../reducers/selected-profile.reducer';
import * as FluxActions from '../actions/flux.actions';
import { SelectProfile } from '../actions/selected-profile.actions';
import { FluxSource } from '../models/source.model';

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

  constructor(private _store: Store<AppState>, public dialog: MatDialog) { }

  ngOnInit() {
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

    this.sourcesSubscription = this._store.select(selectAllSources)
      .subscribe(data => {
        this.sources = data;
      });
  }

  openFluxCreationDialog(): void {
    const dialogRef = this.dialog.open(FluxCreationComponent, {
      height: '500px',
      autoFocus: true,
      data: {
        sources: this.sources,
        profile: this.selectedProfile
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._store.dispatch(new FluxActions.AddFlux(result));
      }
    });
  }

  updateSelectedProfile(event: MatOption) {
    this._store.dispatch(new SelectProfile(event.value));
  }
}
