import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {filter, map, min, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { Goal, Item} from './item';
import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';


@Component({
  selector: 'todo-list',
  template: `

    <div class="btn top-fixed" (click)="openGoal($event)"><div>Add Goals</div></div>
    <div style="text-align: center; margin-top:10px; color: red;"> Please add at least <b>5</b> goals and at least <b>2</b> subgoals for each.</div>
    <div style="text-align: left; margin-top:10px; margin-left:20%;">
    <b>Goal</b>: A goal that you need to or want to achieve within 2 months. <br>
    <b>Subgoal</b>: A subordinate goal that helps you achieve a goal.<br>
    Please click on <b>Get My Gamifying List</b> button when you finish.
    </div>
    <div class="form-popup" id="task-form" *ngIf = "task_form_open == true">
      
      <form class="form-container">
        <h1>Add Subgoal in Goal {{goal_opened.name}}</h1>
        <label for="item-desc"></label>
        <input [(ngModel)]="task_desc" type="text" placeholder="Subgoal Description (*Required)" name="item-desc" required>

        <label for="item-time"></label>
        <input [(ngModel)]="task_time_est" type="number" placeholder="Enter Time Estimate (Hours) (*Required)" name="item-time-est" required >

        <label for="item-deadline"></label>
        <input [(ngModel)]="task_deadline" type="date" placeholder="Enter Deadline (YYYY.MM.DD) (optional)" name="item-deadline">
        <label for="item-today"></label>
        <input [(ngModel)]="task_today" type="radio" id="nt" name="item-today" value="Not Today"> <label for = "nt"> Not Today </label>
        <input [(ngModel)]="task_today" type="radio" id="t" name="item-today" value="Today"> <label for = "t"> Today </label>

        <!--
          <b>Not Today</b>
          <label class="switch">
            <input type="checkbox"x>
            <span class="slider round"></span>
          </label>
          <b>Today</b>
        -->
       
        <button type="submit" class="btn add" (click)="validateForm_task($event)">Add</button>
        <button type="submit" class="btn cancel" (click)="closeItem($event)">Cancel</button>
      </form>
    </div>

    <div class="form-popup" id="goal-form" *ngIf = "goal_form_open == true">
      <form class="form-container">
        <h1>Add Goal</h1>
 
        <label for="goal-desc"></label>
        <input [(ngModel)]="goal_desc" type="text" placeholder="Goal Description (*Required)" name="item-desc" required>

        <label for="goal-val"></label>
        <input [(ngModel)]="goal_val" type="number" placeholder="Goal Value (0-9999) (*Required)" name="item-val"  min="0" max="9999" required>

        <label for="goal-time"></label>
        <input [(ngModel)]="goal_time_est" type="number" placeholder="Enter Time Estimate (Hours) (*Required)" name="goal-time-est">

        <label for="goal-deadline"></label>
        <input [(ngModel)]="goal_deadline" type="date" placeholder="Enter Deadline (YYYY.MM.DD)" name="goal-deadline">
       
        <button type="submit" class="btn add" (click) = "validateForm_goal($event)">Add</button>
        <button type="submit" class="btn cancel" (click)="closeGoal($event)">Cancel</button>
      </form>
      </div>

    <div class="btn bottom-fixed" (click)="route()">Get My Gamifying List</div>
    
    
    <div class="goal-wrapper" id="goal-display" *ngIf = "goals.length > 0">
      <ul>
        <li *ngFor = "let goal of goals" class="goal-item">
          <div> Goal: <b>{{goal.name}}</b> <br> Value: {{goal.value}} <br>Time Estimation:  {{goal.time_est}} hr
            <div>
              <div class="icon plus" (click)="openItem($event, goal)"><div>+</div></div>
              <div class="icon plus" (click)="deleteGoal($event, goal)"><div>-</div></div>
            </div>
            <div *ngIf = "goal.tasks !== undefined">
              <div *ngIf = "goal.tasks.length > 0">
              <!--<div id="goal-sum-time" > Time Estimation:  {{goal.goal_time_est}} </div>-->
      
              <div> ------ Subgoals ------
              <ul>
                  <li *ngFor = "let task of goal.tasks" class="task-item">
                     <!--
                        <div> Task: {{task.name}} {{task.time_est}}
                      -->
                      <div> {{task.name}} <br/> Time: {{task.time_est}} hr
                       <div class="del-wrapper"> 
                          <div class="del" (click)="deleteItem($event, goal, task)"><div>-</div></div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
   

  `,
  styles: [
    `
    /* Button used to open the contact form - fixed at the bottom of the page */
    .open-button {
      background-color: #555;
      color: white;
      padding: 16px 20px;
      border: none;
      cursor: pointer;
      opacity: 0.8;
      position: fixed;
      bottom: 23px;
      right: 28px;
      width: 280px;
    }

    /* The popup form - hidden by default */
    .form-popup {
      display: none;
      position: fixed;
      bottom: 120px;
      right: 15px;
      border: 3px solid #f1f1f1;
      z-index: 9;
    }

    /* Add styles to the form container */
    .form-container {
      max-width: 300px;
      padding: 10px;
      background-color: white;
    }

    /* Full-width input fields */
    .form-container input[type=text],
    input[type=number], input[type=date], .form-container input[type=password] {
      width: 92%;
      height: 40px;
      border: 1px solid 615757;
      /* box-sizing: unset; */
      padding: 6px;
      margin: 6px;
     
    }
    /* hide arrows in the number input box - Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
      }
/* hide arrows in the number input box in FireFox */
    input[type=number]{
      -moz-appearance: textfield;
    }


    /* When the inputs get focus, do something */
    .form-container input[type=text]:focus, input[type=number]:focus, input[type=date]:focus, .form-container input[type=password]:focus {
      background-color: #ddd;
      outline: none;
    }

    /* Set a style for the submit/login button */
    .form-container .btn {
      background-color: #4CAF50;
      color: white;
      border: none;
      cursor: pointer;
      width: 100%;
      margin-bottom:10px;
      opacity: 0.8;
      margin: 10px;
      min-inline-size: -webkit-fill-available;
    }

    /* Add a red background color to the cancel button */
    .form-container .cancel {
      background-color: red;
    }

    .form-container .add{
    }

    /* Add some hover effects to buttons */
    .form-container .btn:hover, .open-button:hover {
      opacity: 1;
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }
    
  
    .switch input { 
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: .4s;
      transition: .4s;
    }
    
    .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }
    
    input:checked + .slider {
      background-color: #2196F3;
    }
    
    input:focus + .slider {
      box-shadow: 0 0 1px #2196F3;
    }
    
    input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
    
    /* Rounded sliders */
    .slider.round {
      border-radius: 34px;
    }
    
    .slider.round:before {
      border-radius: 50%;
    }

    .item-desc-wrapper {

      display:flex;
      border: 5px solid gray;

    }
    .desc-field {
      width: 50%;
    }


      .goal-wrapper ul{
       width: 100%;
       display: inline-grid;
       overflow: auto;
       justify-content: space-between;
       max-height: -webkit-fill-available;
       grid-template-columns: 50% 50%;
       margin-bottom:30px;
   }
      
      

      .goal-item{
        width: 90%;
        min-width: 300px;
        min-height: 300px;
        display: inline-block;
        text-align: center;
        background: #E4E6C3;
        border-radius: 25px;
        padding: 10px;
        margin: 10px;
        
      }
      .task-wrapper{
        display: grid;
      }
      .task-item{
        width: 80%;
        min-height: 100px;
        min-width: 50%;
        display: block;
        text-align: center;
        background: #F7F7E3;
        border-radius: 25px;
        margin: 5px;
        justify-content: space-between;
        padding: 8px;
    }
       
      
      .btn.bottom-fixed {
       
        position: fixed;
        margin: 30px;
        margin-top: 30px;
        bottom: 10px;
        align: center;
      }
      .del-wrapper{
        position: relative;
      }
      .del{
        position: relative;
        top: 0px;
        cursor: pointer;
        display: inline-grid;
        width: 5%;
        min-width: 20px;
        height: 5%;
        min-height: 20px;
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 10px;
        background-size: 100%;
        color: white;
        background-color: red;
        border-radius: 100%;
        background-repeat: no-repeat;
        background-position: center center;
      }
    `
  ]
})

export class ToDoListComponent {

  
  public goal_val : number; 
  public goal_desc: string;
  public goal_deadline: string;
  public goal_time_est: number;
  public goal_form_open = true;

  public task_desc: string;
  public task_deadline: string;
  public task_time_est: number;
  public task_today: string;
  public task_form_open = true;
  public goal_opened =  <Goal>({
    name: "DEFAULT"
  });
  public optimalList = []
  public barFormControl = new FormControl()
  public validateGoalNum = false;
  public get taskList() {

    return Globals.taskList;
  }

  public get taskLength() :number {
    return this.taskList.length
  }

  public items = Globals.taskList
  public goals = Globals.goalList
  

  constructor(public router: Router) {

  }


  get itemsList() {

    return this.items
  }


  ngAfterViewInit() {


  }

  public route(){
    // console.log("Go to Optimized");
    
    if(this.goals.length>=5){
      this.router.navigateByUrl('/optimized')
    }else{
      alert("Please add at least 5 goals");
      return false;
    }

  } 


  openGoal(e?) {
    // console.log("in openGoal");
    // console.log(this.goal_form_open)
    // this.closeItem(e);
    if(this.goal_form_open == true){
      document.getElementById("goal-form").style.display = "block";
    }
    // this.goal_form_open = false;
    // console.log(this.goal_form_open);
    // console.log("Goal Length");
    // console.log(this.goals.length);
    // return true
  }
  
  openItem(e?, goal?) {
    // console.log("In openItem");
    this.goal_opened = goal;
    // console.log(goal);
    // console.log(this.goals.indexOf(goal));
    this.closeGoal(e);
    document.getElementById("task-form").style.display = "block";
    return true
  }

  closeGoal(e?){
    // console.log("Close Goal Form");
    this.goal_form_open = true;
    document.getElementById("goal-form").style.display = "none";
  }

  closeItem(e?){
    // console.log("Close Item Form");
    this.task_form_open = true;
    document.getElementById("task-form").style.display = "none";
  }

  addGoal(event?) {
    this.goal_form_open = true;
    // console.log(this.goal_desc)
    var goal = <Goal>({
      name: this.goal_desc,
      time_est: this.goal_time_est,
      deadline: this.goal_deadline,
      value: this.goal_val
    });
    if(this.goal_desc != undefined){
      this.goals.push(goal);
      this.goal_opened = goal;
      // console.log(goal);
    }
    this.goal_desc = undefined;
    this.goal_val = undefined;
    this.goal_deadline = undefined;
    this.goal_time_est = undefined;
    
    
    // console.log(this.goals);
    // this.displayGoal(goal);
  }

  deleteGoal(event, goal){
    const index = this.goals.indexOf(goal);
    if(index > -1){
      this.goals.splice(index,1);
    }
  }

  addItem(event, goal) {
    // console.log("In AddItem");
    // console.log(goal)
    var item = <Item>({
      name: this.task_desc,
      time_est: this.task_time_est,
      deadline: this.task_deadline,
      today: this.task_today == "Not Today" ? false: true,
      
    });
    // console.log(item);
    if(this.task_desc != undefined){
      
      // console.log(goal);
      
      if('num_children' in goal){
        // console.log("HAVE CHILD");
        goal.tasks.push(item);
        goal.num_children += 1;
        // update sum of time of tasks
        //goal.sumTime = goal.sumTime + this.task_time_est;
        //console.log("add a new child, new sumTime: ",goal.sumTime);
       // goal.goal_time_est = goal.sumTime;
        //console.log("add a new child, new goal sumTime: ", goal.goal_time_est);
      
       // var display_goal_time = document.getElementById("goal-sum-time")
       // display_goal_time.firstChild.nodeValue=goal.goal_time_est;
   
      }
      else{
        // console.log("FIRST CHILD");
        goal.tasks = [];
        goal.tasks.push(item);
        goal.num_children = 1;
        // create sum of time of tasks
       // goal.sumTime = this.task_time_est; 
      }
    console.log("num child",goal.num_children);
    console.log("Sum Time: ",goal.sumTime);
    }
    this.task_desc = undefined;
    this.task_today = undefined;
    this.task_deadline = undefined;
    this.task_time_est = undefined;
    
  }

  deleteItem(event, goal, item){
    // console.log("In deleteItem");
    // console.log(goal);
    // console.log(item);
    const index = goal.tasks.indexOf(item);
    // console.log(index);
    if(index > -1){
      goal.tasks.splice(index, 1);
      goal.num_children -= 1;
    }
  }

 
  validateForm_goal() {
    // console.log("validate")
    // console.log(this.goal_desc);
    // console.log(this.goal_time_est);
    // console.log(this.goal_val);

    if (this.goal_desc == undefined && this.goal_time_est == undefined && this.goal_val == undefined){
    alert("please fill the form!")
    }else{
      console.log("there's some input!");
    if (this.goal_desc == "") {
      alert("Description must be filled out");
      return false;
    }
    if (this.goal_val==null)
    {
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
  validateForm_task(){
    // console.log("validate subgoal")
    // console.log(this.task_desc);
    // console.log(this.task_time_est);
    if (this.task_desc == undefined && this.task_time_est == undefined){
      alert("please fill the form!")
    }else{
    if (this.task_desc == "") {
      alert("Description must be filled out");
      return false;
    }
  
    if (this.task_time_est == null) {
      alert("Time estimation must be filled out");
      return false;
    }
    //pass validator and add item
       this.addItem(event,this.goal_opened);
  }
  }
 

}


