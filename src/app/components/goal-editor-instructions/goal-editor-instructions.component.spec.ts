import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalEditorInstructionsComponent } from './goal-editor-instructions.component';

describe('GoalEditorInstructionsComponent', () => {
  let component: GoalEditorInstructionsComponent;
  let fixture: ComponentFixture<GoalEditorInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalEditorInstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalEditorInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
