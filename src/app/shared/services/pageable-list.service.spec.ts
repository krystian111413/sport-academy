import {TestBed} from '@angular/core/testing';

import {PageableListService} from './pageable-list.service';
import {Pagination} from '../rest/pagination.model';

describe('PageableListService', () => {
    let service: PageableListService;
    const key = 'paginationServiceTest';
    const pagination: Pagination = {
        page: 1,
        size: 25
    };

    beforeEach(() => {
        TestBed.configureTestingModule({});

        service = TestBed.get(PageableListService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('When savePagination() has been called', () => {
        it('should save filters in localStorage', () => {
            spyOn(localStorage, 'setItem');

            service.savePagination(key, pagination);

            expect(localStorage.setItem).toHaveBeenCalledWith(service.localStorageKey + key, JSON.stringify(pagination));
        });
    });

    describe('When loadPagination() has been called', () => {
        it('should load pagination from localStorage', () => {
            spyOn(localStorage, 'getItem');

            service.loadPagination(key);

            expect(localStorage.getItem).toHaveBeenCalledWith(service.localStorageKey + key);
        });

        describe('When pagination were set', () => {
            it('should return parsed pagination from localStorage', () => {
                spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(pagination));

                const result = service.loadPagination(key);

                expect(result).toEqual(pagination);
            });
        });

        describe('When pagination were not set', () => {
            it('should return null', () => {
                spyOn(localStorage, 'getItem').and.returnValue(undefined);

                const result = service.loadPagination(key);

                expect(result).toEqual(null);
            });
        });
    });

    describe('when mergePagination has been called', () => {
        let passedPagination: Pagination;

        beforeEach(() => {
            passedPagination = {
                page: 0,
                size: 25
            };
        });

        describe('when pagination is stored in localStore', () => {
            let storedPagination: Pagination;

            beforeEach(() => {
                storedPagination = {
                    page: 1,
                    size: 20
                };

                spyOn(service, 'loadPagination').and.returnValue(storedPagination);
            });

            it('should override passed pagination', () => {

                const pagination = service.mergePagination(passedPagination, 'test');

                expect(pagination).toEqual(storedPagination);
            });
        });

        describe('when pagination is not stored in localStore', () => {
            beforeEach(() => {
                spyOn(service, 'loadPagination').and.returnValue(null);
            });

            it('should override passed pagination', () => {
                const pagination = service.mergePagination(passedPagination, 'test');

                expect(pagination).toEqual(passedPagination);
            });
        });

    });
});
