import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GoalService } from 'src/app/provider/goal.service';
import { Goal } from '../../interfaces/item';


@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

export class ToDoListComponent {

  public goals$: Observable<Goal[]>;
  public currentView: 'initialGoal' | 'goalExplanation' | 'goalEditor' | 'none';


  constructor(
    private goalService: GoalService
  ) {
    this.goals$ = this.initializeGoals();
  }

  public toggleView(view: 'initialGoal' | 'goalExplanation' | 'goalEditor' | 'none') {
    this.currentView = view;
  }

  private initializeGoals(): Observable<Goal[]> {
    return this.goalService.listenToGoals()
      .pipe(
        tap(goals => this.toggleDefaultView(goals))
      );
  }

  private toggleDefaultView(goals: Goal[]): void {
    goals.length ? this.toggleView('goalEditor') : this.toggleView('initialGoal');
  }
}


