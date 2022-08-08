import { Component, Input, OnInit } from '@angular/core';
import { Goal } from 'src/app/interfaces/item';

@Component({
  selector: 'goal-preview',
  templateUrl: './goal-preview.component.html',
  styleUrls: ['./goal-preview.component.scss']
})
export class GoalPreviewComponent implements OnInit {

  @Input() public goal: Goal;

  constructor() { }

  ngOnInit(): void {
  }

}
