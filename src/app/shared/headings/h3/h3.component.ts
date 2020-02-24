import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'h3-heading',
    templateUrl: './h3.component.html',
    styleUrls: ['./h3.component.scss']
})
export class H3Component implements OnInit {
    @Input() icon: string = '';

    constructor() {
    }

    ngOnInit(): void {
    }

}
