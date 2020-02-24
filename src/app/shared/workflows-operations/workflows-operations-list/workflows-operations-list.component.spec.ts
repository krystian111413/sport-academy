import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkflowsOperationsListComponent} from './workflows-operations-list.component';

describe('PlaylistListComponent', () => {
  let component: WorkflowsOperationsListComponent;
  let fixture: ComponentFixture<WorkflowsOperationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowsOperationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowsOperationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
