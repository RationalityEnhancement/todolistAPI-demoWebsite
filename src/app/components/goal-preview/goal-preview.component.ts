import { Component, Input, OnInit } from '@angular/core';
import { faCheck, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Goal } from 'src/app/interfaces/item';

@Component({
  selector: 'goal-preview',
  templateUrl: './goal-preview.component.html',
  styleUrls: ['./goal-preview.component.scss']
})
export class GoalPreviewComponent implements OnInit {

  @Input() public goal: Goal;

  public isOverdue: boolean;
  
  public completeIcon = faCheck;
  public deleteIcon = faTrashAlt;
  public editIcon = faEdit

  constructor() { }

  ngOnInit(): void {
    this.setOverdueStatus();
  }

  private setOverdueStatus(): void {
    const deadlineDate = new Date(this.goal.deadline);
    const todayDate = new Date(new Date().toISOString().substring(0, 10));

    this.isOverdue = deadlineDate < todayDate;
  }
}
