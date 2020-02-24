import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {NavMenuItem} from "./nav-menu-items/nav-menu-items.component";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  menuConfigItems: NavMenuItem[] = [
    {
      name: 'Measurements',
      url: '/measurements',
      iconName: 'local_movies'
    },
    {
      name: 'Calculation Models',
      url: '/calculation-models',
      iconName: 'commute'
    },
    {
      name: 'Resimulations',
      url: '/resimulations',
      iconName: 'loop'
    },
    {
      name: 'Workflows',
      url: '/workflows',
      iconName: 'toys'
    },
    {
      name: 'Assets',
      url: '/assets',
      iconName: 'directions_car'
    }
  ];


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  projectName: string = environment.projectName;

  constructor(private breakpointObserver: BreakpointObserver) {}

}
