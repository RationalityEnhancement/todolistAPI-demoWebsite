import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { CompliceGoal } from 'src/app/interfaces/Complice-Goal';
import { Goal, Item } from 'src/app/interfaces/item';
import { AdapterService } from 'src/app/provider/adapter.service';
import { GoalService } from 'src/app/provider/goal.service';

@Component({
  selector: 'select-task-button',
  templateUrl: './select-task-button.component.html',
  styleUrls: ['./select-task-button.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SelectTaskButtonComponent implements OnInit {

  @Input() public set regGoals(goals: string) {
    if (!!goals) {
      this.initializeGoals(goals);
    }
  }

  @Output() public selectedTasksEvent = new EventEmitter<Item[]>()

  public goals: Goal[] = [];
  public popupDisplayed: boolean;

  constructor(
    private adapterService: AdapterService
  ) {
  }

  ngOnInit(): void {
  }

  public showPopup() {
    this.popupDisplayed = true;
  }

  public closePopup() {
    this.popupDisplayed = false;
  }

  public selectTasks(tasks: Item[]) {
    this.selectedTasksEvent.emit(tasks);
    this.closePopup();
  }

  private initializeGoals(goals: string): void {
    try {
      const compliceGoals = this.adapterService.parseEntities<CompliceGoal>(goals);
      const regGoals = this.adapterService.toRegGoals(compliceGoals);

      this.goals = regGoals;
    } catch (e) {
      this.handleError();
    }
  }

  private handleError() {
    console.warn('invalid goals: Please check again input string');
  }
}
