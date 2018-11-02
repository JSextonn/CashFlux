import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private readonly PASSWORD_PATTERN = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/g;
  private componentDestroyed: Subject<void> = new Subject();

  email: FormControl;
  password: FormControl;
  confirm: FormControl;
  first: FormControl;
  last: FormControl;
  registerForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.buildFormControls();
    this.buildFromGroup();
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  submit() {
    if (!this.registerForm.valid) {
      // TODO: Display validation errors
      return;
    }

    // TODO: Dispatch new create account action
  }

  private matchesPasswordValidator(control: AbstractControl): { [key: string]: boolean } {
    return control.value !== this.password.value ?
      {'mismatch': true} : null;
  }

  private meetsPasswordPolicy(control: AbstractControl): { [key: string]: boolean } {
    return this.PASSWORD_PATTERN.test(control.value) ?
      null : {'meetspolicy': true};
  }

  private buildFormControls(): void {
    this.email = new FormControl('', [Validators.email, Validators.required]);
    this.password = new FormControl('', [Validators.required, this.meetsPasswordPolicy.bind(this)]);
    this.confirm = new FormControl('', [Validators.required, this.matchesPasswordValidator.bind(this)]);
    this.first = new FormControl('', [Validators.minLength(3), Validators.maxLength(25)]);
    this.last = new FormControl('', [Validators.minLength(3), Validators.maxLength(25)]);

    // Make sure the confirmation field always updates with the password field.
    this.password.valueChanges
      .subscribe(() => {
        this.confirm.updateValueAndValidity();
      });
  }

  private buildFromGroup(): void {
    this.registerForm = new FormGroup({
      email: this.email,
      password: this.password,
      confirm: this.confirm,
      first: this.first,
      last: this.last
    });
  }
}
