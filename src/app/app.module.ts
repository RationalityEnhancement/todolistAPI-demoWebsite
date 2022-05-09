import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { InitComponent } from './views/init.component'
import { ToDoListComponent } from './views/todo-list.component'
import { LoginComponent } from './views/login.component'
import { OnboardingComponent } from './views/onboarding.compotent'

import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ItemService } from './provider/item.service';
import { OptimizedListComponent } from './views/optimized-list.component';
import { ResolveGuard } from './guards/resolve.guard';


const routes: Routes = [
  { path: 'intro', component: InitComponent },
  { path: 'list', component: ToDoListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'onboarding', component: OnboardingComponent },
  { path: 'optimized', component: OptimizedListComponent },
  { path: '**', redirectTo: '/intro', pathMatch: 'full' },
];


@NgModule({
  declarations: [
    AppComponent,
    InitComponent,
    ToDoListComponent,
    LoginComponent,
    OnboardingComponent,
    OptimizedListComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,

    MatSliderModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule 
  ],
  providers: [ ItemService, ResolveGuard],
  
  exports: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
