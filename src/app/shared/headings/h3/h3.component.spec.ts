import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {H3Component} from './h3.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('H3Component', () => {
    let component: H3Component;
    let fixture: ComponentFixture<H3Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [H3Component]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(H3Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
