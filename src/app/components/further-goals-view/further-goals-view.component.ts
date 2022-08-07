import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Goal } from 'src/app/interfaces/item';
import { GoalService } from 'src/app/provider/goal.service';

@Component({
  selector: 'further-goals-view',
  templateUrl: './further-goals-view.component.html',
  styleUrls: ['./further-goals-view.component.scss']
})
export class FurtherGoalsViewComponent implements OnInit {

  @Input() public goals: Goal[] = [];

  @Output() public continueToGoalEditor = new EventEmitter<void>();

  public currentForm: 'addGoal' | 'editGoal' | 'none';
  public selectedGoal: Goal;

  constructor(
    private goalService: GoalService
  ) { }

  ngOnInit(): void {
  }

  public toggleAddGoalForm(): void {
    this.currentForm = 'addGoal';
  }

  public toggleEditGoalForm(goal: Goal): void {
    this.selectedGoal = goal;
    this.currentForm = 'editGoal';
  }

  public closeForm(): void {
    this.currentForm = 'none';
  }

  public addFurtherGoal(goalProperties: Goal) {
    this.goalService.addGoal(goalProperties)
      .subscribe();
  }
  public editGoal(goalProperties: Goal) {
    this.goalService.editGoal(goalProperties)
      .subscribe();
  }

  public continue(): void {
    this.continueToGoalEditor.emit();
  }
}
