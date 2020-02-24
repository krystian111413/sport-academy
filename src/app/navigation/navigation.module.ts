import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavMenuItemsComponent} from './components/navigation/nav-menu-items/nav-menu-items.component';
import {NavigationComponent} from "./components/navigation/navigation.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {FlexModule} from "@angular/flex-layout";
import {ProjectSelectorModule} from "../core/project-selector/project-selector.module";


@NgModule({
  declarations: [NavMenuItemsComponent, NavigationComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    FlexModule,
    ProjectSelectorModule
  ],
  exports: [
    NavigationComponent
  ]
})
export class NavigationModule { }
