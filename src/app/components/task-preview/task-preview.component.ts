import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCheck, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Item } from 'src/app/interfaces/item';

@Component({
  selector: 'task-preview',
  templateUrl: './task-preview.component.html',
  styleUrls: ['./task-preview.component.scss']
})
export class TaskPreviewComponent implements OnInit {

  @Input() public task: Item;

  @Output() public deleteSubmit = new EventEmitter();

  public isOverdue: boolean;

  public completeIcon = faCheck;
  public deleteIcon = faTrashAlt;
  public editIcon = faEdit


  constructor() { }

  ngOnInit(): void {
    this.setOverdueStatus();
   }

   public delete(): void {
    this.deleteSubmit.emit();
   }

   private setOverdueStatus(): void {
    if (this.task.deadline) {
      const deadlineDate = new Date(this.task.deadline);
      const todayDate = new Date(new Date().toISOString().substring(0, 10));

      this.isOverdue = deadlineDate < todayDate;
    }
   }
}
