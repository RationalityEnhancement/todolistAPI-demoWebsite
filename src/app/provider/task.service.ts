import { Injectable } from '@angular/core';
import { Goal, Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  public addTaskToGoal(task: Item, goal: Goal): Goal {
    const newTask: Item = {
      ...task,
      workflowyId: `g${goal.code}-t${goal.tasks.length + 1}-${Date.now()}`
    };

    goal.tasks.push(newTask);

    return goal;
  }

  public editTaskOfGoal(editedTask: Item, goal: Goal): Goal {
    const updatedTasks =  goal.tasks.map(task => {
      if (task.workflowyId === editedTask.workflowyId) {
        return editedTask;
      }
      return task;
    });

    goal.tasks = updatedTasks;

    return goal;
  }

  public deleteTaskFromGoal(task: Item, goal: Goal): Goal {
    console.log(task, goal)
    const index = goal.tasks.indexOf(task);

    goal.tasks.splice(index, 1);

    return goal;
  }

  public getEverythingElseTask(goal: Goal): Item {
    const everythingElseTask: Item = {
      name: 'All tasks that are not clearly specified, but necesssary for your goal. It might be a good idea to divide this goal into smaller, more actionable tasks.',
      time_est: goal.time_est,
      deadline: goal.deadline,
      workflowyId: `g${goal.code}-everything-else-${Date.now()}`
    };

    return everythingElseTask;
  }

  public updateTasksForGoal(goal: Goal): Goal {
    const tasks = this.getTasksWithUpdatedEverythingElseTask(goal);

    return { ...goal, tasks };
  }

  private getTasksWithUpdatedEverythingElseTask(goal: Goal): Item[] {
    return goal.tasks.map(task => {
      if (task.workflowyId?.includes('everything-else')) {
        task = this.getUpdatedEverythingElseTask(task, goal);
      }

      return task;
    });
  }

  private getUpdatedEverythingElseTask(task: Item, goal: Goal): Item {
    const goalEstimate = goal.time_est;
    const totalTaskEstimate = this.getTotalEstimateOfRelevantTasks(goal.tasks);

    if (goalEstimate > totalTaskEstimate) {
      task.time_est = goalEstimate - totalTaskEstimate;
      task.deadline = goal.deadline;
      task.completed = false;
    } else {
      task.completed = true;
      task.time_est = 0;
    }

    return task;
  }

  private getTotalEstimateOfRelevantTasks(tasks: Item[]): number {
    return tasks
      .filter(task => !task.workflowyId?.includes('everything-else'))
      .reduce((estimate, task) => estimate + task.time_est, 0);
  }

}
