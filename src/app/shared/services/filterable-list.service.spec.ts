import {TestBed} from '@angular/core/testing';

import {FilterableListService} from './filterable-list.service';
import {FormControl} from '@angular/forms';

describe('FilterableListService', () => {
    let service: FilterableListService;
    const key = 'testKey';
    const filters = {
        filter1: 'test',
        filter2: 123,
        filter3: 1233.2
    };

    beforeEach(() => {
        TestBed.configureTestingModule({});

        service = TestBed.get(FilterableListService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('When saveFilters() has been called', () => {
        it('should save filters in localStorage', () => {
            spyOn(localStorage, 'setItem');

            service.saveFilters(key, filters);

            expect(localStorage.setItem).toHaveBeenCalledWith(service.localStorageKey + key, JSON.stringify(filters));
        });
    });

    describe('When loadFilters() has been called', () => {
        it('should load filters from localStorage', () => {
            spyOn(localStorage, 'getItem');

            service.loadFilters(key);

            expect(localStorage.getItem).toHaveBeenCalledWith(service.localStorageKey + key);
        });

        describe('When filters were set', () => {
            it('should return parsed filters from localStorage', () => {
                spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(filters));

                const result = service.loadFilters(key);

                expect(result).toEqual(filters);
            });
        });

        describe('When filters were not set', () => {
            it('should return null', () => {
                spyOn(localStorage, 'getItem').and.returnValue(undefined);

                const result = service.loadFilters(key);

                expect(result).toEqual(null);
            });
        });
    });

    describe('When mergeFilters() has been called', () => {
        const passedFilters = {
            filter2: new FormControl(555)
        };

        it('should load filters from localStorage', () => {
            spyOn(localStorage, 'getItem');

            service.mergeFilters(passedFilters, key);

            expect(localStorage.getItem).toHaveBeenCalledWith(service.localStorageKey + key);
        });

        describe('When filters were set', () => {
            it('should return merged filters', () => {
                spyOn(service, 'loadFilters').and.returnValue(filters);

                const result = service.mergeFilters(passedFilters, key);

                console.log(result);

                expect(result).toEqual(Object.assign(passedFilters, filters));
            });
        });

        describe('When filters were not set', () => {
            it('should return passed filters', () => {
                spyOn(service, 'loadFilters').and.returnValue(null);

                const result = service.mergeFilters(passedFilters, key);

                expect(result).toEqual(passedFilters);
            });
        });
    });

    describe('When hasActiveFilter() has been called', () => {
        describe('When at least one filter is active', () => {
            const activeFilter = {
                filter1: new FormControl(undefined),
                filter2: new FormControl(123),
                filter3: new FormControl(undefined)
            };

            it('should return true', () => {
                const result = service.hasActiveFilter(activeFilter);

                expect(result).toBeTruthy();
            });
        });

        describe('When all filters are null/undefined', () => {
            const emptyFilters = {
                filter1: new FormControl(undefined),
                filter2: new FormControl(undefined),
                filter3: new FormControl(undefined)
            };

            it('should return false', () => {
                const result = service.hasActiveFilter(emptyFilters);

                expect(result).toBeFalsy();
            });
        });
    });
});
