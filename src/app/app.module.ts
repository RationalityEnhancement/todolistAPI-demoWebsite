import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ToDoListComponent } from './components/todo-list/todo-list.component'

import { GoalService } from './provider/goal.service';
import { ImageUrlService } from './provider/image-url.service';
import { createCustomElement } from '@angular/elements';
import { AdapterService } from './provider/adapter.service';
import { WorkflowyService } from './provider/workflowy.service';
import { TodoListService } from './provider/todo-list.service';
import { COLORS, COLOR_CONFIG } from './constants/colors';
import { EditGoalFormComponent } from './components/goal-form/edit-goal-form.component';
import { AddGoalFormComponent } from './components/add-goal-form/add-goal-form.component';
import { InitialGoalFormComponent } from './components/initial-goal-form/initial-goal-form.component';
import { AddTaskFormComponent } from './components/add-task-form/add-task-form.component';
import { TaskService } from './provider/task.service';
import { ColorService } from './provider/color.service';
import { InitialGoalViewComponent } from './components/initial-goal-view/initial-goal-view.component';
import { GoalEditorComponent } from './components/goal-editor/goal-editor.component';
import { GoalEditorInstructionsComponent } from './components/goal-editor-instructions/goal-editor-instructions.component';
import { FurtherGoalsViewComponent } from './components/further-goals-view/further-goals-view.component'


@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    EditGoalFormComponent,
    AddGoalFormComponent,
    InitialGoalFormComponent,
    AddTaskFormComponent,
    InitialGoalViewComponent,
    GoalEditorComponent,
    GoalEditorInstructionsComponent,
    FurtherGoalsViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    GoalService,
    TaskService,
    TodoListService,
    ImageUrlService,
    AdapterService,
    WorkflowyService,
    ColorService,
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
