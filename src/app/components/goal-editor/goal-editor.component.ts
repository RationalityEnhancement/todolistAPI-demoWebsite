import { Component, Input, OnInit } from '@angular/core';
import { faCheck, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { timer } from 'rxjs';
import { Goal, Item } from 'src/app/interfaces/item';
import { GoalService } from 'src/app/provider/goal.service';
import { ImageUrlService } from 'src/app/provider/image-url.service';
import { TodoListService } from 'src/app/provider/todo-list.service';

@Component({
  selector: 'goal-editor',
  templateUrl: './goal-editor.component.html',
  styleUrls: ['./goal-editor.component.scss']
})
export class GoalEditorComponent implements OnInit {

  @Input() public goals: Goal[] = [];

  public selectedGoal: Goal;
  public selectedTask: Item;

  public currentGoalForm: 'addGoal' | 'addTask' | 'editTask' | 'editGoal' | 'none';
  public currentView: 'initialGoal' | 'goalExplanation' | 'goalEditor' | 'none';

  public completeIcon = faCheck;
  public deleteIcon = faTrashAlt;
  public editIcon = faEdit;


  public imageUrls: Record<string, string>;

  public get validTodoList(): boolean {
    return this.validateTodolistData();
  }

  private images = ['edit_icon.png'];
  private newTaskAdded: boolean;

  constructor(
    private imageUrlService: ImageUrlService,
    private goalService: GoalService,
    private todoListService: TodoListService
  ) {
    this.imageUrls = this.imageUrlService.createImageUrls(this.images);
  }

  public ngOnInit(): void {
    this.newTaskAdded = this.getTaskAddedStatus();

    timer(1000)
      .subscribe(() => this.checkOverdueGoals());
  }

  public createTodoList() {
    this.todoListService.requestOptimalTodoList()
      .subscribe((optimizedTodoList) => {
        this.todoListService.setoptimizedTodoList(optimizedTodoList);
      }, error => {
        alert(error?.error || 'An unexpected error occured. If you continue to encounter this issue, please contact us at reg.experiments@tuebingen.mpg.de.');
      });
  }

  public toggleForm(formType: 'addGoal' | 'addTask' | 'editTask' | 'editGoal' | 'none') {
    this.currentGoalForm = formType;
  }

  public closeForm() {
    this.toggleForm('none');
  }

  public openGoalForm() {
    this.toggleForm('addGoal');
  }

  public openAddTaskForm(goal: Goal) {
    this.selectedGoal = goal;
    this.toggleForm('addTask');
  }

  public openEditTaskForm(goal: Goal, task: Item) {
    this.selectedGoal = goal;
    this.selectedTask = task;
    this.toggleForm('editTask');
  }

  public openEditGoalForm(goal) {
    this.selectedGoal = goal;
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
      .subscribe();
  }

  public deleteTask(task: Item, goal: Goal) {
    this.goalService.deleteTask(task, goal)
      .subscribe(() => this.closeForm());
  }

  public getDisplayedTasks(tasks: Item[]) {
    return tasks.filter(task => !task.workflowyId?.includes('everything-else'));
  }

  private validateTodolistData(): boolean {
    if (this.goals
      .map(goal => this.getDisplayedTasks(goal.tasks))
      .some(tasks => tasks?.length < 3)
    ) {
      return false;
    }

    if (this.goals.length < 3) {
      return false;
    }

    if (!this.newTaskAdded) {
      return false;
    }

    return true;
  }

  private getTaskAddedStatus(): boolean {
    return this.goals
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
