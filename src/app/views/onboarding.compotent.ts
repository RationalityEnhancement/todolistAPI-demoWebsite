import { Component  } from "@angular/core";
import { Router } from "@angular/router";
import { Globals } from '../globals';
import { Goal, Item} from './item';
import {FormControl} from '@angular/forms';
import { nextTick } from "process";
@Component({
  selector: "onboarding",
  template: `

  <div >
    <div >
    <span id="text" style="font-size:18px;display: block;margin-left: auto;margin-right: auto;width: 680px;">
    Take a moment to think about the question and enter your first goal.</span>
    <span id="text2" style="font-size:20px; color:#8B0000; font-weight:bold; display: block;margin-left: auto;margin-right: auto;width: 680px;">
    What is the most important goal you want to achieve before you're gone?</span>
    <span id="text3"style="font-size:16px; display: block;margin-left: auto;margin-right: auto; width: 680px; text-align:left;" ></span>
    </div>
   <br>

<form class="form-container" id="form" >
        <h1>Your first goal</h1>
        <label for="goal-desc"></label>
        <input [(ngModel)]="goal_desc" type="text" id="name" name="goal_desc" placeholder="Goal Description (*Required)" required>

        <label for="goal-time"></label>
        <input [(ngModel)]="goal_time_est" type="number" placeholder="Enter Time Estimate (Hours) (*Required)" name="goal-time-est">

        <label for="goal-deadline" style="font-size: 12px; color: gray; margin-left: 6px">Enter a deadline (optional)</label>
        <input [(ngModel)]="goal_deadline" type="date" placeholder="Enter Deadline (YYYY.MM.DD)" name="goal-deadline">
        <button type="submit" class="btn add" (click) = "validateForm_goal()">Add</button>

      </form>
      
      <div>
      
      <div class="btn bottom" id="btn-next" style="width:200px; display:none;" (click)="route()">Next</div>
    </div>

  </div>



  `,
  styles: [
    `
    :host {
      text-align:center;
    }

    .logo-wrapper {
      display: flex;
      justify-content:center;
      align-items:center;
      height: 200px;
      margin-bottom: 20px;
    }

    .logo-wrapper img {
      height: 100%;
    }

    /* Add styles to the form container */
    .form-container {
      max-width: 300px;
      padding: 10px;
      border-color: black;
      border-style:solid;
      border-width:1px;
      display: inline-table;
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

    #explanation_value{
      font-size:14px;
      color:blue;
    }
    /* When the inputs get focus, do something */
    .form-container input[type=text]:focus, input[type=number]:focus, input[type=date]:focus, .form-container input[type=password]:focus {
      background-color: #ddd;
      outline: none;
    }

    `,
  ],
})




export class OnboardingComponent {

  constructor(public router: Router) {

  }

  public barFormControl = new FormControl()
  public goal_name: string;
  public goal_val : number; 
  public goal_desc: string;
  public goal_deadline: string;
  public goal_time_est: number;
  public goals = Globals.goalList
  public goal_opened =  <Goal>({
    name: "DEFAULT",
  });

  public route(){

    this.router.navigateByUrl('/list') //skip login.component.ts
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
  
    if (this.goal_time_est == null) {
      alert("Time estimation must be filled out with numbers");
      return false;
    }

    //pass validator and add goal
       this.addGoal();
       this.hideForm();
  
  }}
  
  addGoal(event?) {
    var goal = <Goal>{
      name: this.goal_desc,
      time_est: this.goal_time_est,
      deadline: this.goal_deadline,
      value: 100
    };
    if(this.goal_desc != undefined){
        this.goals.push(goal);
        this.goal_opened = goal;
        console.log(goal);
      }
    this.goal_desc = undefined;
    this.goal_val = undefined;
    this.goal_deadline = undefined;
    this.goal_time_est = undefined;
    console.log("------all goals-----");
    console.log(this.goals);

  }
  hideForm(){
  const form = document.getElementById('form');
  const btn_next = document.getElementById('btn-next');
  const txt = document.getElementById('text');
  const txt2 = document.getElementById('text2');
  const txt3 = document.getElementById("text3");
  if (form.style.display === 'none') {
    // 👇️ this SHOWS the form and hide the Next button
    form.style.display = 'block';
    btn_next.style.display = "none";
  } else {
    // 👇️ this HIDES the form and shows the Next button
    form.style.display = 'none';
    btn_next.style.display = "block";
    var deadline = " / ";
    if (this.goals[0].deadline != undefined ){
        var deadline = this.goals[0].deadline;
    }
    var value_exp =  "Because this is your most valuable goal, we set its value to 100% and use it as a reference point for estimating the value of your other goals."
    
    var text_display_1 = "Here is your most important goal: <br><br>"
    var text_display_2 = "Goal Name: "+ this.goals[0].name+ 
    "<br> Estimation of Time: " + this.goals[0].time_est +
    "hrs <br> Deadline: " + deadline+"<br>Value: " + this.goals[0].value + "%";
    
    txt.style.textAlign="left";
    txt.innerHTML= text_display_1;
    txt2.style.textAlign="left";
    txt2.innerHTML= text_display_2;
    txt3.innerHTML=value_exp;
  
  }
  
 
}

  next(){

  }
  
}