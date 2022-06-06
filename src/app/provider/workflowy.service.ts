import { Injectable } from "@angular/core";

import { Goal, Item } from "../interfaces/item";

@Injectable()
export class WorkflowyService {

    public makeWorkflowyProjects(goals: Goal[]) {
        return goals.map(goal => this.makeWorkflowyProject(goal));
    }

    public makeTypicalHours() {
        const value = "#HOURS_TYPICAL ==10000";

        return this.makeHoursNode(value);
    }

    public makeTodayHours() {
        const value = "#HOURS_TODAY ==10000";

        return this.makeHoursNode(value);
    }

    private makeHoursNode(value: string) {
        return [
            {
                id: "_",
                nm: value,
                lm: 0
            }
        ];
    }

    private makeWorkflowyProject(goal: Goal) {
        const goalNode = this.makeWorkflowyGoal(goal);
        const goalTasks = this.makeWorkflowyTasks(goal.tasks, goal.code);
        
        return { ...goalNode, ch: goalTasks };
    }

    private makeWorkflowyGoal(goal: Goal) {
        const goalId = this.makeGoalId(goal);
        const goalName = this.makeGoalName(goal);

        const lastModified = 0;
        const children = null;
        const parentId = 'None';

        return {
            id: goalId,
            nm: goalName,
            lm: lastModified,
            ch: children,
            parentId: parentId
        };
    }

    private makeGoalId(goal: Goal) {
        return `g${goal.code}`;
    }

    private makeGoalName(goal: Goal) {
        return `#CG${goal.code}_${goal.name} ==${goal.value} DUE:${goal.deadline}`;
    }

    private makeWorkflowyTasks(tasks: Item[], parentId: string) {
        return tasks.map((task) => 
            this.makeWorkflowyTask(task, parentId)
        );
    }

    private makeWorkflowyTask(task: Item, goalId: string){
        const taskId = task.workflowyId;
        const taskName = this.makeTaskName(task);
        const lastModified = 0;
        const parentId = goalId;
        const completed = Date.now();

        const baseTask = {
            id: taskId,
            nm: taskName,
            lm: lastModified,
            parentId: parentId
        };

        const completeTask = {
            ...baseTask,
            cp: completed
        };

        return task.completed || task.scheduled ? completeTask : baseTask;
    }

    private makeTaskName(task: Item) {
        const today = task.today ? '#today' : '';

        return `${task.name}~~${task.time_est}h ${today}`;
    }
}