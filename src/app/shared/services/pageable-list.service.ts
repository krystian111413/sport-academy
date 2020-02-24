import {Injectable} from '@angular/core';
import {Pagination} from '../rest/pagination.model';

@Injectable({
    providedIn: 'root'
})
export class PageableListService {

    public localStorageKey = 'pageableListServiceStoredPagination';

    constructor() {
    }

    public savePagination(key: string, pagination: Pagination): void {
        localStorage.setItem(this.localStorageKey + key, JSON.stringify(pagination));
    }

    public loadPagination(key: string): Pagination | null {
        const storedPagination = localStorage.getItem(this.localStorageKey + key);

        if (storedPagination) {
            return JSON.parse(storedPagination);
        }

        return null;
    }

    public mergePagination(pagination: Pagination, localStorageKey: string): Pagination {
        const storedPagination = this.loadPagination(localStorageKey);

        if (storedPagination) {
            return Object.assign(pagination, storedPagination);
        }

        return pagination;
    }
}
