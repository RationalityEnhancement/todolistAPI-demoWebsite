import { Component, ViewEncapsulation, Output, EventEmitter, Input, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { outputItem, Goal } from './interfaces/item';
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
      this.setGoals(goals);
    }
  }

  @Output() public optimizedGoalsEvent = new EventEmitter<outputItem[]>();

  private destroy$ = new BehaviorSubject<boolean>(false);

  constructor(private itemService: ItemService) { }

  public ngOnInit(): void {
    this.publishOptimizedGoals();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();

  }

  private setGoals(goals: string): void {
    try {
      const parsedGoals: Goal[] = JSON.parse(goals);

      this.itemService.setGoals(parsedGoals);
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

  private dispatchOptimizedGoals(goals: outputItem[]): void {
    this.optimizedGoalsEvent.emit(goals);
  }
}
