import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {CommonModule} from "@angular/common";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";
import {AgGridModule} from "ag-grid-angular";
import {ToastrModule} from "ngx-toastr";
import {NavigationModule} from "./navigation/navigation.module";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    CommonModule,
    SharedModule,
    CoreModule,
    NavigationModule,

    AgGridModule.withComponents([]),
    ToastrModule.forRoot({
      maxOpened: 3,
      preventDuplicates: true
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
