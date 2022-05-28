import { Component } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "login",
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(public router: Router) {}

  
  public route(){
    this.router.navigateByUrl('/list')
  } 
}