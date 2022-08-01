import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GoalService } from 'src/app/provider/goal.service';
import { TodoListService } from 'src/app/provider/todo-list.service';
import { Goal, Item } from '../../interfaces/item';
import { ImageUrlService } from '../../provider/image-url.service';


@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

export class ToDoListComponent implements OnDestroy {

  public goals: Goal[] = [];
  public goal_opened: Goal;

  public currentInformationPopup: 'goalExample' | 'information' | 'finishGoals' | 'legend' | 'none';
  public currentGoalForm: 'goal' | 'task' | 'editGoal' | 'none';
  public currentView: 'initialGoal' | 'goalExplanation' | 'goalEditor' | 'none';
  
  public imageUrls: Record<string, string>;
  
  private images = ['information.png', 'edit_icon.png'];
  private newTaskAdded: boolean;

  private destroy$ = new Subject<boolean>();

  constructor(
    private imageUrlService: ImageUrlService,
    private goalService: GoalService,
    private todoListService: TodoListService
  ) {
    this.imageUrls = this.imageUrlService.createImageUrls(this.images);

    this.listenToGoalChanges();

    setTimeout(() => this.checkOverdueGoals(), 1000)
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public createTodoList() {
    if (!this.validateTodolistData()) {
      return;
    }

    this.todoListService.requestOptimalTodoList()
      .subscribe((optimizedTodoList) => {
        this.todoListService.setoptimizedTodoList(optimizedTodoList);
      }, error => {
        alert(error?.error || 'An unexpected error occured. If you continue to encounter this issue, please contact us at reg.experiments@tuebingen.mpg.de.');
      });
  }

  public toggleInformationPopup(popup) {
    if (this.currentInformationPopup === popup) {
      this.currentInformationPopup = 'none';
    } else {
      this.currentInformationPopup = popup;
    }
  }

  public toggleForm(formType: 'goal' | 'task' | 'editGoal' | 'none') {
    this.currentGoalForm = formType;
  }

  public closeForm() {
    this.toggleForm('none');
  }

  public toggleView(view: 'initialGoal' | 'goalExplanation' | 'goalEditor' | 'none') {
    this.currentView = view;
  }

  public toggleGoalExplanation(goalProperties: Goal) {
    this.goal_opened = { ...goalProperties, value: 100 };

    this.toggleView('goalExplanation');
  }

  public toggleGoalEditor() {
    this.addGoal(this.goal_opened);
    this.toggleView('goalEditor');
  }

  public openGoalForm() {
    this.toggleForm('goal');
  }

  public openTaskForm(goal?) {
    this.goal_opened = goal;
    this.toggleForm('task');
  }

  public openEditGoalForm(goal) {
    this.goal_opened = goal;
    this.toggleForm('editGoal');
  }

  public addGoal(goalProperties: Goal) {
    this.goalService.addGoal(goalProperties);
  }

  public editGoal(goalProperties: Goal) {
    this.goalService.editGoal(goalProperties);
  }

  public deleteGoal(goal) {
    if (confirm('Do you really want to delete this goal?')) {
      this.goalService.deleteGoal(goal);  
    }
  }

  public addTask(task: Item, goal: Goal) {
    this.goalService.addTask(task, goal);
  }

  public deleteTask(goal, task) {
    this.goalService.deleteTask(task, goal);
  }

  public getDisplayedTasks(tasks: Item[]) {
    return tasks.filter(task => !task.workflowyId?.includes('everything-else'));
  }

  private validateTodolistData(): boolean {
    if (this.goals
      .map(goal => this.getDisplayedTasks(goal.tasks))
      .some(tasks => tasks?.length < 3)
    ) {
      alert("Please add at least 3 tasks for each goal!");
      return false;
    }

    if (this.goals.length < 3) {
      alert("Please add at least three goals!");
      return false;
    }

    if (!this.newTaskAdded) {
      alert('All your tasks are scheduled already. Please add new tasks before you create a new to-do list!')
      return false;
    }

    return true;
  }

  private listenToGoalChanges(): void {
    this.goalService.listenToGoals()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(goals => {
        this.goals = goals;

        this.goals.length ? this.toggleView('goalEditor') : this.toggleView('initialGoal');

        this.newTaskAdded = this.getTaskAddedStatus(goals);
      });
  }

  private getTaskAddedStatus(goals: Goal[]): boolean {
    return goals
      .reduce((allTasks, goal) => allTasks.concat(goal.tasks), [] as Item[])
      .some(task => !(task.scheduled || task.completed));
  }

  private checkOverdueGoals() {
    this.goals.forEach(goal => {
      if (this.deadlineInPast(goal.deadline)) {
        alert(`Your goal ${goal.name} is overdue! Please think about a new deadline and adjust it properly.`);
      }
    })
  }

  private deadlineInPast(deadline: string): boolean {
    const deadlineDate = new Date(deadline);
    const todayDate = new Date(new Date().toISOString().substring(0, 10));

    return deadlineDate < todayDate;
  }
}


