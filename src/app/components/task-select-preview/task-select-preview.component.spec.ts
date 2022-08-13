import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSelectPreviewComponent } from './task-select-preview.component';

describe('TaskSelectPreviewComponent', () => {
  let component: TaskSelectPreviewComponent;
  let fixture: ComponentFixture<TaskSelectPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskSelectPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSelectPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
