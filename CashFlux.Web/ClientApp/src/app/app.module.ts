import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { AppMaterialModule } from './app-material.module';
import { StoreModule } from '@ngrx/store';
import { profileReducer } from './reducers/profile.reducer';
import { fluxReducer } from './reducers/flux.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { sourceReducer } from './reducers/source.reducer';
import { selectedProfileReducer } from './reducers/selected-profile.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavmenuComponent
  ],
  imports: [
    AppMaterialModule,
    AppRoutingModule,
    BrowserModule,
    StoreModule.forRoot({
      profiles: profileReducer,
      fluxes: fluxReducer,
      sources: sourceReducer,
      selectedProfile: selectedProfileReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
