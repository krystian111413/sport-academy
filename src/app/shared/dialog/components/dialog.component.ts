import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {DialogData} from '../models/dialog-data.model';
import {DialogType} from '../models/dialog-type.model';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

    public dialogType = DialogType;

    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

}
