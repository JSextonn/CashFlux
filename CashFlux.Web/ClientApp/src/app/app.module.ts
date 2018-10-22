import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
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
import { DashboardComponent } from './dashboard/dashboard.component';
import { FluxTableComponent } from './flux-table/flux-table.component';
import { FluxCreationComponent } from './flux-creation/flux-creation.component';
import { LoginComponent } from './login/login.component';
import { DashboardToolbarComponent } from './dashboard-toolbar/dashboard-toolbar.component';
import { SourceCreationComponent } from './source-creation/source-creation.component';
import { SourceManagementComponent } from './source-management/source-management.component';
import { WarningComponent } from './warning/warning.component';
import { RegisterComponent } from './register/register.component';
import { ProfileCreationComponent } from './profile-creation/profile-creation.component';

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
