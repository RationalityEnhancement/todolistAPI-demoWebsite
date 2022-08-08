import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/item';

@Component({
  selector: 'task-preview',
  templateUrl: './task-preview.component.html',
  styleUrls: ['./task-preview.component.scss']
})
export class TaskPreviewComponent implements OnInit {

  @Input() public task: Item;

  public isOverdue: boolean;

  constructor() { }

  ngOnInit(): void {
    this.setOverdueStatus();
   }

   private setOverdueStatus(): void {
    if (this.task.deadline) {
      const deadlineDate = new Date('08/01/2022');
      const todayDate = new Date(new Date().toISOString().substring(0, 10));

      this.isOverdue = deadlineDate < todayDate;
    }
   }
}
