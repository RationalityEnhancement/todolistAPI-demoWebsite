import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {filter, map, min, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { Goal, Item} from './item';
import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';
import { Timestamp } from 'rxjs/internal/operators/timestamp';


@Component({
  selector: 'todo-list',
  template: `
  <div class="btn top-fixed" (click)="openGoal($event)" ><div>Add Goals</div></div>
 
   
   <div style="text-align: center; margin-top:10px; color: red;"> Please tell us about <b>5</b> or more of your goals and list at least <b>two</b> milestones for each of them.</div>
    
    <div style="text-align: left; margin-top:10px; margin-left:20%; margin-right:15%;">
    <b>Goal</b>: Something that you need to or want to achieve. <br>
    <b>Milestones</b>: A milestone along your path to achieving the goal that you could realistically accomplish in a few days or hours.<br>
    
    <div class="popup" (click)="myFunction_example()" id="hoverText" style=" text-align: left; margin-top:10px;  cursor: pointer; color:blue;" >
    <img src="assets/images/information.png" alt="info icon" width="20px" height="20px" > Example for a good goal
    <span  class="popuptext" id="myPopup_example">
    We recommend choosing an ongoing project, such as “write the term paper for my English class”, “start my own business”, “learn programming”, or “get a good job”, that you can work on in the next 7 days.
    <br><br>
    In comparison, "cooking dinner on X'mas" isn't a suitable goal. Ideally, your goal can be broken down into a series of milestones.
    <br><br>

    
    <b>Example</b>:
    <br>Goal: Write a  term paper for my English class (Value: 100)
    <br>&nbsp;&nbsp;&nbsp;&nbsp;|----Brainstorm potential topics [2 hrs]
    <br>&nbsp;&nbsp;&nbsp;&nbsp;|----Choose a topic [1 hrs]
    <br>&nbsp;&nbsp;&nbsp;&nbsp;|----Read up on the chosen topic [10 hrs]
    <br> &nbsp;&nbsp;&nbsp;&nbsp;|----Outline the paper [3hr]
    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and so on... 
    </span>
    </div>

<br>
    <div class="popup" (click)="myFunction()" id="hoverText" style=" text-align: left; margin-top:10px; cursor: pointer; color:blue;" >
    <img src="assets/images/information.png" alt="info icon" width="20px" height="20px" > Which information should I enter?
    <span  class="popuptext" id="myPopup">
    <b>Description</b> 
    <br>Write down what you want to achieve (e.g., “Start my own business”)
    <br><br><b>Value</b>
    <br>How valuable would it be for you to have achieved this goal on a scale from 0 to 100, where 0 means “I couldn’t care less.” and 100 means “Nothing could be more valuable to me.”? Don’t stress about the exact value. What matters most is that you assign higher values to the goals that are more important to you. If your first goal is twice as valuable to you as your second goal, then its value should be twice as high.  
    <br><br><b>Estimated Time</b>
    <br>How many hours will it take to achieve this goal or milestone? 
    <br><br><b>Deadline</b>
    <br>If there is a deadline for this goal or milestone, then please fill it in!

    <br></span>
</div>
<br>
<div class="popup" (click)="myFunction_finish()" id="hoverText" style=" text-align: left; margin-top:10px; cursor: pointer; color:blue;" >
    <img src="assets/images/information.png" alt="info icon" width="20px" height="20px" > What to do when I finish adding goals?
    
    <span  class="popuptext" id="myPopup_finish">
    <b>Next step</b> 
    <br>Please click on <b>Which of these goals should I focus on first?</b> button when you finish.
    You will receive our app’s recommendation in a few seconds.
    
    <br></span>
</div>

</div>


  
    <div class="form-popup" id="task-form" *ngIf = "task_form_open == true">
      
      <form class="form-container">
        <h1>Add a Milestone in Goal {{goal_opened.name}}</h1>
        <label for="item-desc"></label>
        <input [(ngModel)]="task_desc" type="text" placeholder="Milestone Description (*Required)" name="item-desc" required>

        <label for="item-time"></label>
        <input [(ngModel)]="task_time_est" type="number" placeholder="Enter Time Estimate (Hours) (*Required)" name="item-time-est" required >

        <label for="item-deadline"></label>
        <input [(ngModel)]="task_deadline" type="date" placeholder="Enter Deadline (YYYY.MM.DD) (optional)" name="item-deadline">
        
        <!--
        <label for="item-today"></label>
        <input [(ngModel)]="task_today" type="radio" id="nt" name="item-today" value="Not Today"> <label for = "nt"> Not Today </label>
        <input [(ngModel)]="task_today" type="radio" id="t" name="item-today" value="Today"> <label for = "t"> Today </label>
        -->

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
        <input [(ngModel)]="goal_desc" type="text" placeholder="Goal Description (*Required)" name="goal-desc" required>

        <label for="goal-val"></label>
        <input [(ngModel)]="goal_val" type="number" placeholder="Goal Value (0-100) (*Required)" name="goal-val"  min="0" max="9999" required>

        <label for="goal-time"></label>
        <input [(ngModel)]="goal_time_est" type="number" placeholder="Enter Time Estimate (Hours) (*Required)" name="goal-time-est">

        <label for="goal-deadline" style="font-size: 12px; color: gray; margin-left: 6px">Enter a deadline (optional)</label>
        <input [(ngModel)]="goal_deadline" type="date" placeholder="Enter Deadline (YYYY.MM.DD)" name="goal-deadline">
       
        <button type="submit" class="btn add" (click) = "validateForm_goal($event)">Add</button>
        <button type="submit" class="btn cancel" (click)="closeGoal($event)">Cancel</button>
      </form>
      </div>

    
    <div class="form-popup" id="edit-goal-form" *ngIf = "goal_form_open == true">
      <form class="form-container">
        <h1>Edit Goal: {{goal_opened.name.name}}</h1>
        <h4>Only enter what you want to change.</h4>
        <label for="goal-desc" style="font-size: 12px; color: gray; margin-left: 6px">Goal Name</label>
        <input [(ngModel)]="goal_desc"  type="text" placeholder={{goal_opened.name.name}} name="goal-desc" required>

        <label for="goal-val" style="font-size: 12px; color: gray; margin-left: 6px"> Goal Value</label>
        <input [(ngModel)]="goal_val" type="number" placeholder={{goal_opened.name.value}} name="goal-val"  min="0" max="9999" required>

        <label for="goal-time" style="font-size: 12px; color: gray; margin-left: 6px">Goal Time Estimation (hrs)</label>
        <input [(ngModel)]="goal_time_est" type="number" placeholder={{goal_opened.name.time_est}} name="goal-time-est">

        <label for="goal-deadline" style="font-size: 12px; color: gray; margin-left: 6px">Enter a deadline (optional)</label>
        <input [(ngModel)]="goal_deadline" type="date" placeholder="Enter Deadline (YYYY.MM.DD)" name="goal-deadline">
       
        <button type="submit" class="btn add" (click) = "updateGoal($event, goal_opened.name)">Submit</button>
        <button type="submit" class="btn cancel" (click)="closeGoal($event)">Cancel</button>
      </form>
      </div>


     
    <div class="goal-wrapper" id="goal-display" *ngIf = "goals.length > 0">
   
    <div class="popup" (click)="myFunction_info()"  id="hoverText" style="text-align: left; margin-top:10px; margin-left:45%;cursor: pointer; color:blue;" ><img src="assets/images/information.png" alt="info icon" width="20px" height="20px" > Icons
    <span  class="popuptext_info" id="myPopupInfo">
    
    <div class="icon plus" style="text-align:center;cursor:not-allowed; " ><div> +</div></div>
    <span>Add a milestone </span><br>
    <div class="icon plus"  style="text-align:center; cursor:not-allowed"><div> -</div></div>
    <span>Delete the goal  </span>
    <div style="cursor:not-allowed; padding-left:5px;  "><img src="assets/images/Edit_icon.svg.png" alt="edit icon" width="20px" height="20px" >       Edit the goal</div>
    
   
    </span>
    </div>


    <ul>
        <li *ngFor = "let goal of goals" class="goal-item">
          <div> Goal: <b>{{goal.name}}</b> <br> Value: {{goal.value}} <br>Time Estimation:  {{goal.time_est}} hr
          <br> Deadline: / {{goal.deadline}}  
          <div>
              <div class="icon plus" (click)="openItem($event, goal)"><div>+</div></div>
              <div class="icon plus" (click)="deleteGoal($event, goal)" id= "hoverText" ><div>-</div></div>
              <div style= "cursor:pointer;" (click)="editGoal($event, goal)" ><img src="assets/images/Edit_icon.svg.png" alt="edit icon" width="20px" height="20px" > </div>
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
                      <br> Deadline: / {{task.deadline}}  
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
      <div class="btn bottom-fixed" (click)="route()" >Which of these goals should I focus on first?</div>
    
    
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
      bottom: 10%;
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
        position: relative;
        margin-top: 30px;
        bottom: 10px;
        width: 55%;
        background-color: #BE9F9C;
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
    name: "DEFAULT",
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
    var children_num_validator = true;
    var goals_num_validator = false
    for(let i=0; i<this.goals.length; i++){
      console.log("check num of children")
      console.log(this.goals[i], this.goals[i].num_children);
      console.log(this.goals[i].tasks);
      if(this.goals[i].num_children == undefined || this.goals[i].num_children < 2 ){
        console.log(this.goals[i], this.goals[i].num_children);
        children_num_validator = false;
        alert("Please add at least 2 milestones for each goal");
        return false;
      }
    }

    if(this.goals.length>=5){
      goals_num_validator = true;
    }else{
      alert("Please add at least 5 goals");
      return false;
    }

    if(goals_num_validator && children_num_validator){
      this.router.navigateByUrl('/optimized')
    }else{
      alert("Please fulfill the requirements before you continue!");
      return false;
    }

  } 


  openGoal(e?) {
    // console.log("in openGoal");
    // console.log(this.goal_form_open)
    // this.closeItem(e);
    //close other forms
    document.getElementById("edit-goal-form").style.display = "none";
    document.getElementById("task-form").style.display = "none";

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
    //close other forms
    document.getElementById("goal-form").style.display = "none";
    document.getElementById("edit-goal-form").style.display = "none";
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
    document.getElementById("edit-goal-form").style.display = "none";
   // document.getElementById("task-form").style.display = "none";
    this.goal_opened;
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
    //  console.log(goal);
    }
    this.goal_desc = undefined;
    this.goal_val = undefined;
    this.goal_deadline = undefined;
    this.goal_time_est = undefined;
    
  //  console.log("------all goals-----");
 //   console.log(this.goals);

  }

  deleteGoal(event, goal){
    const index = this.goals.indexOf(goal);
    if(index > -1){
      this.goals.splice(index,1);
    }
  }

  

  editGoal(event, goal){
    this.goal_opened = goal;
    if(this.goal_form_open == true){
      document.getElementById("edit-goal-form").style.display = "block";
    }
    //close other forms
    document.getElementById("goal-form").style.display = "none";
    document.getElementById("task-form").style.display = "none";
    const index = this.goals.indexOf(goal);
    //placeholder for submitted values
    this.goal_opened = <Goal>({
      name: goal,
      time_est: this.goals[index].time_est,
      deadline: this.goals[index].deadline,
      value: this.goals[index].value
    });

 
  }

  
  updateGoal(event, goal){
    const index = this.goals.indexOf(goal);
   // console.log(index);
   
    this.goal_opened = goal;
   
    //console.log("+*+* before update: ", this.goal_opened);
   // console.log("+*+* before update: ", goal);
    if(this.goal_desc == undefined || this.goal_desc==""){
      this.goal_desc = goal.name;
   //   console.log("update goal name: ", this.goal_desc);
    }
    if(this.goal_time_est == null){
      this.goal_time_est = goal.time_est;
    }
    if(this.goal_val == null){
      this.goal_val = goal.value;
    }
    if(this.goal_deadline == undefined || this.goal_deadline == ""){
      this.goal_deadline = goal.deadline;
    }
   
    goal = <Goal>({
      name: this.goal_desc,
      time_est: this.goal_time_est,
      deadline: this.goal_deadline,
      value: this.goal_val,
    });
     //get child nodes
     if ('tasks' in this.goals[index]){
      const children = this.goals[index].tasks;
      goal["tasks"]=children;
    }
      if('num_children' in this.goals[index]){
      const num_children = this.goals[index].num_children;
      goal["num_children"] = num_children;
    }
  //  console.log("*+*+updated goal: ", goal);
  //  console.log("*+*+before update goals: ", this.goals);
  //update to the goals
    this.goals[index] = goal;
  //  console.log("*+*+updated goals: ", this.goals);
    document.getElementById("edit-goal-form").style.display = "none";
    //all values to undefined.
    this.goal_desc = undefined;
    this.goal_val = undefined;
    this.goal_deadline = undefined;
    this.goal_time_est = undefined;
    
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
       
      }
      else{
        // console.log("FIRST CHILD");
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
    if (this.goal_val> 100 || this.goal_val<0){
      alert("Goal value needs to be between 0 and 100")
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
  myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }
  myFunction_info() {
    var popup = document.getElementById("myPopupInfo");
    popup.classList.toggle("show");
  }
  myFunction_finish(){
    var popup = document.getElementById("myPopup_finish");
    popup.classList.toggle("show");
  }
    myFunction_example(){
    var popup = document.getElementById("myPopup_example");
    popup.classList.toggle("show");
  }
 
}


