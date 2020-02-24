import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FilterableListService {

    public localStorageKey = 'filterableListServiceStoredFilters';

    constructor() {
    }

    public saveFilters(key: string, filters: object): void {
        localStorage.setItem(this.localStorageKey + key, JSON.stringify(this.formatFilterValues(filters)));
    }

    public loadFilters(key: string): object | null {
        const storedFilters = localStorage.getItem(this.localStorageKey + key);

        return storedFilters ? JSON.parse(storedFilters) : null;
    }

    public mergeFilters(filters: object, localStorageKey: string): object {
        const storedFilters = this.loadFilters(localStorageKey);
        if (storedFilters) {
            for (const filter of Object.getOwnPropertyNames(storedFilters)) {
                if (filters[filter]) {

                    filters[filter].setValue(storedFilters[filter]);
                }
            }
        }

        return filters;
    }

    public hasActiveFilter(filters: object): boolean {
        for (const filter of Object.getOwnPropertyNames(filters)) {
            if (filters[filter] && filters[filter].value && filters[filter].value.toString().length) {
                return true;
            }
        }

        return false;
    }

    private formatFilterValues(filters: object): object {
        for (const filter of Object.getOwnPropertyNames(filters)) {
            if (filters[filter] && typeof filters[filter] === 'object') {
                switch (filters[filter].constructor.name) {
                    case 'Moment':
                        filters[filter] = filters[filter].format('YYYY-MM-DD');
                        break;
                    default:
                        break;
                }
            }
        }

        return filters;
    }
}
