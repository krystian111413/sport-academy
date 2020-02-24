import {TestBed} from '@angular/core/testing';

import {WorkflowsConfigEntityService} from './workflows-config-entity.service';

describe('WorkflowsConfigEntityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkflowsConfigEntityService = TestBed.get(WorkflowsConfigEntityService);
    expect(service).toBeTruthy();
  });
});
