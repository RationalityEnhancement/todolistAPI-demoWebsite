import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from 'src/app/interfaces/Configuration';
import { CompliceGoal } from 'src/app/interfaces/Complice-Goal';
import { Goal, Item } from 'src/app/interfaces/item';
import { AdapterService } from 'src/app/provider/adapter.service';
import { ConfigService } from 'src/app/provider/config.service';
import { GoalService } from 'src/app/provider/goal.service';
import { TodoListService } from 'src/app/provider/todo-list.service';

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

  @Input() public set regConfiguration(configuration: string) {
    if (!!configuration) {
      this.initializeConfiguration(configuration);
    }
  }

  @Output() public selectedTasksEvent = new EventEmitter<Item[]>()
  @Output() public createdOptimalTodoListEvent = new EventEmitter<Item[]>()

  public goals$: Observable<Goal[]>;
  public popupDisplayed: boolean;
  public requestingTodoList: boolean

  constructor(
    private adapterService: AdapterService,
    private todoListService: TodoListService,
    private goalService: GoalService,
    private configService: ConfigService
  ) {
    this.goals$ = this.goalService.listenToGoals();
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

  public createOptimalTodoList() {
    this.requestingTodoList = true;
    this.todoListService.requestOptimalTodoList()
      .subscribe(todoList => {
        this.createOptimalTodoListSuccess(todoList);
      }, error => {
        this.createOptimalTodoListError(error);
      });
  }

  private initializeGoals(goals: string): void {
    try {
      const compliceGoals = this.adapterService.parseEntities<CompliceGoal>(goals);
      const regGoals = this.adapterService.toRegGoals(compliceGoals);

      this.goalService.setGoals(regGoals);
    } catch (e) {
      this.handleError();
    }
  }

  private initializeConfiguration(config: string): void {
    try {
      const configuration = this.adapterService.parseEntity<Configuration>(config);

      this.configService.setConfiguration(configuration);
    } catch (e) {
      this.handleError();
    }
  }

  private handleError() {
    console.warn('invalid goals: Please check again input string');
  }

  private createOptimalTodoListSuccess(todolist: any) {
    this.createdOptimalTodoListEvent.emit(todolist);
    this.closePopup();
    this.requestingTodoList = false;
  }

  private createOptimalTodoListError(error: any) {
    this.requestingTodoList = false;
    alert(error?.error || 'An unexpected error occured. If you continue to encounter this issue, please contact us at reg.experiments@tuebingen.mpg.de.');
  }
}
