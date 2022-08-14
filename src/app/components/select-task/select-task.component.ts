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
  @Output() public submitOptimalTodoList = new EventEmitter<void>();
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

  public createOptimalTodolist() {
    this.submitOptimalTodoList.emit();
  }

  public cancel() {
    this.close.emit();
  }

  public selectTask(task: Item, goal: Goal): void {
    if (!this.isTaskSelected(task)) {
      const selectedTask = { ...task, goalCode: goal.code };

      this.selectedTasks = this.selectedTasks.concat([selectedTask]);
    } else {
      this.selectedTasks = this.selectedTasks.filter(selectedTask =>
        selectedTask.workflowyId !== task.workflowyId
      );
    }
  }

  public getDisplayedTasks(tasks: Item[]): Item[] {
    return tasks
      .filter(task => !task.workflowyId?.includes('everything-else'))
      .filter(task => !(task.completed || task.scheduled));
  }

  public isTaskSelected(task: Item): boolean {
    return this.selectedTasks
      .map(selectedTask => selectedTask.workflowyId)
      .includes(task.workflowyId);
  }
}
