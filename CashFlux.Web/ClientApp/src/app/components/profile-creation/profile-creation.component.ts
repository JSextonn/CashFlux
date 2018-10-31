import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Update } from "@ngrx/entity";
import { FluxProfile } from "../../redux/models/profile.model";

@Component({
  selector: 'app-profile-creation',
  templateUrl: './profile-creation.component.html',
  styleUrls: ['./profile-creation.component.css']
})

export class ProfileCreationComponent implements OnInit {
  nameFormControl: FormControl;
  editMode = false;

  constructor(public profileDialogRef: MatDialogRef<ProfileCreationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    // Configure component for edit mode if a profile name is passed.
    let nameValue = '';
    if (this.data.profile) {
      nameValue = this.data.profile.name;
      this.editMode = true;
    }
    this.nameFormControl = new FormControl(nameValue, [Validators.required, this._profileNameUnique.bind(this)]);
  }

  createProfile() {
    let profile: FluxProfile | Update<FluxProfile>;
    if (this.editMode) {
      profile = {
        id: this.data.profile.id,
        changes: {
          name: this.nameFormControl.value
        }
      }
    } else {
      profile = {
        name: this.nameFormControl.value,
        timeCreated: new Date()
      };
    }
    this.profileDialogRef.close(profile);
  }

  cancel() {
    this.profileDialogRef.close();
  }

  private _profileNameUnique(control: AbstractControl): { [key: string]: boolean } | null {
    const length = this.data.profiles
      .filter(profile => profile.name === control.value).length;

    if (length !== 0) {
      return {'notUnique': true};
    }

    return null;
  }
}
