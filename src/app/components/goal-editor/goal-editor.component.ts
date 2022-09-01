import { Component, Input, OnInit } from '@angular/core';
import { faCheck, faCircleNotch, faInfoCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Goal, Item } from 'src/app/interfaces/item';
import { GoalService } from 'src/app/provider/goal.service';
import { TodoListService } from 'src/app/provider/todo-list.service';

@Component({
  selector: 'goal-editor',
  templateUrl: './goal-editor.component.html',
  styleUrls: ['./goal-editor.component.scss']
})
export class GoalEditorComponent implements OnInit {

  @Input() public goals: Goal[] = [];
  @Input() public gamificationEnabled: boolean;

  public currentGoalForm: 'addGoal' | 'addTask' | 'editTask' | 'editGoal' | 'none';
  public currentView: 'initialGoal' | 'goalExplanation' | 'goalEditor' | 'none';
  public currentInstructionsPopup: 'goals' | 'tasks' | 'todolist' | 'none';

  public completeIcon = faCheck;
  public deleteIcon = faTrashAlt;
  public infoIcon = faInfoCircle;
  public loadingIcon = faCircleNotch;

  public loading: boolean;

  public get selectedGoal(): Goal {
    return this.goals
      .find(goal => goal.code === this.selectedGoalCode);
  }

  public get selectedTask(): Item {
    return this.selectedGoal?.tasks
      .find(task => task.workflowyId === this.selectedTaskId);
  }

  public get validTodoList(): boolean {
    return this.validateTodolistData();
  }

  public get overdueGoals(): boolean {
    return this.goals.some(goal => this.deadlineInPast(goal.deadline));
  }

  public get noOpenTasks(): boolean {
    return this.goals
      .reduce((allTasks, goal) => allTasks.concat(this.getDisplayedTasks(goal.tasks)), [] as Item[])
      .every(task => task.scheduled || task.completed);
  }

  private selectedGoalCode: string;
  private selectedTaskId: string;

  constructor(
    private goalService: GoalService,
    private todoListService: TodoListService
  ) {
  }

  public ngOnInit(): void { }

  public createTodoList() {
    this.loading = true;

    this.todoListService.requestOptimalTodoList()
      .subscribe((optimizedTodoList) => {
        this.requestOptimalTodoListSuccess(optimizedTodoList);
      }, error => {
        this.requestOptimalTodoListError(error);
      });
  }

  public toggleForm(formType: 'addGoal' | 'addTask' | 'editTask' | 'editGoal' | 'none') {
    this.currentGoalForm = formType;
  }

  public togglePopup(popupType: 'goals' | 'tasks' | 'todolist' | 'none') {
    this.currentInstructionsPopup = popupType;
  }

  public closeForm() {
    this.toggleForm('none');
  }

  public openGoalForm() {
    this.toggleForm('addGoal');
  }

  public openAddTaskForm(goal: Goal) {
    this.selectGoal(goal);

    this.toggleForm('addTask');
  }

  public openEditTaskForm(goal: Goal, task: Item) {
    if (task.completed || task.scheduled) {
      return;
    }

    this.selectGoal(goal);
    this.selectTask(task);

    this.toggleForm('editTask');
  }

  public openEditGoalForm(goal) {
    this.selectGoal(goal);

    this.toggleForm('editGoal');
  }

  public addGoal(goalProperties: Goal) {
    this.goalService.addGoal(goalProperties)
      .subscribe();
  }

  public editGoal(goalProperties: Goal) {
    this.goalService.editGoal(goalProperties)
      .subscribe();
  }

  public completeGoal(goal) {
    if (confirm('Do you really want to complete this goal? Once completed, you can not work on it anymore. However, you can still see your progress towards it on the "Timeline" page')) {
      this.goalService.completeGoal(goal)
        .subscribe(() => this.closeForm());
    }
  }

  public deleteGoal(goal) {
    if (confirm('Do you really want to delete this goal?')) {
      this.goalService.deleteGoal(goal)
        .subscribe(() => this.closeForm());
    }
  }

  public addTask(task: Item, goal: Goal) {
    this.goalService.addTask(task, goal)
      .subscribe();
  }

  public editTask(task: Item, goal: Goal) {
    this.goalService.editTask(task, goal)
      .subscribe(() => this.closeForm());
  }

  public deleteTask(task: Item, goal: Goal) {
    this.goalService.deleteTask(task, goal)
      .subscribe(() => this.closeForm());
  }

  public getDisplayedTasks(tasks: Item[]) {
    return tasks.filter(task => !task.workflowyId?.includes('everything-else'));
  }

  private selectGoal(goal: Goal) {
    this.selectedGoalCode = goal.code;
  }

  private selectTask(task: Item) {
    this.selectedTaskId = task.workflowyId;
  }

  private validateTodolistData(): boolean {
    if (this.goals.length < 3) {
      return false;
    }

    if (this.goals
      .map(goal => this.getDisplayedTasks(goal.tasks))
      .some(tasks => tasks?.length < 3)
    ) {
      return false;
    }

    if (this.noOpenTasks) {
      return false;
    }

    if (this.overdueGoals) {
      return false;
    }

    return true;
  }

  private requestOptimalTodoListSuccess(todoList) {
    this.todoListService.setoptimizedTodoList(todoList);
    this.loading = false;
  }

  private requestOptimalTodoListError(error: any) {
    this.loading = false;
    alert(error?.error || 'An unexpected error occured. If you continue to encounter this issue, please contact us at reg.experiments@tuebingen.mpg.de.');
  }

  private deadlineInPast(deadline: string): boolean {
    const deadlineDate = new Date(deadline);
    const todayDate = new Date(new Date().toISOString().substring(0, 10));

    return deadlineDate < todayDate;
  }

}
