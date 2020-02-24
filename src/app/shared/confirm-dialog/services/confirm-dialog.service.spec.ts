import {TestBed} from '@angular/core/testing';

import {ConfirmDialogService} from './confirm-dialog.service';
import {MatDialog} from '@angular/material';

describe('ConfirmDialogService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            ConfirmDialogService,
            {provide: MatDialog, useValue: jasmine.createSpyObj([''])}
        ]
    }));

    it('should be created', () => {
        const service: ConfirmDialogService = TestBed.get(ConfirmDialogService);
        expect(service).toBeTruthy();
    });
});
