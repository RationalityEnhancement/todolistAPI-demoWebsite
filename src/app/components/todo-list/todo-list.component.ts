import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ItemService } from 'src/app/provider/item.service';
import { Goal, Item } from '../../interfaces/item';
import { ImageUrlService } from '../../provider/image-url.service';


@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

export class ToDoListComponent implements OnDestroy {

  @Output() public removedGoalEvent = new EventEmitter<string>();

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

  // public goals = Globals.goalList

  public goals: Goal[];
  public currentInformationPopup: 'goalExample' | 'information' | 'finishGoals' | 'legend' | 'none';
  public currentGoalForm: 'goal' | 'task' | 'editGoal' | 'none';
  public imageUrls: Record<string, string>;

  private images = ['information.png', 'edit_icon.png'];

  private destroy$ = new Subject<boolean>();

  constructor(
    private imageUrlService: ImageUrlService,
    private itemService: ItemService
  ) {
    this.listenToGoalChanges();

    this.imageUrls = this.imageUrlService.createImageUrls(this.images);
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public route() {
    var children_num_validator = true;
    var goals_num_validator = false

    for (let i = 0; i < this.goals.length; i++) {

      if (this.goals[i].num_children == undefined || this.goals[i].num_children < 2) {
        children_num_validator = false;
        alert("Please add at least 2 subgoals for each goal");
        return false;
      }
    }

    if (this.goals.length >= 5) {
      goals_num_validator = true;
    } else {
      alert("Please add at least 5 goals");
      return false;
    }

    if (goals_num_validator && children_num_validator) {
      this.itemService.requestOptimalTodoList().subscribe(goals => {
        this.itemService.setOptimizedGoals(goals);
      })
    } else {
      alert("Please fulfill the requirements before you continue!");
      return false;
    }

  }

  toggleForm(formType) {
    this.currentGoalForm = formType;
  }

  closeForm() {
    this.toggleForm('none');
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

  addGoal(event?) {
    const newGoal: Goal = {
      name: this.goal_desc,
      time_est: this.goal_time_est,
      deadline: this.goal_deadline,
      value: this.goal_val
    };

    if (this.goal_desc != undefined) {
      this.goals = this.goals.concat(newGoal);
      this.goal_opened = newGoal;

      this.renumberGoals();
      this.setGoals(this.goals);
    }

    this.resetGoalForm();
  }

  deleteGoal(event, goal) {
    const index = this.goals.indexOf(goal);
    if (index > -1) {
      this.goals.splice(index, 1);
    }

    this.renumberGoals();
    this.setGoals(this.goals);

    this.removedGoalEvent.emit(goal.id)
  }

  updateGoal(event) {

    if (this.goal_desc == undefined || this.goal_desc == "") {
      this.goal_desc = this.goal_opened.name;
    }
    if (this.goal_time_est == null) {
      this.goal_time_est = this.goal_opened.time_est;
    }
    if (this.goal_val == null) {
      this.goal_val = this.goal_opened.value;
    }
    if (this.goal_deadline == undefined || this.goal_deadline == "") {
      this.goal_deadline = this.goal_opened.deadline;
    }

    this.goal_opened.name = this.goal_desc;
    this.goal_opened.time_est = this.goal_time_est;
    this.goal_opened.value = this.goal_val;
    this.goal_opened.deadline = this.goal_deadline;

    this.adjustGoal(this.goal_opened);
    this.resetGoalForm();
  }

  addItem(event, selectedGoal) {
    const item: Item = {
      name: this.task_desc,
      time_est: this.task_time_est,
      deadline: this.task_deadline,
      today: this.task_today == "Not Today" ? false : true,
    };

    if (this.task_desc != undefined) {

      if ('num_children' in selectedGoal) {
        selectedGoal.tasks.push(item);
        selectedGoal.num_children += 1;

      }
      else {
        selectedGoal.tasks = [];
        selectedGoal.tasks.push(item);
        selectedGoal.num_children = 1;
      }
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


  validateForm_goal() {

    if (this.goal_desc == undefined && this.goal_time_est == undefined && this.goal_val == undefined) {
      alert("please fill the form!")
    } else {
      if (this.goal_desc == "") {
        alert("Description must be filled out");
        return false;
      }
      if (this.goal_val == null) {
        alert("Goal value must be filled out");
        return false;
      }
      if (this.goal_time_est == null) {
        alert("Time estimation must be filled out");
        return false;
      }

      //pass validator and add goal
      this.addGoal();


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

  private listenToGoalChanges(): void {
    this.itemService.listenToGoals()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(goals => {
        this.goals = goals;
      });
  }

  private setGoals(goals: Goal[]): void {
    this.itemService.setGoals(goals);
  }

  private renumberGoals(): void {
    const renumberedGoals = this.goals.map((goal, index) => ({
      ...goal,
      code: `${index + 1}`
    }));

    this.goals = renumberedGoals;
  }

  private adjustGoal(selectedGoal: Goal): void {
    const adjustedGoals =  this.goals.map(goal =>
      goal.name === selectedGoal.name ? selectedGoal : goal
    );

    this.setGoals(adjustedGoals);
  }

  private resetGoalForm(): void {
    this.goal_desc = undefined;
    this.goal_val = undefined;
    this.goal_deadline = undefined;
    this.goal_time_est = undefined;
  }

  private resetTaskForm(): void {
    this.task_desc = undefined;
    this.task_today = undefined;
    this.task_deadline = undefined;
    this.task_time_est = undefined;

  }
}


