import { Component, ViewEncapsulation, Output, EventEmitter, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Configuration } from './interfaces/Configuration';
import { CompliceGoal, NewCompliceGoal, RelevantCompliceGoalAttributes } from './interfaces/Complice-Goal';
import { OptimizedTodo } from './interfaces/item';
import { AdapterService } from './provider/adapter.service';
import { ConfigService } from './provider/config.service';
import { GoalService } from './provider/goal.service';
import { TodoListService } from './provider/todo-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent implements OnInit, OnDestroy {

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

  @Output() public optimizedTodoListEvent = new EventEmitter<OptimizedTodo[]>();
  @Output() public goalsEvent = new EventEmitter<RelevantCompliceGoalAttributes[]>();

  @Output() public addedGoalEvent = new EventEmitter<NewCompliceGoal>();
  @Output() public deletedGoalEvent = new EventEmitter<RelevantCompliceGoalAttributes>();
  @Output() public completedGoalEvent = new EventEmitter<RelevantCompliceGoalAttributes>();
  @Output() public adjustedGoalEvent = new EventEmitter<RelevantCompliceGoalAttributes>();


  private destroy$ = new Subject<boolean>();

  constructor(
    private goalService: GoalService,
    private todoListService: TodoListService,
    private adapterService: AdapterService,
    private configService: ConfigService
  ) { }

  public ngOnInit(): void {
    this.publishEvents();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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

  private publishEvents(): void {
    this.publishGoals();
    this.publishoptimizedTodoList();

    this.publishAddedGoal();
    this.publishDeletedGoal();
    this.publishCompletedGoal();
    this.publishAdjustedGoal();
  }

  private publishoptimizedTodoList(): void {
    this.todoListService.listenTooptimizedTodoList()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((rawTodoList) => {
        this.dispatchoptimizedTodoList(rawTodoList);
      });
  }

  private publishGoals(): void {
    this.goalService.listenToGoals()
      .pipe(
        map(goals => this.adapterService.toCompliceGoals(goals)),
        takeUntil(this.destroy$)
      )
      .subscribe(compliceGoals => {
        this.dispatchGoals(compliceGoals);
      })
  }

  private publishAddedGoal(): void {
    this.goalService.listenToAddedGoal()
      .pipe(
        map(goal => this.adapterService.toNewCompliceGoal(goal)),
        takeUntil(this.destroy$)
      )
      .subscribe(compliceGoal => {
        this.dispatchAddedGoal(compliceGoal);
      })
  }

  private publishDeletedGoal(): void {
    this.goalService.listenToDeletedGoal()
      .pipe(
        map(goal => this.adapterService.toRelevantCompliceGoalAttributes(goal)),
        takeUntil(this.destroy$)
      )
      .subscribe(compliceGoal => {
        this.dispatchDeletedGoal(compliceGoal);
      });
  }

  private publishCompletedGoal(): void {
    this.goalService.listenToCompletedGoal()
    .pipe(
      map(goal => this.adapterService.toRelevantCompliceGoalAttributes(goal)),
      takeUntil(this.destroy$)
    )
    .subscribe(compliceGoal => {
      this.dispatchCompletedGoal(compliceGoal);
    })
  }

  private publishAdjustedGoal(): void {
    this.goalService.listenToAdjustedGoal()
      .pipe(
        map(goal => this.adapterService.toRelevantCompliceGoalAttributes(goal)),
        takeUntil(this.destroy$)
      )
      .subscribe(compliceGoal => {
        this.dispatchAdjustedGoal(compliceGoal);
      })
  }

  private dispatchoptimizedTodoList(todoList: OptimizedTodo[]): void {
    this.optimizedTodoListEvent.emit(todoList);
  }

  private dispatchGoals(goals: RelevantCompliceGoalAttributes[]): void {
    this.goalsEvent.emit(goals);
  }

  private dispatchAddedGoal(goal: NewCompliceGoal): void {
    this.addedGoalEvent.emit(goal);
  }

  private dispatchDeletedGoal(goal: RelevantCompliceGoalAttributes): void {
    this.deletedGoalEvent.emit(goal);
  }

  private dispatchCompletedGoal(goal: RelevantCompliceGoalAttributes): void {
    this.completedGoalEvent.emit(goal);
  }

  private dispatchAdjustedGoal(goal: RelevantCompliceGoalAttributes): void {
    this.adjustedGoalEvent.emit(goal);
  }
}
