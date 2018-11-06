import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavigationStart, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { AppState } from "./redux/app.state";
import { Observable } from "rxjs";
import { LoadPreviousLogin } from "./redux/actions/authentication.actions";
import { AuthenticationState, selectAuthentication } from "./redux/reducers/authentication.reducer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private authenticationState: Observable<AuthenticationState>;
  private loggedIn: boolean = false;

  constructor(private store: Store<AppState>,
              private router: Router) {
    this.authenticationState = this.store.select(selectAuthentication);
  }

  ngOnInit() {
    this.loadLocalLoginInfo();
    this.handleLoginStatus();
    this.redirectToLogin();
  }

  private handleLoginStatus() {
    this.authenticationState
      .subscribe((data: AuthenticationState) => {
        this.loggedIn = data.loggedIn;
      });
  }

  private loadLocalLoginInfo() {
    const loginInfo = localStorage.getItem('login');

    if (loginInfo) {
      this.store.dispatch(new LoadPreviousLogin(JSON.parse(loginInfo)));
    }
  }

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
