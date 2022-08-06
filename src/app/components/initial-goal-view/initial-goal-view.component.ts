import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Goal } from 'src/app/interfaces/item';
import { GoalService } from 'src/app/provider/goal.service';

@Component({
  selector: 'initial-goal-view',
  templateUrl: './initial-goal-view.component.html',
  styleUrls: ['./initial-goal-view.component.scss']
})
export class InitialGoalViewComponent implements OnInit {

  @Output() public submitInitialGoal = new EventEmitter();

  public goalProperties: Goal;
  public isGoalPreview: boolean;

  constructor(
    private goalService: GoalService
  ) { }

  ngOnInit(): void {
  }

  public showGoalPreview(goalProperties: Goal): void {
    this.goalProperties = goalProperties;
    this.isGoalPreview = true;
  }

  public addInitialGoal() {
    this.goalService.addGoal(this.goalProperties)
      .subscribe(() => {
        this.submitInitialGoal.emit();
      });
  }

}
