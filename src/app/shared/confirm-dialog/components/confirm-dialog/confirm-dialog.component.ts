import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ConfirmDialog} from '../../models/confirm-dialog.model';

@Component({
    selector: 'confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: ConfirmDialog) {

    }

    public onNoClick(): void {
        this.dialogRef.close(false);
    }

    public onYesClick(): void {
        this.dialogRef.close(true);
    }
}
