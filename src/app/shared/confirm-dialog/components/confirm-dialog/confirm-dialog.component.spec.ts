import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmDialogComponent} from './confirm-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

describe('ConfirmDialogComponent', () => {
    let component: ConfirmDialogComponent;
    let fixture: ComponentFixture<ConfirmDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConfirmDialogComponent],
            providers: [
                {provide: MatDialogRef, useValue: jasmine.createSpyObj(['close'])},
                {provide: MAT_DIALOG_DATA, useValue: jasmine.createSpyObj([''])}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should close dialog when onNoClick is call with parameter false', () => {
        component.onNoClick();
        expect(component.dialogRef.close).toHaveBeenCalledWith(false);
    });

    it('should close dialog when onYesClick is call with parameter true', () => {
        component.onYesClick();
        expect(component.dialogRef.close).toHaveBeenCalledWith(true);
    });
});
