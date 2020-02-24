import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {H2Component} from './h2.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('H2Component', () => {
    let component: H2Component;
    let fixture: ComponentFixture<H2Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [H2Component]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(H2Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
