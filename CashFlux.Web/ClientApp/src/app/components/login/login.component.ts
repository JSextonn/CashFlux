import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    // Initialize form controls
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', Validators.required);
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  handleLogin() {
    this.authService.login(this.email.value, this.password.value)
      .then((loginStatus: boolean) => {
        if (loginStatus) {
          this.router.navigate(['/dashboard'])
        } else {
          // TODO: Login failed and error messages should be displayed
        }
      });
  }
}
