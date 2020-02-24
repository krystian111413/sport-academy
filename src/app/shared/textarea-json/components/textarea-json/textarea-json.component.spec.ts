import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TextareaJsonComponent} from './textarea-json.component';

describe('TextareaJsonComponent', () => {
  let component: TextareaJsonComponent;
  let fixture: ComponentFixture<TextareaJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextareaJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
