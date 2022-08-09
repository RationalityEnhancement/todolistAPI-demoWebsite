import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCheck, faArrowAltCircleLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Item } from 'src/app/interfaces/item';

@Component({
  selector: 'task-preview',
  templateUrl: './task-preview.component.html',
  styleUrls: ['./task-preview.component.scss']
})
export class TaskPreviewComponent implements OnInit {

  @Input() public task: Item;

  @Output() public deleteSubmit = new EventEmitter();
  @Output() public completeSubmit = new EventEmitter<Item>();

  public isOverdue: boolean;

  public completeIcon = faCheck;
  public deleteIcon = faTrashAlt;
  public undoIcon = faArrowAltCircleLeft;


  constructor() { }

  ngOnInit(): void {
    this.setOverdueStatus();
  }

  public deleteTask(): void {
    this.deleteSubmit.emit();
  }

  public toggleComplete(): void {
    const task = { ...this.task, completed: !this.task.completed };

    this.completeSubmit.emit(task);
  }

  private setOverdueStatus(): void {
    if (this.task.deadline) {
      const deadlineDate = new Date(this.task.deadline);
      const todayDate = new Date(new Date().toISOString().substring(0, 10));

      this.isOverdue = deadlineDate < todayDate;
    }
  }
}
