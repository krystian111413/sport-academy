import {AfterViewInit, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Pagination, PaginatorData} from '../rest/pagination.model';
import {Sorting, SortingData, SortingOrder} from '../rest/sorting.model';
import {PageEvent} from '@angular/material/typings/paginator';
import {CriteriaBuilder} from '../rest/criteria-builder';
import {ListResponse} from '../../core/models/list-response.model';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {FilterableListService} from '../services/filterable-list.service';
import {PageableListService} from '../services/pageable-list.service';
import {Subscription} from 'rxjs';
import {ListService} from './list-service.model';
import {MatExpansionPanel, MatTable} from '@angular/material';
import {AdditionalCriteria} from './additional-criteria.model';
import {ActivatedRoute} from '@angular/router';

export abstract class ListComponent<T> implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('accordion', {static: false}) accordion: MatExpansionPanel;
    @ViewChild('accordion', {static: false}) table: MatTable<T>;

    public items: T[] = [];

    public isFilterable = true;
    public isFilterableCache = true;
    public filters = {};
    public searchForm: FormGroup;

    public isPageable = true;
    public pagination: Pagination = {
        page: 0,
        size: 25
    };
    public totalItems = 0;
    public pageSizeOptions: number[] = environment.pageSizeOptions;

    public sorting: Sorting = {
        orderBy: 'id',
        orderDirection: SortingOrder.DESC
    };

    public displayedColumns: string[] = [];

    public subscriptions: Subscription = new Subscription();
    public expandedElement: T;
    public additionalCriteria: AdditionalCriteria = {};
    private filterableListService: FilterableListService = new FilterableListService();
    private pageableListService: PageableListService = new PageableListService();

    constructor(
        private listService: ListService<T>,
        private route?: ActivatedRoute
    ) {
    }

    public ngOnInit(): void {
        this.loadPagination();
        this.initFilters();
        this.loadFilters();
    }

    ngAfterViewInit(): void {
        this.getList();
    }

    public ngOnDestroy(): void {
        this.saveFilters();
        this.savePagination();

        this.subscriptions.unsubscribe();
    }

    public sortData(event: SortingData): void {
        this.sorting.orderBy = event.active;
        this.sorting.orderDirection = event.direction;

        this.getList();
    }

    public getList(event?: PageEvent | PaginatorData): void {
        if (!this.searchForm.valid) {
            return;
        }

        const criteriaBuilder = new CriteriaBuilder();

        if (event !== undefined) {
            this.pagination.page = event.pageIndex;
            this.pagination.size = event.pageSize;
        }

        criteriaBuilder
        .setPagination(this.pagination)
        .setFilters(this.searchForm.value)
        .setSorting(this.sorting);

        this.listService.getList(criteriaBuilder, this.additionalCriteria).subscribe((response: ListResponse<T>) => {
            if (response) {
                this.items = response.elements;
                this.totalItems = response.totalElements;
            }
        });
    }

    public expandOrCollapseRow(element: T): void {
        if (this.expandedElement === element) {
            this.expandedElement = null;
        } else {
            this.expandedElement = element;
        }
    }

    public isRowExpanded(element: T): boolean {
        return this.expandedElement === element;
    }

    private loadPagination(): void {
        if (!this.isPageable) {
            return;
        }

        this.pagination = this.pageableListService.mergePagination(this.pagination, this.constructor.name);
    }

    private initFilters(): void {
        for (const filter of Object.keys(this.filters)) {
            if (typeof this.filters[filter] !== 'object') {
                this.filters[filter] = new FormControl(this.filters[filter]);
            }
        }
    }

    private loadFilters(): void {
        if (!this.isFilterable) {
            return;
        }

        if (this.isFilterableCache) {
            this.filters = this.filterableListService.mergeFilters(this.filters, this.constructor.name);
        }
        this.searchForm = new FormGroup(this.filters);

        this.subscriptions.add(
            this.searchForm.valueChanges.pipe(debounceTime(environment.debounceTime)).subscribe(() => {
                this.getList({pageIndex: 0, pageSize: this.pagination.size});
            })
        );

        if (this.filterableListService.hasActiveFilter(this.filters) && this.accordion) {
            this.accordion.open();
        }
    }

    private savePagination(): void {
        if (!this.isPageable) {
            return;
        }

        this.pageableListService.savePagination(this.constructor.name, this.pagination);
    }

    private saveFilters(): void {
        if (!this.isFilterable || !this.isFilterableCache) {
            return;
        }

        this.filterableListService.saveFilters(this.constructor.name, this.searchForm.value);
    }
}
