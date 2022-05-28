import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { InitComponent } from './components/init/init.component'
import { ToDoListComponent } from './components/todo-list/todo-list.component'
import { LoginComponent } from './components/login/login.component'
import { OptimizedListComponent } from './components/optimized-list/optimized-list.component';

import { ItemService } from './provider/item.service';
import { ImageUrlService } from './provider/image-url.service';
import { ResolveGuard } from './guards/resolve.guard';


const routes: Routes = [
  { path: 'intro', component: InitComponent },
  { path: 'list', component: ToDoListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'optimized', component: OptimizedListComponent },
  { path: '**', redirectTo: '/intro', pathMatch: 'full' },
];


@NgModule({
  declarations: [
    AppComponent,
    InitComponent,
    ToDoListComponent,
    LoginComponent,
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
  providers: [ 
    ItemService,
    ImageUrlService,
    ResolveGuard
  ],
  exports: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
