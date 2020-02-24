import {ListComponent} from './list-component';
import {ListResponse} from '../../core/models/list-response.model';
import {ListService} from './list-service.model';
import {ListItem} from './list-item.model';
import {CriteriaBuilder} from '../rest/criteria-builder';
import {AdditionalCriteria} from './additional-criteria.model';
import {Observable, of} from 'rxjs';
import {SortingData, SortingOrder} from '../rest/sorting.model';
import {Pagination, PaginatorData} from '../rest/pagination.model';
import {FormControl} from '@angular/forms';

describe('ListComponent', () => {
    let component: ListComponent<ListItem>;

    const listServiceMock: ListService<ListItem> = {
        getList: (criteriaBuilder: CriteriaBuilder, additionalCriteria?: AdditionalCriteria): Observable<ListResponse<ListItem>> => {
            return of(getListResponseMock);
        }
    };

    const getListResponseMock: ListResponse<ListItem> = {
        page: 1,
        totalPages: 1,
        elements: [],
        size: 0,
        orderBy: 'name',
        orderDirection: 'ASC',
        totalElements: 0
    };

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('when ngAfterViewInit has been called', () => {
        it('should call getList', () => {
            spyOn(component, 'getList');

            component.ngAfterViewInit();

            expect(component.getList).toHaveBeenCalled();
        });
    });

    describe('when ngOnDestroy has been called', () => {
        beforeEach(() => {
            // @ts-ignore
            component.searchForm = {
                value: {}
            };
        });

        it('should save filters', () => {
            spyOn<any>(component, 'saveFilters');

            component.ngOnDestroy();

            expect(component['saveFilters']).toHaveBeenCalled();
        });

        it('should call pagination', () => {
            spyOn<any>(component, 'savePagination');

            component.ngOnDestroy();

            expect(component['savePagination']).toHaveBeenCalled();
        });
    });

    describe('when sortData has been called', () => {
        let sortData: SortingData;

        beforeEach(() => {
            sortData = {
                direction: SortingOrder.DESC,
                active: 'test'
            };

            spyOn(component, 'getList');

            component.sortData(sortData);
        });

        it('should set sort data', () => {
            expect(component.sorting.orderBy).toEqual(sortData.active);
            expect(component.sorting.orderDirection).toEqual(sortData.direction);
        });

        it('should call getList', () => {
            expect(component.getList).toHaveBeenCalled();
        });
    });

    describe('when getList() has been called', () => {
        beforeEach(() => {
            spyOn<any>(component['listService'], 'getList').and.callThrough();
        });

        describe('when form is invalid', () => {
            beforeEach(() => {
                // @ts-ignore
                component.searchForm = {
                    valid: false
                };
            });

            it('should not call listService.getList', () => {
                component.getList();

                expect(component['listService'].getList).not.toHaveBeenCalled();
            });
        });

        describe('when form is valid', () => {
            beforeEach(() => {
                // @ts-ignore
                component.searchForm = {
                    valid: true,
                    value: {}
                };
            });

            describe('when event has been passed', () => {
                it('should set pagination', () => {
                    const event: PaginatorData = {
                        pageIndex: 1,
                        pageSize: 100
                    };

                    component.getList(event);

                    expect(component.pagination.page).toEqual(event.pageIndex);
                    expect(component.pagination.size).toEqual(event.pageSize);
                });
            });

            it('should call listService.getList', () => {
                component.getList();

                expect(component['listService'].getList).toHaveBeenCalled();
            });
        });
    });

    describe('when expandOrCollapseRow() has been called', () => {
        describe('when passed element is equal to expandedElement', () => {
            beforeEach(() => {
                const passedElement: ListItem = {
                    id: 1
                };

                component.expandedElement = passedElement;

                component.expandOrCollapseRow(passedElement);
            });

            it('should nullify expandedElement', () => {
                expect(component.expandedElement).toBeNull();
            });
        });

        describe('when passed element is not equal to expandedElement', () => {
            let passedElement: ListItem;

            beforeEach(() => {
                passedElement = {
                    id: 1
                };

                component.expandedElement = {
                    id: 123
                };
            });

            it('should nullify expandedElement', () => {
                expect(component.expandedElement).not.toEqual(passedElement);

                component.expandOrCollapseRow(passedElement);

                expect(component.expandedElement).toEqual(passedElement);
            });
        });
    });

    describe('when isRowExpanded() has been called', () => {
        describe('when passed element is equal to expandedElement', () => {
            let passedElement: ListItem;

            beforeEach(() => {
                passedElement = {
                    id: 1
                };

                component.expandedElement = passedElement;
            });

            it('should return true', () => {
                const result = component.isRowExpanded(passedElement);

                expect(result).toBeTruthy();
            });
        });

        describe('when passed element is not equal to expandedElement', () => {
            let passedElement: ListItem;

            beforeEach(() => {
                passedElement = {
                    id: 1
                };

                component.expandedElement = {
                    id: 123
                };
            });

            it('should nullify expandedElement', () => {
                const result = component.isRowExpanded(passedElement);

                expect(result).toBeFalsy();
            });
        });
    });

    describe('when loadPagination() has been called', () => {
        describe('when isPageable true', () => {
            beforeEach(() => {
                component.isPageable = true;
            });

            it('should set pagination from service', () => {
                const pagination: Pagination = {
                    size: 25,
                    page: 2
                };

                component['pageableListService'].mergePagination = () => {
                    return pagination;
                };

                component['loadPagination']();

                expect(component.pagination).toEqual(pagination);
            });
        });

        describe('when isPageable false', () => {
            beforeEach(() => {
                component.isPageable = false;
            });

            it('should not set pagination from service', () => {
                spyOn(component['pageableListService'], 'mergePagination');

                component['loadPagination']();

                expect(component['pageableListService'].mergePagination).not.toHaveBeenCalled();
            });
        });
    });

    describe('when savePagination() has been called', () => {
        describe('when isPageable true', () => {
            const pagination: Pagination = {
                page: 2,
                size: 4
            };

            beforeEach(() => {
                component.isPageable = true;

                component.pagination = pagination;
            });

            it('should call pageableListService.savePagination', () => {
                spyOn(component['pageableListService'], 'savePagination');

                component['savePagination']();

                expect(component['pageableListService'].savePagination).toHaveBeenCalledWith(component.constructor.name, pagination);
            });

            describe('when isPageable false', () => {
                beforeEach(() => {
                    component.isPageable = false;
                });

                it('should not save pagination', () => {
                    spyOn(component['pageableListService'], 'savePagination');

                    component['savePagination']();

                    expect(component['pageableListService'].savePagination).not.toHaveBeenCalled();
                });
            });
        });
    });

    describe('when initFilters() has been called', () => {
        beforeEach(() => {
            component.filters = {
                filter1: undefined,
                filter2: 'filter2.state',
                filter3: new FormControl('filter3.state')
            };
        });

        it('should prepare FormControl filters', () => {
            component['initFilters']();

            expect(component.filters['filter1'].value).toEqual(null);
            expect(component.filters['filter2'].value).toEqual('filter2.state');
            expect(component.filters['filter3'].value).toEqual('filter3.state');
        });
    });

    describe('when loadFilters() has been called', () => {
        describe('when isFilterable true', () => {
            beforeEach(() => {
                component.isFilterable = true;

                spyOn<any>(component['filterableListService'], 'mergeFilters').and.returnValue({
                    filter1: new FormControl('test'),
                    filter2: new FormControl('test2'),
                });
            });

            it('should call filterableListService.mergeFilters', () => {
                component['loadFilters']();

                expect(component['filterableListService'].mergeFilters).toHaveBeenCalled();
            });

            describe('when accordion is set', () => {
                beforeEach(() => {
                    // @ts-ignore
                    component.accordion = {
                        open: () => {
                        }
                    };
                    spyOn(component.accordion, 'open');
                });

                describe('when is active filter', () => {
                    beforeEach(() => {
                        spyOn(component['filterableListService'], 'hasActiveFilter').and.returnValue(true);

                        component['loadFilters']();
                    });

                    it('should open accordion', () => {
                        expect(component.accordion.open).toHaveBeenCalled();
                    });
                });

                describe('when is not active filter', () => {
                    beforeEach(() => {
                        spyOn(component['filterableListService'], 'hasActiveFilter').and.returnValue(false);

                        component['loadFilters']();
                    });

                    it('should not open accordion', () => {
                        expect(component.accordion.open).not.toHaveBeenCalled();
                    });
                });
            });
        });

        describe('when isFilterable false', () => {
            beforeEach(() => {
                component.isFilterable = false;
            });

            it('should not load filters', () => {
                spyOn(component['filterableListService'], 'mergeFilters');

                component['loadFilters']();

                expect(component['filterableListService'].mergeFilters).not.toHaveBeenCalled();
            });
        });
    });

    describe('when saveFilters() has been called', () => {
        describe('when isFilterable true', () => {
            const formValues = {
                test: 'test',
                test2: 'test2'
            };

            beforeEach(() => {
                component.isFilterable = true;

                // @ts-ignore
                component.searchForm = {
                    value: formValues
                };
            });

            it('should call filterableListService.saveFilters', () => {
                spyOn(component['filterableListService'], 'saveFilters');

                component['saveFilters']();

                expect(component['filterableListService'].saveFilters).toHaveBeenCalledWith(component.constructor.name, formValues);
            });

            describe('when isFilterable false', () => {
                beforeEach(() => {
                    component.isFilterable = false;
                });

                it('should not save filters', () => {
                    spyOn(component['filterableListService'], 'saveFilters');

                    component['saveFilters']();

                    expect(component['filterableListService'].saveFilters).not.toHaveBeenCalled();
                });
            });
        });
    });
});
