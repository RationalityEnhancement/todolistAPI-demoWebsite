import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Globals } from "../globals";
import { ItemService } from "../provider/item.service";
import { Item, outputItem } from "./item";

@Component({
  selector: "optimized",
  template: `
  

  <h4>Optimized To-Do List</h4>

  <div id="todo-list-wrapper">

  <ul *ngIf="optList.length>0">
    <li>
      <div class="item-amount">Task</div>
      <div class="item-amount">Psuedo Reward</div>
      <div class="item-amount">Estimated Time</div>
    </li>
    <p>ng For: item of optList</p>
    <li *ngFor="let item of optList" (click)="toggleOpacity($event)">
  <div class="item-amount">{{getHumanReadable(item.nm)}}</div>
  <div class="item-amount">{{item.val}}</div>
  <div class="item-amount">{{getTime(item.nm)}}</div>
  </li>
  </ul>
  <h2>Your prioritized goals</h2>
  <p>Dear participant, we aim at brining the long-term value to the present in order to help people make a better decision. 
  In other words, our AI algorithm suggests a rational prioritized list for you. 
  There are many life goals to acheive, if you are not sure what to start first, here we are.</p>

  <h4>What does the algorithm take into account?</h4>

  <ul>
    <li>The number of your goals and tasks</li>
    <li>The value of your goals</li>
    <li>The estimate time of your goals and tasks</li>
  </ul>
  <br>
  To sum it up, our AI algorithm suggests the following prioritized goal list for you:<br>
  (The first suggestion being the most valuable goal of yours.)
  
  <div class="item-amount" style="color:blue; >{{getGoalname(finalList)}}</div>

  <ul>
  <li *ngFor="let item of final_optList"></li><br>
  </ul>

  <h4>Please go through the list and think about these questions:</h4>
  <ol>
  <li>Does it make sense?</li>
  <li>Do I believe that it is better for me if I follow the list and work on the prioritized goals?</li>
  <li>Which goal seems not so convincing to the suggested order? Why?</li>
  </ol><br>
  
  <h4>UX questions:</h4>
  <ol>
  <li>Before using this app, what was your goal pursuit priority?</li>
  <li>Do you think it is a good suggestion? Why or why not?
  <li>Before using this app, what was your goal pursuit priority?</li>
  <li>How might this result change your behaviour of goal pursuit from now on? Will you spend more time and energy on the prioritized goals? 
  </ol>

</div>


  `,
  styles: [
    `
    #todo-list-wrapper {
      margin-bottom: 100px;
    }
    
    #todo-list-wrapper ul {
    }
  
    #todo-list-wrapper ul li {
      position: relative;
      display: flex;
      justify-content: space-between;
      width: 100%;
      box-sizing:border-box;
      padding: 2.5%;
      text-align:center;
      cursor:pointer;
      border-bottom: 1px solid #777;
    }
    #todo-list-wrapper ul li:last-child {
      cursor:default;
      border: none;
    }
    #todo-list-wrapper ul li:first-child {
      cursor:default;
      font-size: 1.2rem;
    }

    #todo-list-wrapper ul li div {
      width: 20%;
      text-align:left;
    }

    #todo-list-wrapper ul li img {
      width: 100%;
    }

    #todo-list-wrapper ul li .item-bar {
  
      display: flex;
      justify-content:center;
      width: 90%;
      height: 50px;
      line-height: 50px;
    }

    #todo-list-wrapper ul li .item-bar div {

    }



  
    `,
  ],
})
export class OptimizedListComponent implements OnInit {
  public optList: outputItem[]
  public re: RegExp
  public goalname_map: {}
  public finalList = [];
  public final_optList = [];


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

    //check optList, remove duplicated goals {g2, g1, g1, g2, g1} -> {g2, g1}

    console.log("1 final List: ", this.finalList);
    for (let i = 0; i < this.optList.length; i++) {
      var temp = this.optList[i]["id"].slice(0, 2);
      if (!this.finalList.includes(temp)) {
        this.finalList.push(temp);
      }
      console.log("final List: ", this.finalList); // in the suggested order for users to follow
    }

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
    console.log("finalList (in getGoalname): ", finalList);
    let final_optList = [];
    for (let i = 0; i < finalList.length; i++) {
      final_optList.push(this.goalname_map[finalList[i].slice(1,) - 1]);
    }
    console.log("goalname_map: ", this.goalname_map);
    console.log("final opt List: ", final_optList);
    return final_optList;
  }

}
