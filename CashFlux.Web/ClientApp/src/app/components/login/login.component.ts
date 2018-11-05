import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../../redux/app.state";
import { AuthenticationState, selectAuthentication } from "../../redux/reducers/authentication.reducer";
import { Login } from "../../redux/actions/authentication.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username: FormControl;
  password: FormControl;

  loading: boolean;
  errorMessage: string | null;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(selectAuthentication)
      .subscribe((state: AuthenticationState) => {
        this.loading = state.loading;
        this.errorMessage = state.errorMessage;
      });

    // Initialize form controls
    this.username = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', Validators.required);
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  onSubmit() {
    this.store.dispatch(new Login(this.loginForm.value))
  }
}
