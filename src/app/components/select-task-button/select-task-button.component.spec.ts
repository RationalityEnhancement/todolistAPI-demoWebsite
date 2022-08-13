import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTaskButtonComponent } from './select-task-button.component';

describe('SelectTaskButtonComponent', () => {
  let component: SelectTaskButtonComponent;
  let fixture: ComponentFixture<SelectTaskButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTaskButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTaskButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
