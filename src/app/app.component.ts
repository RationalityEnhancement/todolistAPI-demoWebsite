import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
  
    
  <div id="outlet-wrapper">
    <router-outlet></router-outlet>
  </div>


  `,
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent implements AfterViewInit {

  constructor(public router: Router) {

  }

  ngAfterViewInit() {

  } 

}
