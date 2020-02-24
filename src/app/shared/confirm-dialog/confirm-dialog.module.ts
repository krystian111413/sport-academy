import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {MatButtonModule, MatDialogModule, MatIconModule} from '@angular/material';
import {ConfirmDialogService} from './services/confirm-dialog.service';

@NgModule({
    declarations: [ConfirmDialogComponent],
    imports: [
        CommonModule,

        // Material
        MatDialogModule,
        MatIconModule,
        MatButtonModule
    ],
    providers: [ConfirmDialogService],
    entryComponents: [ConfirmDialogComponent]
})
export class ConfirmDialogModule {
}
