import { TestBed } from '@angular/core/testing';

import { NotificationEmployeesService } from './notification-employees.service';

describe('NotificationEmployeesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationEmployeesService = TestBed.get(NotificationEmployeesService);
    expect(service).toBeTruthy();
  });
});
