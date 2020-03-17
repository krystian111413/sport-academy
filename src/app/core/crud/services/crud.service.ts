import {ListService} from '../../../shared/list/list-service.model';
import {RestService} from '../../services/rest/rest.service';
import {ListResponse} from '../../models/list-response.model';
import {Observable, Observer} from 'rxjs';
import {AdditionalCriteria} from '../../../shared/list/additional-criteria.model';
import {CriteriaBuilder} from '../../../shared/rest/criteria-builder';
import {HttpClient} from '@angular/common/http';

export abstract class CrudService<INSTANCE_DTO, INSTANCE_CREATE_DTO> {

    constructor(protected restService: HttpClient,
                protected path: string) {
    }

    getAll(): Observable<INSTANCE_DTO[]> {
        return this.restService.get<INSTANCE_DTO[]>(this.path);
    }

    getInstance(id: number | string): Observable<INSTANCE_DTO> {
        return this.restService.get<INSTANCE_DTO>(`${this.path}/${id}`);
    }

    add(instanceCreateDto: INSTANCE_CREATE_DTO): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {
            this.restService.post<void>(this.path, instanceCreateDto).subscribe(() => {
                observer.next(true);
                observer.complete();
            }, () => {
                observer.next(false);
                observer.complete();
            });
        });
    }

    update(id: number | string, value: INSTANCE_DTO): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {
            this.restService.put(`${this.path}/${id}`, value).subscribe(() => {
                observer.next(true);
                observer.complete();
            }, () => {
                observer.next(false);
                observer.complete();
            });
        });
    }

    deleteInstance(id: number): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {
            this.restService.delete(`${this.path}/${id}`).subscribe(() => {
                observer.next(true);
                observer.complete();
            }, () => {
                observer.next(false);
                observer.complete();
            });
        });
    }
}
