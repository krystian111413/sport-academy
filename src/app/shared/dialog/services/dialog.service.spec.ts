import {TestBed} from '@angular/core/testing';

import {DialogService} from './dialog.service';
import {MatDialog} from '@angular/material';
import {DialogType} from '../models/dialog-type.model';
import {DialogComponent} from '../components/dialog.component';
import SpyObj = jasmine.SpyObj;

describe('DialogService', () => {
    let service: DialogService;
    let dialog: SpyObj<MatDialog>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: MatDialog, useValue: jasmine.createSpyObj(['open'])}
            ]
        });

        service = TestBed.get(DialogService);
        dialog = TestBed.get(MatDialog);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('when showErrorDialog has been called', () => {
        it('should call showDialog', () => {
            const title = 'test title';
            const message = 'test message';
            const code = 303;

            spyOn<any>(service, 'showDialog');

            service.showErrorDialog(title, message, code);

            expect(service['showDialog']).toHaveBeenCalledWith(DialogType.Error, title, message, code);
        });
    });

    describe('when showInfoDialog has been called', () => {
        it('should call showDialog', () => {
            const title = 'test title';
            const message = 'test message';
            const code = 303;

            spyOn<any>(service, 'showDialog');

            service.showInfoDialog(title, message, code);

            expect(service['showDialog']).toHaveBeenCalledWith(DialogType.Info, title, message, code);
        });
    });

    describe('when showWarnDialog has been called', () => {
        it('should call showDialog', () => {
            const title = 'test title';
            const message = 'test message';
            const code = 303;

            spyOn<any>(service, 'showDialog');

            service.showWarnDialog(title, message, code);

            expect(service['showDialog']).toHaveBeenCalledWith(DialogType.Warn, title, message, code);
        });
    });

    describe('when showDialog has been called', () => {
        it('should call showDialog', () => {
            const type = DialogType.Warn;
            const title = 'test title';
            const message = 'test message';
            const code = 303;

            service['showDialog'](type, title, message, code);

            expect(dialog.open).toHaveBeenCalledWith(DialogComponent, {
                data: {
                    type,
                    title,
                    message,
                    code
                }
            });
        });
    });
});
