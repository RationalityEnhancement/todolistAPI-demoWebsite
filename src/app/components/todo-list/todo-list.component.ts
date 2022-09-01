import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Configuration } from 'src/app/interfaces/Configuration';
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
  public configuration$: Observable<Configuration>;
  
  public currentView: 'initialGoal' | 'furtherGoals' | 'goalEditor' | 'none';


  constructor(
    private goalService: GoalService,
    private configService: ConfigService
  ) {
    this.goals$ = this.initializeGoals();
    this.configuration$ = this.configService.getConfiguration();
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

  private toggleDefaultView(goals: Goal[]): void {
    if (this.currentView === 'furtherGoals') {
      return;
    }
    
    goals.length ? this.toggleView('goalEditor') : this.toggleView('initialGoal');
  }
}


