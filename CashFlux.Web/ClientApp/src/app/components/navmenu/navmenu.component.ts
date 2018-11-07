import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from "@ngrx/store";
import { AppState } from "../../redux/app.state";
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { AuthenticationState, selectAuthentication } from "../../redux/reducers/authentication.reducer";
import { Logout } from "../../redux/actions/authentication.actions";
import { PersonalUserInfoState, selectPersonalUserInfo } from "../../redux/reducers/personal-user-info.reducer";

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

  loggedIn: Observable<boolean> = this.store.select(selectAuthentication)
    .pipe(
      map((data: AuthenticationState) => data.loggedIn)
    );

  username: Observable<string> = this.store.select(selectPersonalUserInfo)
    .pipe(
      map((data: PersonalUserInfoState) => data.username)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
    //Add account-box img
    iconRegistry.addSvgIcon('account-box', sanitizer.bypassSecurityTrustResourceUrl('../../assets/account-box-icon.svg'));
  }

  ngOnInit() { }

  logout() {
    this.store.dispatch(new Logout())
  }
}
