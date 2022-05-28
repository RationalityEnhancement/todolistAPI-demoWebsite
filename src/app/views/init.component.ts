import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from "@angular/router";
import { ImageUrlService } from "../provider/image-url.service";
@Component({
  selector: "init",
  template: `
  
   
  <div >

    <div class="logo-wrapper">

      <img src={{logoUrl}}/>
      
    </div>

    <div>

      <span style="font-size:24px; display:block;">An AI-Powered Goal-Setting App that helps you prioritise</span> 
    </div>
    <br>
    <div>
    <span style="display: block;margin-left: auto;margin-right: auto;width: 680px;">There are so many things you could do. It’s overwhelming, and figuring out what is most important can be very difficult. This app helps you focus on what’s essential. Just tell it about your many goals and tasks, and it will suggest a short list of important things for you to focus on this week. The rest can wait until next week.</span>
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InitComponent {

  constructor(
    public router: Router,
    private imagUrlService: ImageUrlService
  ) {}
  
  public get logoUrl() {
    return this.imagUrlService.createImageUrl('logo.png');
  }
  
  public route(){

    this.router.navigateByUrl('/list') //skip login.component.ts
  } 
}