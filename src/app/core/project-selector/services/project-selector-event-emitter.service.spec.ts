import {TestBed} from '@angular/core/testing';

import {ProjectSelectorEventEmitterService} from './project-selector-event-emitter.service';

describe('ProjectSelectorEventEmitterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectSelectorEventEmitterService = TestBed.get(ProjectSelectorEventEmitterService);
    expect(service).toBeTruthy();
  });
});
