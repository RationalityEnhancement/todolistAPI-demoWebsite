import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ItemService } from 'src/app/provider/item.service';
import { Globals } from '../../globals';
import { Goal, Item } from '../../interfaces/item';
import { ImageUrlService } from '../../provider/image-url.service';


@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

export class ToDoListComponent {

  public goal_val: number;
  public goal_desc: string;
  public goal_deadline: string;
  public goal_time_est: number;

  public task_desc: string;
  public task_deadline: string;
  public task_time_est: number;
  public task_today: string;
  public task_form_open = true;
  public goal_opened = <Goal>({
    name: "DEFAULT",
  });

  public optimalList = []
  public barFormControl = new FormControl()
  public validateGoalNum = false;

  public items = Globals.taskList
  public goals = Globals.goalList

  public currentInformationPopup: 'goalExample' | 'information' | 'finishGoals' | 'legend' |'none';

  public currentGoalForm: 'goal' | 'task' | 'editGoal' | 'none';

  private images = ['information.png', 'edit_icon.png'];

  constructor(
    private imageUrlService: ImageUrlService,
    private itemService: ItemService
  ) {}

  public get taskList() {
    return Globals.taskList;
  }

  public get taskLength(): number {
    return this.taskList.length
  }

  get imageUrls() {
    return this.imageUrlService.createImageUrls(this.images);
  }


  get itemsList() {
    return this.items;
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
      this.itemService.requestOptimalTodoList().subscribe( goals => {
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
    var goal = <Goal>({
      name: this.goal_desc,
      time_est: this.goal_time_est,
      deadline: this.goal_deadline,
      value: this.goal_val
    });
    if (this.goal_desc != undefined) {
      this.goals.push(goal);
      this.goal_opened = goal;
    }
    this.goal_desc = undefined;
    this.goal_val = undefined;
    this.goal_deadline = undefined;
    this.goal_time_est = undefined;
  }

  deleteGoal(event, goal) {
    const index = this.goals.indexOf(goal);
    if (index > -1) {
      this.goals.splice(index, 1);
    }
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

    const index = this.goals.findIndex(goal => goal.name === this.goal_opened.name);

    this.goals[index] = { ...this.goals[index], ...this.goal_opened };

    this.goal_desc = undefined;
    this.goal_val = undefined;
    this.goal_deadline = undefined;
    this.goal_time_est = undefined;
  }

  addItem(event, goal) {
    var item = <Item>({
      name: this.task_desc,
      time_est: this.task_time_est,
      deadline: this.task_deadline,
      today: this.task_today == "Not Today" ? false : true,

    });
    if (this.task_desc != undefined) {

      if ('num_children' in goal) {
        goal.tasks.push(item);
        goal.num_children += 1;

      }
      else {
        goal.tasks = [];
        goal.tasks.push(item);
        goal.num_children = 1;

      }

    }
    this.task_desc = undefined;
    this.task_today = undefined;
    this.task_deadline = undefined;
    this.task_time_est = undefined;

  }

  deleteItem(event, goal, item) {

    const index = goal.tasks.indexOf(item);
    if (index > -1) {
      goal.tasks.splice(index, 1);
      goal.num_children -= 1;
    }
  }


  validateForm_goal() {

    if (this.goal_desc == undefined && this.goal_time_est == undefined && this.goal_val == undefined) {
      alert("please fill the form!")
    } else {
      console.log("there's some input!");
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
}


