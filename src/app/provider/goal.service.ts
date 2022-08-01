import { Inject, Injectable } from "@angular/core";

import { from, Observable, ReplaySubject } from 'rxjs';
import { filter, map, mergeMap, take, toArray } from 'rxjs/operators';
import { ColorConfig, COLOR_CONFIG } from "../constants/colors";

import { Goal, Item } from "../interfaces/item";

@Injectable()
export class GoalService {

    private goals$ = new ReplaySubject<Goal[]>(1);

    private addedGoal$ = new ReplaySubject<Goal>();
    private adjustedGoal$ = new ReplaySubject<Goal>();
    private deletedGoal$ = new ReplaySubject<Goal>();

    constructor(
        @Inject(COLOR_CONFIG)
        private colors: ColorConfig,
    ) { }

    public setAddedGoal(goal: Goal): void {
        this.addedGoal$.next(goal);
    }

    public setDeletedGoal(goal: Goal): void {
        this.deletedGoal$.next(goal);
    }

    public setAdjustedGoal(goal: Goal): void {
        this.adjustedGoal$.next(goal);
    }

    public setGoals(goals: Goal[]) {
        this.goals$.next(goals);
    }

    public getGoals(): Observable<Goal[]> {
        return this.goals$
            .pipe(
                filter(goals => !!goals.length),
                take(1)
            );
    }

    public listenToAddedGoal(): Observable<Goal> {
        return this.addedGoal$.asObservable();
    }

    public listenToDeletedGoal(): Observable<Goal> {
        return this.deletedGoal$.asObservable();
    }

    public listenToAdjustedGoal(): Observable<Goal> {
        return this.adjustedGoal$.asObservable();
    }

    public listenToGoals(): Observable<Goal[]> {
        return this.goals$.asObservable();
    }

    public addGoal(goal: Goal, goals: Goal[]): void {
        const color = this.getColor(goals);
        const everythinElseTask = this.getEverythingElseTask(goal);
        const code = `${goals.length + 1}`;

        const newGoal: Goal = {
            ...goal,
            code: code,
            color: color,
            tasks: [everythinElseTask]
        };

        this.setAddedGoal(newGoal);
        this.setGoals(goals.concat(newGoal));
    }

    public editGoal(goal: Goal): void {
        const updatedGoal = this.getGoalWithUpdatedTasks(goal);

        this.getGoals()
            .pipe(
                mergeMap(goals => from(goals)),
                map(goal => goal.code === updatedGoal.code ? updatedGoal : goal),
                toArray()
            ).subscribe(updatedGoals => {
                this.setAdjustedGoal(updatedGoal);
                this.setGoals(updatedGoals);
            });
    }

    public deleteGoal(goal: Goal, goals: Goal[]): void {
        const index = goals.indexOf(goal);
        goals.splice(index, 1);

        const renumberedGoals = this.renumberGoals(goals);

        this.setGoals(renumberedGoals);
        this.setDeletedGoal(goal);
    }

    public addTask(task: Item, goal: Goal) {
        const newTask: Item = {
            ...task,
            workflowyId: `g${goal.code}-t${goal.tasks.length + 1}-${Date.now()}`
          };
      
          goal.tasks.push(newTask);
          this.editGoal(goal);
    }

    public deleteTask(task, goal: Goal) {
        const index = goal.tasks.indexOf(task);

        goal.tasks.splice(index, 1);
    
        this.editGoal(goal);
    }

    private getColor(goals: Goal[]): string {
        const alreadyUsedColors = goals.map(goal => goal.color);
        const availableColors = this.colors.filter(color => !alreadyUsedColors.includes(color));

        const randomColor = availableColors.length ? this.chooseRandomColor(availableColors) : '#8e44ad';

        return randomColor;
    }

    private chooseRandomColor(colors: string[]) {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    private getEverythingElseTask(goal: Goal): Item {
        const everythingElseTask: Item = {
            name: 'All tasks that are not clearly specified, but necesssary for your goal. It might be a good idea to divide this goal into smaller, more actionable tasks.',
            time_est: goal.time_est,
            deadline: goal.deadline,
            workflowyId: `g${goal.code}-everything-else-${Date.now()}`
        };

        return everythingElseTask;
    }

    private getGoalWithUpdatedTasks(goal: Goal): Goal {
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

    private getTotalEstimateOfRelevantTasks(tasks: Item[]) {
        return tasks
            .filter(task => !task.workflowyId?.includes('everything-else'))
            .reduce((estimate, task) => estimate + task.time_est, 0);
    }


    private renumberGoals(goals): Goal[] {
        const renumberedGoals = goals.map((goal, index) => ({
            ...goal,
            code: `${index + 1}`
        }));

        return renumberedGoals;
    }
}