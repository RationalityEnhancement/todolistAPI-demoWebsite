import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Goal, Item } from 'src/app/interfaces/item';

@Component({
  selector: 'select-task',
  templateUrl: './select-task.component.html',
  styleUrls: ['./select-task.component.scss']
})
export class SelectTaskComponent implements OnInit {

  @Input() public goals: Goal[] = [];

  @Output() public submitIntentions = new EventEmitter<Item[]>();
  @Output() public close = new EventEmitter<void>();

  public selectedTasks: Item[] = [];

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

  public draftIntentions() {
    this.submitIntentions.emit(this.selectedTasks);
  }

  public cancel() {
    this.close.emit();
  }

  public selectTask(task: Item, goal: Goal) {
    this.selectedTasks.push({ ...task, goalCode: goal.code });

    console.log(this.selectedTasks)
  }

  public getDisplayedTasks(tasks: Item[]): Item[] {
    const filteredTasks = tasks
      .filter(task => !task.workflowyId?.includes('everything-else'))

    return filteredTasks;
  }

}
