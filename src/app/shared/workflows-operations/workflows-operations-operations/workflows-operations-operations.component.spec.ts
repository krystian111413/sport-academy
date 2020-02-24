import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkflowsOperationsOperationsComponent} from './workflows-operations-operations.component';

describe('PlaylistOperationsComponent', () => {
  let component: WorkflowsOperationsOperationsComponent;
  let fixture: ComponentFixture<WorkflowsOperationsOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowsOperationsOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowsOperationsOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
