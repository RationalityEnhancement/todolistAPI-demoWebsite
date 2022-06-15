import { Injectable } from "@angular/core";
import { Goal, Item } from "../interfaces/item";

@Injectable()
export class WorkflowyService {

    public makeWorkflowyProjects(goals: Goal[]) {
        return goals.map(goal => this.makeWorkflowyProject(goal));
    }

    public makeWorkflowyProject(goal: Goal) {
        const goalNode = this.makeWorkflowyGoal(goal);
        const goalTasks = !!goal.tasks.length ? this.makeWorkflowyTasks(goal.tasks, goal) : [this.makeEverythingElseTask(goal, 0)];

        return { ...goalNode, ch: goalTasks };
    }

    public makeTypicalHours() {
        const value = "#HOURS_TYPICAL ==8";

        return this.makeHoursNode(value);
    }

    public makeTodayHours() {
        const value = "#HOURS_TODAY ==8";

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

    private makeWorkflowyTasks(tasks: Item[], goal: Goal) {
        const goalEstimate = goal.time_est;
        const totalTasksEstimate = tasks.reduce((estimate, task) => estimate + task.time_est, 0);

        const workflowyTasks = tasks.map((task) =>
            this.makeWorkflowyTask(task, goal.code)
        );

        if (goalEstimate > totalTasksEstimate) {
            const everyThingElseTask = this.makeEverythingElseTask(goal, totalTasksEstimate);

            workflowyTasks.push(everyThingElseTask);
        }

        return workflowyTasks;
    }

    private makeWorkflowyTask(task: Item, goalId: string) {
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

    private makeEverythingElseTask(goal: Goal, totalTasksEstimate: number) {
        const everyThingElseEstimate = goal.time_est - totalTasksEstimate;

        const everyThingElseTask = {
            id: 'everything-else',
            nm: `All tasks that are not clearly specified, but necesssary for your goal. (It might be a good idea to divide this goal into smaller, more actionable tasks) ~~${everyThingElseEstimate}h`,
            lm: 0,
            parentId: goal.code
        };

        return everyThingElseTask;
    }

    private makeTaskName(task: Item) {
        const name = task.name;
        const estimate = `~~${task.time_est}h`;
        const today = task.today ? '#today' : '';
        const deadline = task.deadline ? `DUE:${task.deadline}` : '';

        return `${name} ${estimate} ${deadline} ${today}`;
    }
}