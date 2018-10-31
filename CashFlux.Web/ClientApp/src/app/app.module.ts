import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
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
  bootstrap: [AppComponent],
  entryComponents: [
    FluxCreationComponent,
    SourceCreationComponent,
    ProfileCreationComponent,
    WarningComponent
  ]
})
export class AppModule {}
