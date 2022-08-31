import { Injectable } from '@angular/core';
import { Goal, Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  public addTaskToGoal(task: Item, goal: Goal): Goal {
    const addedTask: Item = {
      ...task,
      workflowyId: `g${goal.code}-t${goal.tasks.length + 1}-${Date.now()}`
    };

    const updatedTasks = goal.tasks.concat(addedTask);

    return { ...goal, tasks: updatedTasks };
  }

  public editTaskOfGoal(editedTask: Item, goal: Goal): Goal {
    const updatedTasks = goal.tasks.map(task =>
      task.workflowyId === editedTask.workflowyId ? editedTask : task
    );

    return { ...goal, tasks: updatedTasks };
  }

  public deleteTaskFromGoal(deletedTask: Item, goal: Goal): Goal {
    const updatedTasks = goal.tasks.filter(task =>
      task.workflowyId !== deletedTask.workflowyId
    );

    return { ...goal, tasks: updatedTasks };
  }

  public updateTasksForGoal(goal: Goal): Goal {
    const updatedTasks = this.handleEverythingElseTask(goal);

    return { ...goal, tasks: updatedTasks }
  }

  private handleEverythingElseTask(goal: Goal): Item[] {
    if (this.estimateEverythingElseTask(goal) > 0) {
      const everythingElseTask = this.createEverythingElseTask(goal);

      return this.updateEverythingElseTask(goal.tasks, everythingElseTask);
    }

    return this.removeEverythingElseTask(goal.tasks);
  }



  private createEverythingElseTask(goal: Goal): Item {
    const name = 'All tasks that are not clearly specified, but necesssary for your goal. It might be a good idea to divide this goal into smaller, more actionable tasks.';
    const estimate = this.estimateEverythingElseTask(goal);
    const deadline = goal.deadline;
    const workflowyId = `g${goal.code}-everything-else-${Date.now()}`;
    
    return {
      name: name,
      time_est: estimate,
      deadline: deadline,
      workflowyId: workflowyId
    };
  }

  private estimateEverythingElseTask(goal: Goal) {
    const goalEstimate = goal.time_est;
    const totalTaskEstimate = this.totalEstimateOfRelevantTasks(goal.tasks);

    return goalEstimate - totalTaskEstimate;
  }

  private totalEstimateOfRelevantTasks(tasks: Item[]) {
    const relevantTasks = this.removeEverythingElseTask(tasks);

    return relevantTasks
      .reduce((estimate, task) => estimate + task.time_est, 0);
  }

  private removeEverythingElseTask(tasks: Item[]) {
    const selector = 'everything-else';

    return tasks.filter(task => !task.workflowyId?.includes(selector));
  }

  private updateEverythingElseTask(tasks: Item[], everythingElseTask: Item) {
    const relevantTasks = this.removeEverythingElseTask(tasks);

    return relevantTasks.concat(everythingElseTask);
  }
}
