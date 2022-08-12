import { Injectable } from "@angular/core";

import { Observable, ReplaySubject } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

import { Goal, Item } from "../interfaces/item";
import { ColorService } from "./color.service";
import { TaskService } from "./task.service";

@Injectable()
export class GoalService {

    private goals$ = new ReplaySubject<Goal[]>(1);

    private addedGoal$ = new ReplaySubject<Goal>();
    private adjustedGoal$ = new ReplaySubject<Goal>();
    private deletedGoal$ = new ReplaySubject<Goal>();
    private completedGoal$ = new ReplaySubject<Goal>();

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

    public setCompletedGoal(goal: Goal): void {
        this.completedGoal$.next(goal);
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
                take(1)
            );
    }

    public listenToAddedGoal(): Observable<Goal> {
        return this.addedGoal$.asObservable();
    }

    public listenToDeletedGoal(): Observable<Goal> {
        return this.deletedGoal$.asObservable();
    }

    public listenToCompletedGoal(): Observable<Goal> {
        return this.completedGoal$.asObservable();
    }

    public listenToAdjustedGoal(): Observable<Goal> {
        return this.adjustedGoal$.asObservable();
    }

    public listenToGoals(): Observable<Goal[]> {
        return this.goals$.asObservable();
    }

    public addGoal(goal: Goal) {
        return this.getGoals()
            .pipe(
                map(goals => this.createNewGoal(goal, goals)),
                tap(({ addedGoal, updatedGoals }) => {
                    this.setAddedGoal(addedGoal);
                    this.setGoals(updatedGoals);
                })
            );
    }

    public editGoal(goal: Goal) {
        const updatedGoal = this.taskService.updateTasksForGoal(goal);

        return this.getGoals()
            .pipe(
                map(goals => this.updateGoals(updatedGoal, goals)),
                tap(({ adjustedGoal, updatedGoals }) => {
                    this.setAdjustedGoal(adjustedGoal);
                    this.setGoals(updatedGoals);
                })
            );
    }

    public completeGoal(completedGoal: Goal) {
        return this.getGoals()
            .pipe(
                map(goals => this.removeGoal(completedGoal, goals)),
                tap(updatedGoals => {
                    this.setCompletedGoal(completedGoal);
                    this.setGoals(updatedGoals);
                })
            );
    }

    public deleteGoal(deletedGoal: Goal) {
        return this.getGoals()
            .pipe(
                map(goals => this.removeGoal(deletedGoal, goals)),
                tap((updatedGoals) => {
                    this.setDeletedGoal(deletedGoal);
                    this.setGoals(updatedGoals);
                })
            );
    }

    public addTask(task: Item, goal: Goal) {
        const updatedGoal = this.taskService.addTaskToGoal(task, goal);
        return this.editGoal(updatedGoal);
    }

    public editTask(task: Item, goal: Goal) {
        const updatedGoal = this.taskService.editTaskOfGoal(task, goal);
        return this.editGoal(updatedGoal);
    }

    public deleteTask(task: Item, goal: Goal) {
        const updatedGoal = this.taskService.deleteTaskFromGoal(task, goal);
        return this.editGoal(updatedGoal);
    }

    private updateGoals(updatedGoal: Goal, goals: Goal[]) {
        const updatedGoals = goals.map(goal =>
            goal.code === updatedGoal.code ? updatedGoal : goal
        );

        return { adjustedGoal: updatedGoal, updatedGoals: updatedGoals };
    }

    private createNewGoal(goal: Goal, goals: Goal[]) {
        const color = this.colorService.getGoalColor(goals);
        const code = `${goals.length + 1}`;

        const newGoal: Goal = {
            ...goal,
            code: code,
            color: color,
            tasks: []
        };

        const everythingElseTask = this.taskService.getEverythingElseTask(newGoal);

        newGoal.tasks.push(everythingElseTask);

        const updatedGoals = goals.concat(newGoal);

        return { addedGoal: newGoal, updatedGoals: updatedGoals };
    }

    private removeGoal(deletedGoal: Goal, goals: Goal[]) {
        const updatedGoals = goals.filter(goal => goal.code !== deletedGoal.code);
        const renumberedGoals = this.renumberGoals(updatedGoals);

        return renumberedGoals;
    }

    private renumberGoals(goals): Goal[] {
        return goals.map((goal, index) => ({
            ...goal,
            code: `${index + 1}`
        }));
    }
}