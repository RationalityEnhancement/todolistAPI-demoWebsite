import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Globals } from "../globals";
import { ItemService } from "../provider/item.service";
import { Item, outputItem } from "./item";

@Component({
  selector: "result",
  template: `
  


 
 
  <h2>You will do best if you prioritize this goal first:</h2>
  <div id="most_important_goal" style=" font-size: 18px; white-space:pre-wrap;">placeholder for the most important goal</div>
  <br><br>

  <h2>And then tackle this goal:</h2>
  <div id="second_important_goal" style=" font-size: 18px; white-space:pre-wrap;">placeholder for the second most important goal</div>

  <br><br>
  <h3>Your other goals are:</h3>
  <div id= "others">
  <p id="othergoals">other goals</p>
  </div>

  <br><br>
  <p>
  Here is the passcode you need to proceed on GuidedTrack survey: <b>goal100</b><br>
  Please DO NOT close this window yet because you will need the information on this screen to answer some questions. 
  </p>



  `,
  styles: [
    `
    #most_important_goal{
        background-color: #E4E6C3;
        border-radius: 10px;
        padding: 20px
    }

    #second_important_goal{
        background-color: #eceed5;
        border-radius: 10px;
        padding: 20px
    }

    #others{
        background-color: #f4f5e7;
        border-radius: 10px;
        padding: 20px
    }
   

    `,
  ],
})
export class ResultComponent implements OnInit {
  public optList: outputItem[]
  public re: RegExp
  public goalname_map: {}
  public goal_map: {}
  public finalList = [];
  public final_optList = [];
  public project_list = [];


  constructor(public router: Router, private activatedRoute: ActivatedRoute, public itemService: ItemService) {
    this.optList = Globals.optTaskList;
    this.re = /[\s]?[(]takes about[\s]?[0-9]+[\s]?[a-z]*[\s]?[a-z]*[\s]?[0-9]*[\s]?[a-z]*[)]/;

    console.log('In optimized page constructor');
    console.log(this.optList);
    // console.log("length");
    // console.log(this.optList.length>0);
  }

  ngOnInit() {
    console.log("In Running Algo");
    this.optList = this.activatedRoute.snapshot.data['optList'];
    Globals.optTaskList = this.optList;
    console.log('API finished. In optimed page');
    console.log(this.optList);

    this.goalname_map = this.itemService.goalname_map
    console.log("goalname_map: ", this.goalname_map)
    this.goal_map = this.itemService.goal_map;
    console.log("goal_map: ", this.goal_map)
    this.project_list = this.itemService.project_list;
    console.log("project list: ", this.project_list)


    //turn value into points/hour 
    
    this.optList.forEach((task, i) => {
        console.log(this.optList[i])
        var hr = parseFloat(task.nm.split("about ")[1].split(" hours")[0]);
        var val = parseFloat(task.val.toString().split("/h")[0])
        var new_val = val/hr
        console.log("est_hr for a task: ", hr, "original val: ", val);
        console.log("new val", new_val);
        this.optList[i].val = new_val; // update new val => points/hr
      });
  

    //sort optList by task value
    this.optList = this.optList.sort((a, b) => b.val - a.val)
    console.log("sorted list by value of task: ", this.optList)

    //check optList, remove duplicated goals {g2, g1, g1, g2, g1} -> {g2, g1}
    for (let i = 0; i < this.optList.length; i++) {
      var temp = this.optList[i]["id"].slice(0, 2);
      if (!this.finalList.includes(temp)) {
        this.finalList.push(temp);
      }
    }
    this.finalList.sort((a, b) => 0.5 - Math.random());
    console.log("final list shuffle randomly: ", this.finalList)
    this.getGoalname(this.finalList);
    
    // this.itemService.getOptimalList().subscribe((optList)=> {
    //   console.log("RUNNING");
    //   Globals.optTaskList = optList;
    //   console.log(optList);
    // })

  }

  toggleOpacity(e) {

    let ele = e.target.closest('li')

    if (ele.getAttribute('checked') == 'true') {

      ele.style.opacity = '1'

      ele.setAttribute('checked', 'false')
    }
    else {

      ele.style.opacity = '.3'

      ele.setAttribute('checked', 'true')
    }
  }

  titleCase(str) {
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }

  getTagRegex(tag) {
    return tag.exec('(?:\b|)');
  }

  getHumanReadable(item_name) {
    item_name = this.re[Symbol.replace](item_name, "");
    let prefix = /[0-9]*[)]?[\s]?/;
    item_name = prefix[Symbol.replace](item_name, "");
    // console.log('After Regex Name Removing )');
    // console.log(item_name);
    return item_name;
  }

  getTime(item_name) {
    let time = this.re[Symbol.match](item_name).toString();
    let prefix = /[\s]?[(]takes about[\s]?/;
    time = prefix[Symbol.replace](time, "");
    let suffix = /[)]/;
    time = suffix[Symbol.replace](time, "");
    // console.log('After Regex Time');
    // console.log(time);
    return time
  }

  getGoalname(finalList) {
    //display a prioritized list
   // console.log("finalList (in getGoalname): ", finalList);

    let final_optList = [];
    for (let i = 0; i < finalList.length; i++) {
      //final_optList.push(i+1 + " " +this.goalname_map[finalList[i].slice(1,) - 1]);
      this.goal_map[finalList[i].slice(1,)-1]=this.goal_map[finalList[i].slice(1,)-1].replace("Deadline: undefined", "");
      final_optList.push(i+1 + ". " +this.goal_map[finalList[i].slice(1,) - 1]);
    }

   // console.log("goalname_map: ", this.goalname_map);
  //  console.log("goal_map ", this.goal_map);
  //  console.log("final opt List: ", final_optList);
  //  console.log("type: ",typeof(final_optList));
    // put the list in a string
    let final_optList_br = final_optList.join('\r\n');
  //  console.log(final_optList_br)
  //  console.log(typeof(final_optList_br))
    
    // other goals (goal 3-5)
    let final_othergoals = [];
    for (let i = 2; i < finalList.length; i++) {
      this.goal_map[finalList[i].slice(1,)-1]=this.goal_map[finalList[i].slice(1,)-1].replace("Deadline: undefined", "");
      final_othergoals.push(i-1 + ". " +this.goal_map[finalList[i].slice(1,) - 1]);
    }
    let final_othergoals_str = final_othergoals.join('\r\n');


    //get children nodes in a list with the order of final list
    const top_priority_idx = this.project_list.findIndex(object => { return object.id === this.finalList[0] }) 
    const second_priority_idx = this.project_list.findIndex(object => { return object.id === this.finalList[1] }) 
  //  console.log("priority idx: ", top_priority_idx, second_priority_idx)
  
  //  console.log("get children list - children nodes only:")
    var ch_1 = this.project_list[top_priority_idx].ch
    var ch_2 = this.project_list[second_priority_idx].ch
  //  console.log("children nodes -- ")
    var ch_1list = []
    var ch_2list = []
    for (let i = 0; i < ch_1.length-1; i++){ //without the last node (everything else)
  //    console.log("ch_1: ", ch_1[i])
  //    console.log("ch_1 replace: ",ch_1[i].nm.substring(0, ch_1[i].nm.length-6).replace("~~", ": This step will take about ") )
      ch_1list.push("-- " + ch_1[i].nm.substring(0, ch_1[i].nm.length-6).replace("~~", ": This step will take about "));
    }
    for (let i = 0; i < ch_2.length-1; i++){
    ch_2list.push("-- " + ch_2[i].nm.substring(0, ch_2[i].nm.length-6).replace("~~", ": This step will take about "));
  }
  //  console.log("print temp_arr: ", ch_1list)
 //   console.log("print temp_arr: ", ch_2list)
    var ch_1list_str =ch_1list.join("\r\n");
    var ch_2list_str =ch_2list.join("\r\n");
  //  console.log("print ch_1list_str: ", ch_1list_str)
  //  console.log("print ch_2list_str: ", ch_2list_str)


    //after generating a list
    const most_important_goal = document.getElementById("most_important_goal");
    most_important_goal.innerText= final_optList[0] +"\r\n"+ ch_1list_str;
    const second_important_goal = document.getElementById("second_important_goal");
    second_important_goal.innerText = final_optList[1] + "\r\n"+ ch_2list_str;
    const othergoals = document.getElementById("othergoals");
    othergoals.innerText = final_othergoals_str;

    return final_optList_br;
  }

}
