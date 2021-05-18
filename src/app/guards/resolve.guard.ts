import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemService } from '../provider/item.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveGuard implements Resolve<any> {

  constructor(private itemService:ItemService){

  }
  resolve(){
    console.log("Running Resovle Guard. API Running");
    return this.itemService.getOptimalList();
  }
  
}
