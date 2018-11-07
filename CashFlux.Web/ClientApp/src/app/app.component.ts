import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavigationStart, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { AppState } from "./redux/app.state";
import { AuthenticationState, selectAuthentication } from "./redux/reducers/authentication.reducer";
import { LoginWithLocalStorage } from "./redux/actions/authentication.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private loggedIn: boolean = false;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.loadLocalLoginInfo();
    this.handleLoginStatus();
    this.redirectToLogin();
  }

  private handleLoginStatus() {
    this.store.select(selectAuthentication)
      .subscribe((data: AuthenticationState) => {
        this.loggedIn = data.loggedIn;
      });
  }

  private loadLocalLoginInfo() {
    const loginInfo = localStorage.getItem('login');

    if (loginInfo) {
      this.store.dispatch(new LoginWithLocalStorage(JSON.parse(loginInfo)));
    }
  }

  // BUG: Redirects users to login during initialization phase. Users immediately get redirected back to dashboard once login process is complete
  // Redirect users to login when trying to reach dashboard when not logged in.
  private redirectToLogin() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      // Only collect routes trying to reach the dashboard
      .pipe(filter((event: NavigationStart) => event.url === '/dashboard'))
      .subscribe((event: NavigationStart) => {
        if (!this.loggedIn) {
          this.router.navigateByUrl('/login');
        }
      });
  }
}
