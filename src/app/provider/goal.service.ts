import { Inject, Injectable } from "@angular/core";

import { Observable, ReplaySubject } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { ColorConfig, COLOR_CONFIG } from "../constants/colors";

import { Goal, Item } from "../interfaces/item";
import { TaskService } from "./task.service";

@Injectable()
export class GoalService {

    private goals$ = new ReplaySubject<Goal[]>(1);

    private addedGoal$ = new ReplaySubject<Goal>();
    private adjustedGoal$ = new ReplaySubject<Goal>();
    private deletedGoal$ = new ReplaySubject<Goal>();

    constructor(
        @Inject(COLOR_CONFIG)
        private colors: ColorConfig,
        private taskService: TaskService
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
        const everythinElseTask = this.taskService.getEverythingElseTask(goal);
        const code = `${goals.length + 1}`;

        const newGoal: Goal = {
            ...goal,
            code: code,
            color: color,
            tasks: [everythinElseTask]
        };

        const updatedGoals = goals.concat(newGoal);

        this.setAddedGoal(newGoal);
        this.setGoals(updatedGoals);
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

    public deleteGoal(deletedGoal: Goal, goals: Goal[]): void {
        const updatedGoals = goals.filter(goal => goal.code !== deletedGoal.code);
        const renumberedGoals = this.renumberGoals(updatedGoals);

        this.setGoals(renumberedGoals);
        this.setDeletedGoal(deletedGoal);
    }

    public addTask(task: Item, goal: Goal) {
        const updatedGoal = this.taskService.addTaskToGoal(task, goal);
        this.editGoal(updatedGoal);
    }

    public deleteTask(task, goal: Goal) {
        const updatedGoal = this.taskService.deleteTaskFromGoal(task, goal);

        this.editGoal(updatedGoal);
    }

    private updateGoal(updatedGoal: Goal, goals: Goal[]) {
        return goals.map(goal =>
            goal.code === updatedGoal.code ? updatedGoal : goal
        );
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

    private renumberGoals(goals): Goal[] {
        const renumberedGoals = goals.map((goal, index) => ({
            ...goal,
            code: `${index + 1}`
        }));

        return renumberedGoals;
    }
}