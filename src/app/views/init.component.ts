import { Component, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Globals } from "../globals";
@Component({
  selector: "init",
  template: `
  
   
  <div >

    <div class="logo-wrapper">

      <img src="./assets/images/logo.png"/>
      
    </div>

    <div>

      <span style="font-size:24px; display:block;">An AI-Powered Goal-Setting App that helps you prioritise</span> 
    </div>
    <br>
    <div>
    <span style="display: block;margin-left: auto;margin-right: auto;width: 680px;">There are so many things you could do. It’s overwhelming, and figuring out what is most important can be very difficult. This app helps you focus on what’s essential. Just tell it about your many goals and tasks, and it will suggest a short list of important things for you to focus on this week. The rest can wait until next week.</span>
    </div>
    <br>
    <div style="display: block;margin-left: auto; font-size:24px; color:red;">
    Please enter the passcode:
    <input [(ngModel)]="condition_code" type="text" style="font-size:24px;">
    <p style="color: gray; font-size:18px;">(You can find it on GuidedTrack)</p>
    
    </div>
    <div class="btn bottom" style="font-size:24px;" (click)="condition_validate()">Validate my code and get started</div>
    

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

  public ai_method_result=Globals.ai_method_result;
  public condition_code:string;
  constructor(public router: Router) {

  }
  condition_validate(){
    if (this.condition_code == "11022"){ //treatment condition
      this.ai_method_result = true;
      this.route()
    }else{
      if(this.condition_code=="56022"){ //random condition 
        this.ai_method_result = false;
        this.route()
      }else{
        alert("Your code in invalid! Please check GuidedTrack for the correct code.")
      }
    }
  }
 // condition_validate()

  public route(){
  console.log("valid code: ", this.condition_code)
  Globals.ai_method_result = this.ai_method_result;
  this.router.navigateByUrl('/onboarding') //skip login.component.ts
  } 
}