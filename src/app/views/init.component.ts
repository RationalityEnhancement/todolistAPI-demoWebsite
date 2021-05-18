import { Component } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "init",
  template: `
  
   
  <div >

    <div class="logo-wrapper">

      <img src="./assets/images/logo.png"/>
      
    </div>

    <div>

      <span>AI Powered To-Do List Gamification Demo</span> 
      
    </div>
    
    <div>

      <span>Rationality Enhancement Group</span> 
      
    </div>
    
    <div>

      <div class="btn bottom" (click)="route()">Get started</div>

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



    `,
  ],
})
export class InitComponent {

  constructor(public router: Router) {

  }

  
  public route(){

    this.router.navigateByUrl('/login')
  } 
}