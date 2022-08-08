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
import { InitialGoalFormComponent } from './components/initial-goal-form/initial-goal-form.component';
import { TaskService } from './provider/task.service';
import { ColorService } from './provider/color.service';
import { InitialGoalViewComponent } from './components/initial-goal-view/initial-goal-view.component';
import { GoalEditorComponent } from './components/goal-editor/goal-editor.component';
import { GoalEditorInstructionsComponent } from './components/goal-editor-instructions/goal-editor-instructions.component';
import { FurtherGoalsViewComponent } from './components/further-goals-view/further-goals-view.component';
import { TaskPreviewComponent } from './components/task-preview/task-preview.component';
import { GoalPreviewComponent } from './components/goal-preview/goal-preview.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { GoalFormComponent } from './components/goal-form/goal-form.component'


@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    InitialGoalFormComponent,
    InitialGoalViewComponent,
    GoalEditorComponent,
    GoalEditorInstructionsComponent,
    FurtherGoalsViewComponent,
    TaskPreviewComponent,
    GoalPreviewComponent,
    TaskFormComponent,
    GoalFormComponent
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
