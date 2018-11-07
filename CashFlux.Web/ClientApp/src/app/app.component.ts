import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from "./redux/app.state";
import { LoginWithLocalStorage } from "./redux/actions/authentication.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.loadLocalLoginInfo();
  }

  private loadLocalLoginInfo() {
    const loginInfo = localStorage.getItem('login');

    if (loginInfo) {
      this.store.dispatch(new LoginWithLocalStorage(JSON.parse(loginInfo)));
    }
  }
}
