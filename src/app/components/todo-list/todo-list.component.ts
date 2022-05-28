import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from '../../globals';
import { Goal, Item } from '../../interfaces/item';
import { ImageUrlService } from '../../provider/image-url.service';


@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'], 
  changeDetection: ChangeDetectionStrategy.OnPush
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

  private images = ['information.png', 'edit_icon.png'];
  

  constructor(
    public router: Router,
    private imageUrlService: ImageUrlService
    ) {

  }

  get imageUrls() {
    return this.imageUrlService.createImageUrls(this.images);
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
      if(this.goals[i].num_children == undefined || this.goals[i].num_children < 2 ){
        console.log(this.goals[i], this.goals[i].num_children);
        children_num_validator = false;
        alert("Please add at least 2 subgoals for each goal");
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


