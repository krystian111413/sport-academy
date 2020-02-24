export enum SortingOrder {
    DESC = 'desc',
    ASC = 'asc'
}

export interface SortingData {
    active: string;
    direction: string;
}

export interface Sorting {
    orderBy: string;
    orderDirection: string;
}