import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../redux/app.state";
import { AuthenticationState, selectAuthentication } from "../../redux/reducers/auth.reducer";
import { Register } from "../../redux/actions/auth.actions";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  // Matches with strings containing at least one capital, lowercase, and digit and contains at least 8 characters.
  private readonly PASSWORD_PATTERN = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/g;
  private componentDestroyed: Subject<void> = new Subject();

  username: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  firstName: FormControl;
  lastName: FormControl;
  registerForm: FormGroup;

  loading: boolean;
  errorMessage: string | null;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(selectAuthentication)
      .subscribe((state: AuthenticationState) => {
        this.loading = state.loading;
        this.errorMessage = state.errorMessage;
      });

    this.buildFormControls();
    this.buildFromGroup();
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  onSubmit(): void {
    console.log(this.registerForm.value);
    this.store.dispatch(new Register(this.registerForm.value));
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
    this.username = new FormControl('', [Validators.email, Validators.required]);
    this.password = new FormControl('', [Validators.required, this.meetsPasswordPolicy.bind(this)]);
    this.confirmPassword = new FormControl('', [Validators.required, this.matchesPasswordValidator.bind(this)]);
    this.firstName = new FormControl('', [Validators.minLength(3), Validators.maxLength(25)]);
    this.lastName = new FormControl('', [Validators.minLength(3), Validators.maxLength(25)]);

    // Make sure the confirmation field always updates with the password field.
    this.password.valueChanges
      .subscribe(() => {
        this.confirmPassword.updateValueAndValidity();
      });
  }

  private buildFromGroup(): void {
    this.registerForm = new FormGroup({
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword,
      firstName: this.firstName,
      lastName: this.lastName
    });
  }
}
