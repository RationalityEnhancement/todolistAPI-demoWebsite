import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { ToDoListComponent } from './components/todo-list/todo-list.component'

import { GoalService } from './provider/goal.service';
import { ImageUrlService } from './provider/image-url.service';
import { createCustomElement } from '@angular/elements';
import { AdapterService } from './provider/adapter.service';
import { WorkflowyService } from './provider/workflowy.service';
import { TodoListService } from './provider/todo-list.service';
import { COLORS, COLOR_CONFIG } from './constants/colors';


@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    GoalService,
    TodoListService,
    ImageUrlService,
    AdapterService,
    WorkflowyService,
    { provide: COLOR_CONFIG, useValue: COLORS }
  ],
  entryComponents: [AppComponent]
})
export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) {
    const elementSelector = 'reg-todo-list';

    const webComponent = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define(elementSelector, webComponent);
  }

  ngDoBootstrap() { }
}
