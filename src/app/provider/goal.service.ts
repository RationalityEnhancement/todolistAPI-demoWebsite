import { Injectable } from "@angular/core";

import { Observable, ReplaySubject } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { Goal } from "../interfaces/item";

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
}