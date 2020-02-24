import { TestBed } from '@angular/core/testing';

import { EmployeesNotificationService } from './employees-notification.service';

describe('EmployeesNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeesNotificationService = TestBed.get(EmployeesNotificationService);
    expect(service).toBeTruthy();
  });
});
