import {Component, Input, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";

export interface NavMenuItem {
  name: string;
  iconName: string;
  url: string;
}

@Component({
  selector: 'nav-menu-items',
  templateUrl: './nav-menu-items.component.html',
  styleUrls: ['./nav-menu-items.component.scss']
})
export class NavMenuItemsComponent implements OnInit {

  @Input() items: NavMenuItem[] = [];
  currentUrl: string = '';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(value => value instanceof NavigationEnd)
    ).subscribe((value: NavigationEnd) => {
      this.currentUrl = value.url;
    })
  }

  isSelectedItem(url: string): boolean {
    const part = this.getDefaultRoute();
    return `/${part}` === url;
  }

  isDefaultPath(index: number): boolean {
    const part = this.getDefaultRoute();
    return !part && index === 0;
  }

  private getDefaultRoute() {
    return this.currentUrl.split('/')[1]; // first element is host name so we are looking for next one which is first after '/' hence index is 1
  }
}
