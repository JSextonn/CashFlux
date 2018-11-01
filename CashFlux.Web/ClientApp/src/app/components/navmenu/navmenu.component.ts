import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent {

  // Breakpoint observer, changes values depending on the size of the screen.
  // In this occasion, isHandset is true if the screen is detected to be small or xsmall.
  // This value can be used in html to display a correct layout for smaller screens.
  beyondBreakpoint: Observable<boolean> = this.breakpointObserver.observe([
    '(max-width: 650px)'
  ]).pipe(
    map(result => result.matches)
  );

  loggedIn: Observable<boolean> = this.authService.loggedIn.asObservable();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthenticationService) { }
}
