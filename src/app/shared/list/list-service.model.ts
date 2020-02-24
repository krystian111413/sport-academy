import {CriteriaBuilder} from '../rest/criteria-builder';
import {Observable} from 'rxjs';
import {ListResponse} from '../../core/models/list-response.model';
import {AdditionalCriteria} from './additional-criteria.model';

export interface ListService<T> {
    getList(criteriaBuilder: CriteriaBuilder, additionalCriteria?: AdditionalCriteria): Observable<ListResponse<T>>;
}
