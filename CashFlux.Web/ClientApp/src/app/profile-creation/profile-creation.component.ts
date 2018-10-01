import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { FluxProfile } from '../models/profile.model';

@Component({
  selector: 'app-profile-creation',
  templateUrl: './profile-creation.component.html',
  styleUrls: ['./profile-creation.component.css']
})

export class ProfileCreationComponent implements OnInit {
  name: FormControl;

  constructor(public profileDialogRef: MatDialogRef<ProfileCreationComponent>) { }

  ngOnInit(): void {
    this.name = new FormControl('', Validators.required);
  }

  createProfile() {
    const newProfile: FluxProfile = {
      id: this.name.value,
      timeCreated: new Date()
    };

    this.profileDialogRef.close(newProfile);
  }

  cancel() {
    this.profileDialogRef.close();
  }
}
