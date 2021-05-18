import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Globals } from "../globals";
import { outputItem } from "./item";
import { ItemService } from '../provider/item.service';

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

    <li *ngFor="let item of optList" (click)="toggleOpacity($event)">
      
      <div class="item-amount">{{item.id}}</div>
      <div class="item-amount">{{item.val}}</div>
      <div class="item-amount">{{item.est}} minutes</div>
    </li>
  </ul>

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
export class OptimizedListComponent implements OnInit{

    public optList: outputItem[]

    constructor(public router: Router, private activatedRoute:ActivatedRoute) {
        this.optList = Globals.optTaskList;
        console.log('In optimized page constructor');
        console.log(this.optList);
        console.log("length");
        console.log(this.optList.length>0);
    }

    ngOnInit() {
      console.log("In Running Algo");
      this.optList = this.activatedRoute.snapshot.data['optList'];
      Globals.optTaskList = this.optList;
      console.log('API finished. In optimed page');
      console.log(this.optList);
      // this.itemService.getOptimalList().subscribe((optList)=> {
      //   console.log("RUNNING");
      //   Globals.optTaskList = optList;
      //   console.log(optList);
      // })
  
    }

    toggleOpacity(e) {

      let ele = e.target.closest('li')

      if(ele.getAttribute('checked') == 'true') {

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
}