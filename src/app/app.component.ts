import { Component, ViewEncapsulation, Output, EventEmitter, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CompliceGoal, NewCompliceGoal, RelevantCompliceGoalAttributes } from './interfaces/Complice-Goal';
import { outputItem } from './interfaces/item';
import { AdapterService } from './provider/adapter.service';
import { ItemService } from './provider/item.service';

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

  @Output() public optimizedGoalsEvent = new EventEmitter<outputItem[]>();
  @Output() public goalsEvent = new EventEmitter<RelevantCompliceGoalAttributes[]>();
  
  @Output() public addedGoalEvent = new EventEmitter<NewCompliceGoal>();
  @Output() public deletedGoalEvent = new EventEmitter<RelevantCompliceGoalAttributes>();
  @Output() public adjustedGoalEvent = new EventEmitter<RelevantCompliceGoalAttributes>();
  

  private destroy$ = new Subject<boolean>();

  constructor(
    private itemService: ItemService,
    private adapterService: AdapterService
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
      const compliceGoals = this.adapterService.parseGoals<CompliceGoal>(goals);
      const regGoals = this.adapterService.toRegGoals(compliceGoals);

      this.itemService.setGoals(regGoals);
    } catch (e) {
      this.handleError();
    }
  }

  private handleError() {
    console.warn('invalid goals: Please check again input string');
  }

  private publishEvents(): void {
    this.publishGoals();
    this.publishOptimizedGoals();

    this.publishAddedGoal();
    this.publishDeletedGoal();
    this.publishAdjustedGoal();
  }

  private publishOptimizedGoals(): void {
    this.itemService.listenToOptimizedGoals()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((optimizedGoals) => {
        this.dispatchOptimizedGoals(optimizedGoals);
      });
  }

  private publishGoals(): void {
    this.itemService.listenToGoals()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(goals => {
      const compliceGoals = goals.map(goal => 
        this.adapterService.toRelevantCompliceGoalAttributes(goal)
      );

      this.dispatchGoals(compliceGoals);
    })
  }

  private publishAddedGoal(): void {
    this.itemService.listenToAddedGoal()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(goal => {
      const compliceGoal = this.adapterService.toNewCompliceGoal(goal);
      this.dispatchAddedGoal(compliceGoal);
    })
  }

  private publishDeletedGoal(): void {
    this.itemService.listenToDeletedGoal()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(goal => {
      const compliceGoal = this.adapterService.toRelevantCompliceGoalAttributes(goal);
      this.dispatchDeletedGoal(compliceGoal);
    })
  }

  private publishAdjustedGoal(): void {
    this.itemService.listenToAdjustedGoal()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(goal => {
      const compliceGoal = this.adapterService.toRelevantCompliceGoalAttributes(goal);
      this.dispatchAdjustedGoal(compliceGoal);
    })
  }

  private dispatchOptimizedGoals(todoList: outputItem[]): void {
    this.optimizedGoalsEvent.emit(todoList);
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

  private dispatchAdjustedGoal(goal: RelevantCompliceGoalAttributes): void {
    this.adjustedGoalEvent.emit(goal);
  }
}
