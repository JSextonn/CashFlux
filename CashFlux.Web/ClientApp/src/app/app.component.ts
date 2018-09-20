import { Component, OnInit } from '@angular/core';
import { AppState } from './app.state';
import { Store } from '@ngrx/store';
import { AddProfiles } from './actions/profile.actions';
import { AddSources } from './actions/source.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cash Flux';

  constructor(private _store: Store<AppState>) { }

  ngOnInit(): void {
    // Add dummy profiles
    this._store.dispatch(new AddProfiles([{
      id: 'Test One',
      timeCreated: new Date()
    }, {
      id: 'Test Two',
      timeCreated: new Date()
    }]));

    // Add dummy sources
    this._store.dispatch(new AddSources([{
      name: 'Walmart',
      category: 'Food',
      timeCreated: new Date()
    }, {
      name: 'Exxon',
      category: 'Gas',
      timeCreated: new Date()
    }]));
  }
}
