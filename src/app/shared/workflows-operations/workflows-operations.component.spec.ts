import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkflowsOperationsComponent} from './workflows-operations.component';

describe('PlaylistComponent', () => {
  let component: WorkflowsOperationsComponent;
  let fixture: ComponentFixture<WorkflowsOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowsOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowsOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
