import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesNotifierComponent } from './employees-notifier.component';

describe('EmployeesNotifierComponent', () => {
  let component: EmployeesNotifierComponent;
  let fixture: ComponentFixture<EmployeesNotifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesNotifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesNotifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
