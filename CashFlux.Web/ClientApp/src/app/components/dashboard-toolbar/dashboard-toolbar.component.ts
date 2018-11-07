import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FluxCreationComponent } from '../flux-creation/flux-creation.component';
import { MatDialog, MatIconRegistry, MatOption } from '@angular/material';
import { SourceCreationComponent } from '../source-creation/source-creation.component';
import { ProfileCreationComponent } from '../profile-creation/profile-creation.component';
import { Update } from "@ngrx/entity";
import { SelectProfile } from "../../redux/actions/selected-profile.actions";
import { AddProfile, UpdateProfile } from "../../redux/actions/profile.actions";
import { FluxSource, selectAllSources } from "../../redux/reducers/source.reducer";
import { AddFlux } from "../../redux/actions/flux.actions";
import { AddSource } from "../../redux/actions/source.actions";
import { selectSelectedProfile } from "../../redux/reducers/selected-profile.reducer";
import { FluxProfile, selectAllProfiles } from "../../redux/reducers/profile.reducer";
import { AppState } from "../../redux/app.state";
import { selectAuthentication } from "../../redux/reducers/authentication.reducer";

@Component({
  selector: 'app-dashboard-toolbar',
  templateUrl: './dashboard-toolbar.component.html',
  styleUrls: ['./dashboard-toolbar.component.css']
})
export class DashboardToolbarComponent implements OnInit, OnDestroy {

  // Profile resources
  profiles: FluxProfile[] = [];
  profilesSubscription: Subscription;

  // Source resources
  sources: FluxSource[] = [];
  sourcesSubscription: Subscription;

  selectedProfile = '';
  selectedProfileSubscription: Subscription;

  userId: string;
  authenticationSubscription: Subscription;

  constructor(private store: Store<AppState>, public dialog: MatDialog, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    //Add pencil icon for edit profile button
    iconRegistry.addSvgIcon('edit', sanitizer.bypassSecurityTrustResourceUrl('../../assets/edit-icon.svg'));
  }

  ngOnInit(): void {
    // Profile state
    this.profilesSubscription = this.store.select(selectAllProfiles)
      .subscribe(data => {
        this.profiles = data;
      });

    // Selected Profile state
    this.selectedProfileSubscription = this.store.select(selectSelectedProfile)
      .subscribe(data => {
        this.selectedProfile = data;
      });

    // Sources state
    this.sourcesSubscription = this.store.select(selectAllSources)
      .subscribe(data => {
        this.sources = data;
      });

    this.authenticationSubscription = this.store.select(selectAuthentication)
      .subscribe(data => {
        this.userId = data.userId;
      });

    // Select first profile if it exists
    if (!this.selectedProfile && this.profiles.length > 0) {
      const profileId = this.profiles[0].id;
      this.selectedProfile = profileId;
      this.store.dispatch(new SelectProfile(profileId));
    }
  }

  ngOnDestroy(): void {
    this.profilesSubscription.unsubscribe();
    this.sourcesSubscription.unsubscribe();
    this.selectedProfileSubscription.unsubscribe();
    this.authenticationSubscription.unsubscribe();
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
        this.store.dispatch(new AddFlux(result));
      }
    });
  }

  openProfileCreationDialog(): void {
    const profileDialogRef = this.dialog.open(ProfileCreationComponent, {
      autoFocus: true
    });

    profileDialogRef.afterClosed().subscribe((result: FluxProfile) => {
      if (result !== undefined) {
        this.store.dispatch(new AddProfile({
          fluxProfile: result,
          userId: this.userId
        }));
        // Select the profile after creating it
        this.store.dispatch(new SelectProfile(result.id))
      }
    });
  }

  openProfileEditDialog(profile: FluxProfile): void {
    const editDialogRef = this.dialog.open(ProfileCreationComponent, {
      autoFocus: true,
      data: {
        profile: profile
      }
    });

    editDialogRef.afterClosed().subscribe((result: Update<FluxProfile>) => {
      if (result !== undefined) {
        this.store.dispatch(new UpdateProfile(result));
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
        this.store.dispatch(new AddSource(result));
      }
    });
  }

  updateSelectedProfile(event: MatOption): void {
    this.store.dispatch(new SelectProfile(event.value));
  }
}
