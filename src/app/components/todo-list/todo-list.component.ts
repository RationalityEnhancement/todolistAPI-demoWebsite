import { Component, Inject, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColorConfig, COLOR_CONFIG } from 'src/app/constants/colors';
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

  public task_desc: string;
  public task_deadline: string;
  public task_time_est: number;
  public task_today: string;
  public goal_opened = <Goal>({
    name: "DEFAULT",
  });

  public goals: Goal[] = [];
  public todayTasks: Item[] = [];
  public completedTasks: Item[] = [];

  public newTaskAdded: boolean;

  public currentInformationPopup: 'goalExample' | 'information' | 'finishGoals' | 'legend' | 'none';
  public currentGoalForm: 'goal' | 'task' | 'editGoal' | 'none';
  public currentView: 'initialGoal' | 'goalExplanation' | 'goalEditor' | 'none';

  public imageUrls: Record<string, string>;

  private images = ['information.png', 'edit_icon.png'];

  private destroy$ = new Subject<boolean>();

  constructor(
    @Inject(COLOR_CONFIG)
    private colors: ColorConfig,
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

  toggleForm(formType: 'goal' | 'task' | 'editGoal' | 'none') {
    this.currentGoalForm = formType;
  }

  closeForm() {
    this.toggleForm('none');
  }

  toggleView(view: 'initialGoal' | 'goalExplanation' | 'goalEditor' | 'none') {
    this.currentView = view;
  }

  toggleGoalExplanation(goalProperties: Goal) {
    this.goal_opened = { ...goalProperties, value: 100 };

    this.toggleView('goalExplanation');
  }

  toggleGoalEditor() {
    this.addGoal(this.goal_opened);
    this.toggleView('goalEditor');
  }

  openGoal() {
    this.toggleForm('goal');
  }

  openTask(e?, goal?) {
    this.goal_opened = goal;
    this.toggleForm('task');
  }

  editGoal(event, goal) {
    this.goal_opened = goal;
    this.toggleForm('editGoal');
  }

  addGoal(goalProperties: Goal) {
    const newGoal: Goal = {
      ...goalProperties,
      code: `${this.goals.length + 1}`,
      color: this.getColor(),
      tasks: []
    };

    const everythingElseTask: Item = {
      name: 'All tasks that are not clearly specified, but necesssary for your goal. It might be a good idea to divide this goal into smaller, more actionable tasks.',
      time_est: newGoal.time_est,
      deadline: newGoal.deadline,
      workflowyId: `g${newGoal.code}-everything-else-${Date.now()}`
    };

    newGoal.tasks.push(everythingElseTask);

    this.goals = this.goals.concat(newGoal);
    
    this.setGoals(this.goals);
    this.goalService.setAddedGoal(newGoal);
  }

  deleteGoal(event, goal) {
    if (confirm('Do you really want to delete this goal?')) {
      const index = this.goals.indexOf(goal);
      if (index > -1) {
        this.goals.splice(index, 1);
      }
  
      this.renumberGoals();
      this.setGoals(this.goals);
  
      this.goalService.setDeletedGoal(goal);
    }
  }

  addTask(task: Item, goal: Goal) {
    const newTask: Item = {
      ...task,
      workflowyId: `g${goal.code}-t${goal.tasks.length + 1}-${Date.now()}`
    };

    goal.tasks.push(newTask);
    this.adjustGoal(goal);
  }

  deleteItem(event, goal, item) {
    const index = goal.tasks.indexOf(item);
    if (index > -1) {
      goal.tasks.splice(index, 1);
      goal.num_children -= 1;
    }

    this.adjustGoal(goal);
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

  private deadlineInPast(deadline: string): boolean {
    const deadlineDate = new Date(deadline);
    const todayDate = new Date(new Date().toISOString().substring(0, 10));

    return deadlineDate < todayDate;
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

  private checkOverdueGoals() {
    this.goals.forEach(goal => {
      if (this.deadlineInPast(goal.deadline)) {
        alert(`Your goal ${goal.name} is overdue! Please think about a new deadline and adjust it properly.`);
      }
    })
  }

  private getTaskAddedStatus(goals: Goal[]): boolean {
    return goals
      .reduce((allTasks, goal) => allTasks.concat(goal.tasks), [] as Item[])
      .some(task => !(task.scheduled || task.completed));
  }

  private setGoals(goals: Goal[]): void {
    this.goalService.setGoals(goals);
  }

  private renumberGoals(): void {
    const renumberedGoals = this.goals.map((goal, index) => ({
      ...goal,
      code: `${index + 1}`
    }));

    this.goals = renumberedGoals;
  }

  private adjustGoal(selectedGoal: Goal): void {
    selectedGoal = this.getGoalWithUpdatedTasks(selectedGoal);

    const adjustedGoals = this.goals
      .map(goal => goal.code === selectedGoal.code ? selectedGoal : goal);

    this.goalService.setAdjustedGoal(selectedGoal);
    this.setGoals(adjustedGoals);
  }

  private getGoalWithUpdatedTasks(goal: Goal): Goal {
    const tasksWithUpdatedEverythingElseTask = this.getTasksWithUpdatedEverythingElseTask(goal);

    goal.tasks = tasksWithUpdatedEverythingElseTask;

    return goal;
  }

  private getTasksWithUpdatedEverythingElseTask(goal: Goal): Item[] {
    return goal.tasks.map(task => {
      if (task.workflowyId?.includes('everything-else')) {
        task = this.getUpdatedEverythingElseTask(task, goal);
      }
      return task;
    });
  }

  private getUpdatedEverythingElseTask(task: Item, goal: Goal): Item {
    const goalEstimate = goal.time_est;
    const totalTaskEstimate = this.getTotalEstimateOfRelevantTasks(goal);

    if (goalEstimate > totalTaskEstimate) {
      task.time_est = goalEstimate - totalTaskEstimate;
      task.deadline = goal.deadline;
      task.completed = false;
    } else {
      task.completed = true;
    }

    return task;
  }

  private getTotalEstimateOfRelevantTasks(goal: Goal) {
    return goal.tasks
      .filter(task => !task.workflowyId?.includes('everything-else'))
      .reduce((estimate, task) => estimate + task.time_est, 0);
  }

  private resetTaskForm(): void {
    this.task_desc = undefined;
    this.task_today = undefined;
    this.task_deadline = undefined;
    this.task_time_est = undefined;
  }

  private getColor(): string {
    const alreadyUsedColors = this.goals.map(goal => goal.color);
    const availableColors = this.colors.filter(color => !alreadyUsedColors.includes(color));

    const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)] || '#8e44ad';

    return randomColor;
  }
}


