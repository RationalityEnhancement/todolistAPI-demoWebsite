import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ToDoListComponent } from './components/todo-list/todo-list.component'

import { GoalService } from './provider/goal.service';
import { createCustomElement } from '@angular/elements';
import { AdapterService } from './provider/adapter.service';
import { WorkflowyService } from './provider/workflowy.service';
import { TodoListService } from './provider/todo-list.service';
import { COLORS, COLOR_CONFIG } from './constants/colors';
import { InitialGoalFormComponent } from './components/initial-goal-form/initial-goal-form.component';
import { TaskService } from './provider/task.service';
import { ColorService } from './provider/color.service';
import { InitialGoalViewComponent } from './components/initial-goal-view/initial-goal-view.component';
import { GoalEditorComponent } from './components/goal-editor/goal-editor.component';
import { FurtherGoalsViewComponent } from './components/further-goals-view/further-goals-view.component';
import { TaskPreviewComponent } from './components/task-preview/task-preview.component';
import { GoalPreviewComponent } from './components/goal-preview/goal-preview.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { GoalFormComponent } from './components/goal-form/goal-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectTaskComponent } from './components/select-task/select-task.component';
import { TaskSelectPreviewComponent } from './components/task-select-preview/task-select-preview.component';
import { SelectTaskButtonComponent } from './components/select-task-button/select-task-button.component';
import { ConfigService } from './provider/config.service';


@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    InitialGoalFormComponent,
    InitialGoalViewComponent,
    GoalEditorComponent,
    FurtherGoalsViewComponent,
    TaskPreviewComponent,
    GoalPreviewComponent,
    TaskFormComponent,
    GoalFormComponent,
    SelectTaskComponent,
    TaskSelectPreviewComponent,
    SelectTaskButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
  ],
  providers: [
    GoalService,
    TaskService,
    TodoListService,
    AdapterService,
    WorkflowyService,
    ColorService,
    ConfigService,
    { provide: COLOR_CONFIG, useValue: COLORS }
  ],
  entryComponents: [AppComponent]
})
export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) {
    const todoListElementSelector = 'reg-todo-list';
    const selectTasksElementSelector = 'reg-select-tasks';

    const todoListWebCompoonent = createCustomElement(AppComponent, { injector: this.injector });
    const selectTasksWebComponent = createCustomElement(SelectTaskButtonComponent, { injector: this.injector });

    customElements.define(todoListElementSelector, todoListWebCompoonent);
    customElements.define(selectTasksElementSelector, selectTasksWebComponent);
  }

  ngDoBootstrap() { }
}
