import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { FluxProfile } from '../models/profile.model';
import { ProfileCreationComponent } from "../profile-creation/profile-creation.component";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  name: FormControl;

  constructor(public editDialogRef: MatDialogRef<ProfileCreationComponent>) { }

  ngOnInit(): void {
    this.name = new FormControl('', Validators.required);
  }

  createProfile() {
    const newProfile: FluxProfile = {
      name: this.name.value,
      timeCreated: new Date()
    };

    this.editDialogRef.close(newProfile);
  }

  cancel() {
    this.editDialogRef.close();
  }
}
