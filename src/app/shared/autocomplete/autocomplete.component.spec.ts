import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AutocompleteComponent} from './autocomplete.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MatAutocompleteModule} from '@angular/material';

describe('AutocompleteComponent', () => {
    let component: AutocompleteComponent;
    let fixture: ComponentFixture<AutocompleteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AutocompleteComponent],
            imports: [MatAutocompleteModule],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AutocompleteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('when writeValue has been called', () => {
        it('should set passed value to formControl', () => {
            component.writeValue('test');

            expect(component.formControl.value).toEqual('test');
        });
    });

    describe('when onOptionSelect has been called', () => {
        // @ts-ignore
        const event = {
            option: {
                value: 'test'
            }
        };

        beforeEach(() => {
            component['onChange'] = () => {
            };

            spyOn<any>(component, 'onChange');
        });

        it('should emit selected value', () => {
            // @ts-ignore
            component.onOptionSelect(event);

            expect(component['onChange']).toHaveBeenCalledWith('test');
        });
    });

    describe('when clear has been called', () => {
        beforeEach(() => {
            component.formControl.setValue('test');

            component['onChange'] = () => {
            };

            spyOn<any>(component, 'onChange');
        });

        it('should clear formControl value', () => {
            expect(component.formControl.value).toEqual('test');

            component.clear();

            expect(component.formControl.value).toEqual('');
        });

        it('should emit undefined value', () => {
            component.clear();

            expect(component['onChange']).toHaveBeenCalledWith(undefined);
        });
    });
});
