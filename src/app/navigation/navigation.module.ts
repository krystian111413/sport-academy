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
import { NotificationsComponent } from './components/navigation/notifications/notifications.component';
import {MatMenuModule} from '@angular/material/menu';
import { NotificationItemComponent } from './components/navigation/notifications/notification-item/notification-item.component';


@NgModule({
  declarations: [NavMenuItemsComponent, NavigationComponent, NotificationsComponent, NotificationItemComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    FlexModule,
    ProjectSelectorModule,
    MatMenuModule
  ],
  exports: [
    NavigationComponent
  ]
})
export class NavigationModule { }
