import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkflowsOperationsSpecificContentComponent} from './workflows-operations-specific-content.component';

describe('PlaylistSpecificContentComponent', () => {
  let component: WorkflowsOperationsSpecificContentComponent;
  let fixture: ComponentFixture<WorkflowsOperationsSpecificContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowsOperationsSpecificContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowsOperationsSpecificContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
