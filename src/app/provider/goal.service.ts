import { Injectable } from "@angular/core";

import { Observable, ReplaySubject } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { Goal, Item } from "../interfaces/item";
import { ColorService } from "./color.service";
import { TaskService } from "./task.service";

@Injectable()
export class GoalService {

    private goals$ = new ReplaySubject<Goal[]>(1);

    private addedGoal$ = new ReplaySubject<Goal>();
    private adjustedGoal$ = new ReplaySubject<Goal>();
    private deletedGoal$ = new ReplaySubject<Goal>();

    constructor(
        private taskService: TaskService,
        private colorService: ColorService
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

    public addGoal(goal: Goal): void {
        this.getGoals()
            .pipe(
                map(goals => this.createNewGoal(goal, goals)),
            ).subscribe(([newGoal, goals]) => {
                this.setAddedGoal(newGoal);
                this.setGoals(goals.concat(newGoal));
            });
    }

    public editGoal(goal: Goal): void {
        const updatedGoal = this.taskService.updateTasksForGoal(goal);

        this.getGoals()
            .pipe(
                map(goals => this.updateGoal(updatedGoal, goals))
            ).subscribe(updatedGoals => {
                this.setAdjustedGoal(updatedGoal);
                this.setGoals(updatedGoals);
            });
    }

    public deleteGoal(deletedGoal: Goal): void {
        this.getGoals()
            .pipe(
                map(goals => this.removeGoal(deletedGoal, goals))
            ).subscribe(([deletedGoal, updatedGoals]) => {
                this.setDeletedGoal(deletedGoal);
                this.setGoals(updatedGoals);
            });
    }

    public addTask(task: Item, goal: Goal) {
        const updatedGoal = this.taskService.addTaskToGoal(task, goal);
        this.editGoal(updatedGoal);
    }

    public deleteTask(task, goal: Goal) {
        const updatedGoal = this.taskService.deleteTaskFromGoal(task, goal);
        this.editGoal(updatedGoal);
    }

    private updateGoal(updatedGoal: Goal, goals: Goal[]): Goal[] {
        return goals.map(goal =>
            goal.code === updatedGoal.code ? updatedGoal : goal
        );
    }

    private createNewGoal(goal: Goal, goals: Goal[]): [Goal, Goal[]] {
        const color = this.colorService.getGoalColor(goals);
        const everythinElseTask = this.taskService.getEverythingElseTask(goal);
        const code = `${goals.length + 1}`;

        const newGoal: Goal = {
            ...goal,
            code: code,
            color: color,
            tasks: [everythinElseTask]
        };

        return [newGoal, goals];
    }

    private removeGoal(deletedGoal: Goal, goals: Goal[]): [Goal, Goal[]] {
        const updatedGoals = goals.filter(goal => goal.code !== deletedGoal.code);
        const renumberedGoals = this.renumberGoals(updatedGoals);

        return [deletedGoal, renumberedGoals];
    }

    private renumberGoals(goals): Goal[] {
        return goals.map((goal, index) => ({
            ...goal,
            code: `${index + 1}`
        }));
    }
}