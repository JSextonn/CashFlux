import { Component, OnInit } from '@angular/core';
import { AbstractControl, Validators, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup;

  constructor() { }

  ngOnInit() { 
    // Create FormGroup with FormControls as children
    this.registerForm = new FormGroup({
      'email': new FormControl('', [Validators.email, Validators.required]),
      'password': new FormControl('', Validators.required),
      'confirmPassword': new FormControl('', Validators.required),
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
    });
  }

  // passwordMatchValidator(form: FormGroup): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     return form.get('password').value === form.get('confirmPassword').value
  //       ? { 'mismatch': { value: true } } : null;
  //   };
  // }
}
