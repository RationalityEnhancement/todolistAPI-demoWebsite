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

  public goal_val: number;
  public goal_desc: string;
  public goal_deadline: string;
  public goal_time_est: number;

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

  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public route() {

    if (this.goals.some(goal => goal.tasks?.length < 3)) {
      alert("Please add at least 3 tasks for each goal!");
      return;
    }

    if (this.goals.length < 3) {
      alert("Please add at least three goals!");
      return;
    }

    if (!this.newTaskAdded) {
      alert('All your tasks are scheduled already. Please add new tasks before you create a new to-do list!')
      return;
    }

    this.todoListService.requestOptimalTodoList()
      .subscribe((optimizedTodoList) => {
        this.todoListService.setoptimizedTodoList(optimizedTodoList);
      });
  }

  toggleForm(formType: 'goal' | 'task' | 'editGoal' | 'none') {
    this.currentGoalForm = formType;
  }

  toggleView(view: 'initialGoal' | 'goalExplanation' | 'goalEditor' | 'none') {
    this.currentView = view;
  }

  toggleGoalExplanation() {
    if (!this.validateForm_goal()) {
      return;
    }
    this.toggleView('goalExplanation');
  }

  toggleGoalEditor() {
    this.addGoal();
    this.toggleView('goalEditor');
  }

  closeForm() {
    this.toggleForm('none');
  }

  openGoal() {
    this.resetGoalForm();
    this.toggleForm('goal');
  }

  openTask(e?, goal?) {
    this.goal_opened = goal;

    this.toggleForm('task');
  }

  editGoal(event, goal) {
    this.goal_opened = goal;

    this.resetGoalForm();
    this.hydrateFormWithSelectedGoal()

    this.toggleForm('editGoal');
  }

  addGoal(event?) {
    if (!this.validateForm_goal()) {
      return
    };

    const newGoal: Goal = {
      code: `${this.goals.length + 1}`,
      color: this.getColor(),
      name: this.goal_desc,
      time_est: this.goal_time_est,
      deadline: this.goal_deadline,
      value: this.goal_val,
      tasks: []
    };

    const everythingElseTask: Item = {
      name: 'All tasks that are not clearly specified, but necesssary for your goal. It might be a good idea to divide this goal into smaller, more actionable tasks.',
      time_est: newGoal.time_est,
      deadline: newGoal.deadline,
      workflowyId: `g${newGoal.code}-everything-else-${Date.now()}`
    };

    newGoal.tasks.push(everythingElseTask);

    if (this.goal_desc != undefined) {
      this.goals = this.goals.concat(newGoal);

      this.goal_opened = newGoal;

      this.setGoals(this.goals);

      this.goalService.setAddedGoal(newGoal);
    }
  }

  deleteGoal(event, goal) {
    const index = this.goals.indexOf(goal);
    if (index > -1) {
      this.goals.splice(index, 1);
    }

    this.renumberGoals();
    this.setGoals(this.goals);

    this.goalService.setDeletedGoal(goal);
  }

  updateGoal(event) {
    if (!this.validateForm_goal()) {
      return
    };

    this.goal_opened.name = this.goal_desc;
    this.goal_opened.time_est = this.goal_time_est;
    this.goal_opened.value = this.goal_val;
    this.goal_opened.deadline = this.goal_deadline;

    this.adjustGoal(this.goal_opened);

    this.hydrateFormWithSelectedGoal();
  }

  addItem(event, selectedGoal: Goal) {
    const task: Item = {
      name: this.task_desc,
      time_est: this.task_time_est,
      deadline: this.task_deadline,
      workflowyId: `g${selectedGoal.code}-t${selectedGoal.tasks.length + 1}-${Date.now()}`
    };

    if (this.task_desc != undefined) {
      selectedGoal.tasks.push(task);
    }

    this.adjustGoal(selectedGoal);
    this.resetTaskForm();
  }

  deleteItem(event, goal, item) {
    const index = goal.tasks.indexOf(item);
    if (index > -1) {
      goal.tasks.splice(index, 1);
      goal.num_children -= 1;
    }

    this.adjustGoal(goal);
  }


  validateForm_goal(): boolean {

    if (this.goal_desc == undefined && this.goal_time_est == undefined && this.goal_val == undefined) {
      alert("please fill the form!")
    } else {
      if (!this.goal_desc || this.goal_desc == "") {
        alert("Description must be filled out");
        return false;
      }
      if (this.goal_val == null) {
        alert("Goal value must be filled out");
        return false;
      }
      if (this.goal_val < 1 || this.goal_val > 100) {
        alert("Please enter a percentage between 1 and 100 percent")
        return false;
      }
      if (this.goal_time_est == null) {
        alert("Time estimation must be filled out");
        return false;
      }
      if (this.goal_time_est < 0) {
        alert("Plese enter a valid estimate for your goal!");
        return false;
      }

      const deadlineValidator = (deadline: string) => new Date(deadline) < new Date();

      if (deadlineValidator(this.goal_deadline)) {
        alert("Please enter a deadline that is not in the past");
        return false;
      }

      return true;
    }
  }

  validateForm_task() {
    if (this.task_desc == undefined && this.task_time_est == undefined) {
      alert("please fill the form!")
    } else {
      if (this.task_desc == "") {
        alert("Description must be filled out");
        return false;
      }

      if (this.task_time_est == null) {
        alert("Time estimation must be filled out");
        return false;
      }
      //pass validator and add item
      this.addItem(event, this.goal_opened);
    }
  }

  public toggleInformationPopup(popup) {

    if (this.currentInformationPopup === popup) {
      this.currentInformationPopup = 'none';
    } else {
      this.currentInformationPopup = popup;
    }
  }

  public getDisplayedTasks(tasks: Item[]) {
    return tasks.filter(task => !task.workflowyId?.includes('everything-else'));
  }

  private listenToGoalChanges(): void {
    this.goalService.listenToGoals()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(goals => {
        this.goals = goals;

        this.goals.length ? this.toggleView('goalEditor') : this.toggleView('initialGoal');

        this.setDefaultGoalParameters();

        this.newTaskAdded = this.getTaskAddedStatus(goals);
      });
  }

  private setDefaultGoalValue() {
    this.goals.length ? this.goal_val = null : this.goal_val = 100;
  }

  private setDefaultGoalDeadline() {
    const dateInTwoWeeks = new Date(Date.now() + 12096e5);
    const defaultDeadline = dateInTwoWeeks.toISOString().substring(0, 10);

    this.goal_deadline = defaultDeadline;
  }

  private setDefaultGoalParameters() {
    this.setDefaultGoalValue();
    this.setDefaultGoalDeadline();
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
      .map(goal =>goal.code === selectedGoal.code ? selectedGoal : goal);

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
    }

    return task;
  }

  private getTotalEstimateOfRelevantTasks(goal: Goal) {
    return goal.tasks
      .filter(task => !task.workflowyId?.includes('everything-else'))
      .reduce((estimate, task) => estimate + task.time_est, 0);
  } 

  private resetGoalForm(): void {
    this.goal_desc = undefined;
    this.goal_val = undefined;
    this.goal_time_est = undefined;

    this.setDefaultGoalDeadline();
  }

  private hydrateFormWithSelectedGoal(): void {
    this.goal_desc = this.goal_opened?.name;
    this.goal_time_est = this.goal_opened?.time_est;
    this.goal_val = this.goal_opened?.value;
    this.goal_deadline = this.goal_opened?.deadline;
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


