import {TestBed} from '@angular/core/testing';

import {WorkflowsOperationsRequestsService} from './workflows-operations-requests.service';

describe('WorkflowsOperationsRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkflowsOperationsRequestsService = TestBed.get(WorkflowsOperationsRequestsService);
    expect(service).toBeTruthy();
  });
});
