import { Component, Input, OnInit } from '@angular/core';
import { Goal } from 'src/app/interfaces/item';
import { GoalService } from 'src/app/provider/goal.service';

@Component({
  selector: 'further-goals',
  templateUrl: './further-goals.component.html',
  styleUrls: ['./further-goals.component.scss']
})
export class FurtherGoalsComponent implements OnInit {

  @Input() public goals: Goal[] = [];

  public isFormOpen: boolean;

  constructor(
    private goalService: GoalService
  ) { }

  ngOnInit(): void {
  }

  public openForm(): void {
    this.isFormOpen = true;
  }

  public closeForm(): void {
    this.isFormOpen = false;
  }

  public addFurtherGoal(goalProperties: Goal) {
    this.goalService.addGoal(goalProperties)
      .subscribe();
  }
}
