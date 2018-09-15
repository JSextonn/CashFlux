import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HomeComponent} from "./home/home.component";
import {AppRoutingModule} from "./app-routing.module";
import {NavmenuComponent} from './navmenu/navmenu.component';
import {AppMaterialModule} from "./app-material.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavmenuComponent
  ],
  imports: [
    AppMaterialModule,
    AppRoutingModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
