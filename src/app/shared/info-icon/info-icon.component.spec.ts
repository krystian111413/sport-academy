import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InfoIconComponent} from './info-icon.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('InfoIconComponent', () => {
    let component: InfoIconComponent;
    let fixture: ComponentFixture<InfoIconComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InfoIconComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InfoIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
