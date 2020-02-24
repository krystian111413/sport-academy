import {Injectable} from '@angular/core';
import {PayloadForWorkflowsOperation} from "../workflows-operations.component";
import {Observable} from "rxjs";
import {RestService} from "../../../core/services/rest/rest.service";

@Injectable()
export class WorkflowsOperationsRequestsService {

    constructor(private restService: RestService) {
    }

    request(request: PayloadForWorkflowsOperation): Observable<boolean> {
        return this.restService.post('api/v2/work-flows', request);
    }
}
