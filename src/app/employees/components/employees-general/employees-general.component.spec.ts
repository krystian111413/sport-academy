import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesGeneralComponent } from './employees-general.component';

describe('EmployeesGeneralComponent', () => {
  let component: EmployeesGeneralComponent;
  let fixture: ComponentFixture<EmployeesGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
