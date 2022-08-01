import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialGoalFormComponent } from './initial-goal-form.component';

describe('InitialGoalFormComponent', () => {
  let component: InitialGoalFormComponent;
  let fixture: ComponentFixture<InitialGoalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialGoalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialGoalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
