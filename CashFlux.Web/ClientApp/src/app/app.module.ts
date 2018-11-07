import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { FluxCreationComponent } from "./components/flux-creation/flux-creation.component";
import { DashboardToolbarComponent } from "./components/dashboard-toolbar/dashboard-toolbar.component";
import { LoginComponent } from "./components/login/login.component";
import { sourceReducer } from "./redux/reducers/source.reducer";
import { FluxTableComponent } from "./components/flux-table/flux-table.component";
import { profileReducer } from "./redux/reducers/profile.reducer";
import { SourceManagementComponent } from "./components/source-management/source-management.component";
import { WarningComponent } from "./components/warning/warning.component";
import { SourceCreationComponent } from "./components/source-creation/source-creation.component";
import { fluxReducer } from "./redux/reducers/flux.reducer";
import { selectedProfileReducer } from "./redux/reducers/selected-profile.reducer";
import { NavmenuComponent } from "./components/navmenu/navmenu.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ProfileCreationComponent } from "./components/profile-creation/profile-creation.component";
import { CashFluxHttpInterceptor } from "./http/cashflux.httpinterceptor";
import { EffectsModule } from "@ngrx/effects";
import { AuthenticationEffects } from "./redux/effects/authentication.effects";
import { AuthenticationService } from "./services/authentication.service";
import { authenticationReducer } from "./redux/reducers/authentication.reducer";
import { RegisterEffects } from "./redux/effects/register.effects";
import { registerReducer } from "./redux/reducers/register.reducer";
import { ProfileService } from "./services/profile.service";
import { ProfileEffects } from "./redux/effects/profile.effects";
import { UserService } from "./services/user.service";
import { ResourceEffects } from "./redux/effects/resource.effects";
import { resourceReducer } from "./redux/reducers/resource.reducer";
import { FluxService } from "./services/flux.service";
import { SourceService } from "./services/source.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    NavmenuComponent,
    DashboardComponent,
    FluxTableComponent,
    FluxCreationComponent,
    ProfileCreationComponent,
    LoginComponent,
    DashboardToolbarComponent,
    SourceCreationComponent,
    SourceManagementComponent,
    WarningComponent
  ],
  imports: [
    AppMaterialModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({
      authentication: authenticationReducer,
      resources: resourceReducer,
      register: registerReducer,
      profiles: profileReducer,
      fluxes: fluxReducer,
      sources: sourceReducer,
      selectedProfile: selectedProfileReducer
    }),
    EffectsModule.forRoot([
      AuthenticationEffects,
      RegisterEffects,
      ProfileEffects,
      ResourceEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  providers: [
    AuthenticationService,
    UserService,
    ProfileService,
    SourceService,
    FluxService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CashFluxHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    FluxCreationComponent,
    SourceCreationComponent,
    ProfileCreationComponent,
    WarningComponent
  ]
})
export class AppModule {}
