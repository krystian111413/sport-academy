import {Pagination} from './pagination.model';
import {Sorting, SortingOrder} from './sorting.model';

export class CriteriaBuilder {
    private sortingEnabled: boolean = true;
    private sorting: Sorting = {
        orderBy: 'id',
        orderDirection: SortingOrder.DESC
    };

    private pagingEnabled: boolean = true;
    private pagination: Pagination = {
        page: 1,
        size: 25
    };

    private filters: {} = {};

    public enableSorting(): this {
        this.sortingEnabled = true;

        return this;
    }

    public disableSorting(): this {
        this.sortingEnabled = false;

        return this;
    }

    public setOrderBy(orderBy: string): this {
        this.sorting.orderBy = orderBy;

        return this;
    }

    public setOrderDirection(orderDirection: string): this {
        this.sorting.orderDirection = orderDirection;

        return this;
    }

    public enablePaging(): this {
        this.pagingEnabled = true;

        return this;
    }

    public disablePaging(): this {
        this.pagingEnabled = false;

        return this;
    }

    public setPage(page: number): this {
        this.pagination.page = page;

        return this;
    }

    public setPageSize(pageSize: number): this {
        this.pagination.size = pageSize;

        return this;
    }

    public toJSON(): Object {
        return Object.assign(
            {
                sortingEnabled: this.sortingEnabled,
                orderBy: this.sorting.orderBy,
                orderDirection: this.sorting.orderDirection.toUpperCase(),
                pagingEnabled: this.pagingEnabled,
                page: this.pagination.page + 1,
                size: this.pagination.size
            },
            this.filters
        );
    }

    public setPagination(pagination: Pagination): this {
        this.setPage(pagination.page);
        this.setPageSize(pagination.size);

        return this;
    }

    public setFilters(filters: any): this {
        for (const filter of Object.getOwnPropertyNames(filters)) {
            this.addFilter(filter, this.formatFilterValue(filters[filter]));
        }

        return this;
    }

    public setSorting(sorting: Sorting): this {
        this.sorting = sorting;

        return this;
    }

    public addFilter(filterKey: string, filterValue: string | number | boolean): this {
        if (typeof filterValue === 'string' && filterValue.length === 0) {
            return this;
        }

        this.filters[filterKey] = this.formatFilterValue(filterValue);

        return this;
    }

    private formatFilterValue(filterValue: any): any {
        if (filterValue && typeof filterValue === 'object') {
            switch (filterValue.constructor.name) {
                case 'Moment':
                    return filterValue.format('YYYY-MM-DD');
                default:
                    return filterValue;
            }
        }

        return filterValue;
    }
}