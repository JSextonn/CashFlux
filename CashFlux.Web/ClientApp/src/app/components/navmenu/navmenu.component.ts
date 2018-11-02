import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from "@ngrx/store";
import { AppState } from "../../redux/app.state";
import { Authentication, selectAuthentication } from "../../redux/reducers/auth.reducer";

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit {

  // Breakpoint observer, changes values depending on the size of the screen.
  // In this occasion, isHandset is true if the screen is detected to be small or xsmall.
  // This value can be used in html to display a correct layout for smaller screens.
  beyondBreakpoint: Observable<boolean> = this.breakpointObserver.observe([
    '(max-width: 650px)'
  ]).pipe(
    map(result => result.matches)
  );

  private authenticationState: Observable<Authentication>;
  loggedIn: boolean;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>) {
    this.authenticationState = this.store.select(selectAuthentication);
  }

  ngOnInit() {
    this.authenticationState.subscribe((data: Authentication) => {
      this.loggedIn = data.loggedIn;
      // TODO: Listen for username to display on navmenu
    })
  }
}
