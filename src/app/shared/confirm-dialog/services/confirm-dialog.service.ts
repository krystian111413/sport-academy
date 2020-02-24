import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ConfirmDialog} from '../models/confirm-dialog.model';
import {Observable, Observer} from 'rxjs';
import {ConfirmDialogComponent} from '../components/confirm-dialog/confirm-dialog.component';

@Injectable()
export class ConfirmDialogService {

    constructor(
        public dialog: MatDialog) {
    }

    public open(confirmDialog: ConfirmDialog): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                data: confirmDialog
            });

            dialogRef.afterClosed().subscribe(result => {
                observer.next(result);
                observer.complete();
            });
        });
    }
}
