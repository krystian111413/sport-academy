import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../components/dialog.component';
import {DialogType} from '../models/dialog-type.model';

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    constructor(private dialog: MatDialog) {
    }

    public showErrorDialog(title: string, message: string, code?: number): void {
        this.showDialog(DialogType.Error, title, message, code);
    }

    public showWarnDialog(title: string, message: string, code?: number): void {
        this.showDialog(DialogType.Warn, title, message, code);
    }

    public showInfoDialog(title: string, message: string, code?: number): void {
        this.showDialog(DialogType.Info, title, message, code);
    }

    private showDialog(type: DialogType, title: string, message: string, code?: number): void {
        this.dialog.open(DialogComponent, {
            data: {
                title: title,
                type: type,
                code: code,
                message: message
            }
        });
    }
}
