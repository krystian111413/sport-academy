export interface ListResponse<T> {
  elements: T[];
  totalElements: number;
  orderBy: string;
  orderDirection: 'ASC' | 'DESC';
  page: number;
  size: number;
  totalPages: number;
}
