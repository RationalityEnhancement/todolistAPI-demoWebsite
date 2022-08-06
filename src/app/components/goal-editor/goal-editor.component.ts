import { Component, Input, OnInit } from '@angular/core';
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

  public currentInformationPopup: 'goalExample' | 'information' | 'finishGoals' | 'legend' | 'none';
  public currentGoalForm: 'goal' | 'task' | 'editGoal' | 'none';
  public currentView: 'initialGoal' | 'goalExplanation' | 'goalEditor' | 'none';

  public imageUrls: Record<string, string>;

  public get validTodoList(): boolean {
    return this.validateTodolistData();
  }

  private images = ['information.png', 'edit_icon.png'];
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

  public openGoalForm() {
    this.toggleForm('goal');
  }

  public openTaskForm(goal?) {
    this.selectedGoal = goal;
    this.toggleForm('task');
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

  public deleteGoal(goal) {
    if (confirm('Do you really want to delete this goal?')) {
      this.goalService.deleteGoal(goal)
        .subscribe();
    }
  }

  public addTask(task: Item, goal: Goal) {
    this.goalService.addTask(task, goal)
      .subscribe();
  }

  public deleteTask(goal, task) {
    this.goalService.deleteTask(task, goal)
      .subscribe();
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
