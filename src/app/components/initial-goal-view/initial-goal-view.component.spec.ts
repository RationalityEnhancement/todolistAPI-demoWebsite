import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialGoalViewComponent } from './initial-goal-view.component';

describe('InitialGoalViewComponent', () => {
  let component: InitialGoalViewComponent;
  let fixture: ComponentFixture<InitialGoalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialGoalViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialGoalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
