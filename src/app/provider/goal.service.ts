import { Injectable } from "@angular/core";

import { from, Observable, ReplaySubject } from 'rxjs';
import { filter, map, mergeMap, take, toArray } from 'rxjs/operators';

import { Goal, Item } from "../interfaces/item";

@Injectable()
export class GoalService {

    private goals$ = new ReplaySubject<Goal[]>(1);

    private addedGoal$ = new ReplaySubject<Goal>();
    private adjustedGoal$ = new ReplaySubject<Goal>();
    private deletedGoal$ = new ReplaySubject<Goal>();

    constructor() { }

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
        }

        return task;
    }

    private getTotalEstimateOfRelevantTasks(tasks: Item[]) {
        return tasks
            .filter(task => !task.workflowyId?.includes('everything-else'))
            .reduce((estimate, task) => estimate + task.time_est, 0);
    }
}