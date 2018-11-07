import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Update } from "@ngrx/entity";
import { FluxProfile } from "../../redux/reducers/profile.reducer";

@Component({
  selector: 'app-profile-creation',
  templateUrl: './profile-creation.component.html',
  styleUrls: ['./profile-creation.component.css']
})

export class ProfileCreationComponent implements OnInit {
  name: FormControl;
  editMode = false;

  constructor(public profileDialogRef: MatDialogRef<ProfileCreationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    // Configure component for edit mode if a profile name is passed.
    let nameValue = '';
    if (this.data) {
      nameValue = this.data.profile.name;
      this.editMode = true;
    }
    this.name = new FormControl(nameValue, [Validators.required, Validators.maxLength(20)]);
  }

  createProfile(): void {
    let profile: FluxProfile | Update<FluxProfile>;
    if (this.editMode) {
      profile = {
        id: this.data.profile.id,
        changes: {
          name: this.name.value
        }
      }
    } else {
      profile = {
        name: this.name.value,
        timeCreated: new Date()
      };
    }
    this.profileDialogRef.close(profile);
  }

  cancel(): void {
    this.profileDialogRef.close();
  }
}
