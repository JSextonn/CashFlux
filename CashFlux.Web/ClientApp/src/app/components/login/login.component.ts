import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../../redux/app.state";
import { Login } from "../../redux/actions/auth.actions";
import { Authentication, LoginCredentials, selectAuthentication } from "../../redux/reducers/auth.reducer";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  loading = false;
  errorMessage: string | null;

  constructor(private router: Router,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(selectAuthentication)
      .subscribe((data: Authentication) => {
        this.loading = data.loading;
        this.errorMessage = data.errorMessage;
      });

    // Initialize form controls
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', Validators.required);
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  handleLogin() {
    const credentials: LoginCredentials = {
      username: this.email.value,
      password: this.password.value
    };

    this.store.dispatch(new Login(credentials))
  }
}
