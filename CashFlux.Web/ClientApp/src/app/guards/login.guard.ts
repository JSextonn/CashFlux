import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AppState } from "../redux/app.state";
import { Store } from "@ngrx/store";
import { AuthenticationState, selectAuthentication } from "../redux/reducers/authentication.reducer";

@Injectable()
export class LoginRouteGuard implements CanActivate {
  private loggedIn: boolean;

  constructor(private store: Store<AppState>, private router: Router) {
    this.store.select(selectAuthentication).subscribe((state: AuthenticationState) => {
      this.loggedIn = state.loggedIn;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loggedIn) {
      return true;
    }
    else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
