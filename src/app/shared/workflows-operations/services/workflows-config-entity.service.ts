import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {EntityConfiguration} from '../models/entity-configuration';
import {RestService} from "../../../core/services/rest/rest.service";

@Injectable()
export class WorkflowsConfigEntityService {

  constructor(private restService: RestService) { }

    getWorkflowsConfigType(entityType: string): Observable<EntityConfiguration> {
        return this.restService.get<EntityConfiguration>(`entity-configurations/${entityType}`);
    }
}
