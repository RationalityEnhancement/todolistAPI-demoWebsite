import { Component, ViewEncapsulation, Output, EventEmitter, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CompliceGoal } from './interfaces/Complice-Goal';
import { outputItem, Goal } from './interfaces/item';
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
  @Output() public goalsEvent = new EventEmitter<Goal[]>();

  private destroy$ = new Subject<boolean>();

  constructor(
    private itemService: ItemService,
    private adapterService: AdapterService
    ) { }

  public ngOnInit(): void {
    this.publishGoals();
    this.publishOptimizedGoals();
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

  private publishOptimizedGoals(): void {
    this.itemService.listenToOptimizedGoals()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(optimizedGoals => {
        this.dispatchOptimizedGoals(optimizedGoals);
      });
  }

  private publishGoals(): void {
    this.itemService.listenToGoals()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(goals => {
      this.dispatchGoals(goals);
    })
  }

  private dispatchOptimizedGoals(goals: outputItem[]): void {
    this.optimizedGoalsEvent.emit(goals);
  }

  private dispatchGoals(goals: Goal[]): void {
    this.goalsEvent.emit(goals);
  }
}
