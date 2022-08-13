import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Goal, Item } from 'src/app/interfaces/item';
import { GoalService } from 'src/app/provider/goal.service';

@Component({
  selector: 'select-task-button',
  templateUrl: './select-task-button.component.html',
  styleUrls: ['./select-task-button.component.scss']
})
export class SelectTaskButtonComponent implements OnInit {

  public goals$: Observable<Goal[]>;

  public popupDisplayed: boolean;

  constructor(private goalService: GoalService) { 
    this.goals$ = this.goalService.listenToGoals();
  }

  ngOnInit(): void {
  }

  public showPopup() {
    this.popupDisplayed = true;
  }

  public closePopup() {
    this.popupDisplayed = false;
  }

  public draftIntentions(tasks: Item[]) {
    console.log(tasks);
  }

}
