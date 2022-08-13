import { Component, Input, OnInit } from '@angular/core';
import { Goal, Item } from 'src/app/interfaces/item';

@Component({
  selector: 'select-task',
  templateUrl: './select-task.component.html',
  styleUrls: ['./select-task.component.scss']
})
export class SelectTaskComponent implements OnInit {

  @Input() public goals: Goal[] = [];

  public get hasOpenTasks(): boolean {
    return !!this.goals
      .reduce((tasks, goal) => tasks.concat(goal.tasks), [])
      .filter(task => !task.workflowyId?.includes('everything-else'))
      .filter(task => !(task.scheduled || task.completed))
      .length;
  }

  constructor() { }

  ngOnInit(): void {
  }

  public getDisplayedTasks(tasks: Item[]): Item[] {
    const filteredTasks = tasks
      .filter(task => !task.workflowyId?.includes('everything-else'))

    return filteredTasks;
  }

}
