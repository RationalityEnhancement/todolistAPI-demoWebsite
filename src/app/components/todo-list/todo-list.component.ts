import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ConfigService } from 'src/app/provider/config.service';
import { GoalService } from 'src/app/provider/goal.service';
import { Goal } from '../../interfaces/item';


@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

export class ToDoListComponent {

  public goals$: Observable<Goal[]>;
  public gamificationEnabled$: Observable<boolean>;

  public currentView: 'initialGoal' | 'furtherGoals' | 'goalEditor' | 'none';


  constructor(
    private goalService: GoalService,
    private configService: ConfigService
  ) {
    this.goals$ = this.initializeGoals();
    this.gamificationEnabled$ = this.initializeGamification();
  }

  public toggleView(view: 'initialGoal' | 'furtherGoals' | 'goalEditor' | 'none') {
    this.currentView = view;
  }

  private initializeGoals(): Observable<Goal[]> {
    return this.goalService.listenToGoals()
      .pipe(
        tap(goals => this.toggleDefaultView(goals))
      );
  }

  private initializeGamification(): Observable<boolean> {
    return this.configService.getConfiguration()
      .pipe(
        map(configuration => configuration.gamificationEnabled)
      );
  }

  private toggleDefaultView(goals: Goal[]): void {
    if (this.currentView === 'furtherGoals') {
      return;
    }

    goals.length ? this.toggleView('goalEditor') : this.toggleView('initialGoal');
  }
}


