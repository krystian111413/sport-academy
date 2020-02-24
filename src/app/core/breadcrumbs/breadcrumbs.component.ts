import {Component, OnInit} from '@angular/core';
import {Breadcrumb} from './breadcrumb.model';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

    public breadcrumbs: Breadcrumb[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.breadcrumbs = [];
    }

    ngOnInit(): void {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(event => {
            this.breadcrumbs = this.getBreadcrumbs(this.activatedRoute.root).reverse();
        });
    }

    private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
        const children: ActivatedRoute[] = route.children;

        if (children.length === 0) {
            return breadcrumbs;
        }

        for (const child of children) {
            if (child.outlet !== 'primary') {
                continue;
            }

            if (!child.snapshot.data.hasOwnProperty('breadcrumb') || child.snapshot.data.breadcrumb.length === 0) {
                return this.getBreadcrumbs(child, url, breadcrumbs);
            }

            const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

            if (routeURL.length !== 0) {
                url += `/${routeURL}`;

                breadcrumbs.push({
                    label: child.snapshot.data.breadcrumb,
                    params: child.snapshot.params,
                    url: url,
                    hidden: child.snapshot.data.breadcrumbHidden !== undefined ? child.snapshot.data.breadcrumbHidden : false
                });
            }

            return this.getBreadcrumbs(child, url, breadcrumbs);
        }
    }

}
