import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'h2-heading',
    templateUrl: './h2.component.html',
    styleUrls: ['./h2.component.scss']
})
export class H2Component implements OnInit {
    @Input() icon: string = '';

    constructor() {
    }

    ngOnInit(): void {
    }

}
