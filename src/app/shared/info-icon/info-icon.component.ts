import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'info-icon',
    templateUrl: './info-icon.component.html',
    styleUrls: ['./info-icon.component.scss']
})
export class InfoIconComponent implements OnInit {
    @Input() tooltipText: string = 'See details';

    constructor() {
    }

    ngOnInit() {
    }

}
