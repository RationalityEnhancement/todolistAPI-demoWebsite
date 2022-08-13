import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Item } from 'src/app/interfaces/item';

@Component({
  selector: 'task-select-preview',
  templateUrl: './task-select-preview.component.html',
  styleUrls: ['./task-select-preview.component.scss']
})
export class TaskSelectPreviewComponent implements OnInit {

  @Input() public task: Item;
  @Input() public selected: boolean;

  public selectIcon = faPlus;

  constructor() { }

  ngOnInit(): void {
  }
}
