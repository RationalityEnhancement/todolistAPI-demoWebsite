import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, ReplaySubject } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

import { Goal, OptimizedTodo } from "../interfaces/item";
import { WorkflowyService } from "./workflowy.service";

@Injectable()
export class ItemService {

    private gamifyUrl: string = 'https://yellow-tree.herokuapp.com/api/greedy/mdp/45/14/inf/0/inf/0/inf/0/no_scaling/false/0/tree/test/getTasksForToday'
    private userKey: string;

    private goals$ = new ReplaySubject<Goal[]>(1);
    private optimizedTodoList$ = new ReplaySubject<OptimizedTodo[]>(1);

    private addedGoal$ = new ReplaySubject<Goal>();
    private adjustedGoal$ = new ReplaySubject<Goal>();
    private deletedGoal$ = new ReplaySubject<Goal>();

    constructor(
        private http: HttpClient,
        private workflowyService: WorkflowyService
    ) {}

    public setAddedGoal(goal: Goal): void {
        this.addedGoal$.next(goal);
    }

    public setDeletedGoal(goal: Goal): void {
        this.deletedGoal$.next(goal);
    }

    public setAdjustedGoal(goal: Goal): void {
        this.adjustedGoal$.next(goal);
    }

    public setoptimizedTodoList(optimizedTodoList: OptimizedTodo[]) {
        this.optimizedTodoList$.next(optimizedTodoList);
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

    public getoptimizedTodoList(): Observable<OptimizedTodo[]> {
        return this.optimizedTodoList$
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

    public listenTooptimizedTodoList(): Observable<OptimizedTodo[]> {
        return this.optimizedTodoList$.asObservable();
    }

    public requestOptimalTodoList(): Observable<any> {
        return this.getGoals()
            .pipe(
                map(goals => this.makeTodoListRequest(goals)),
                switchMap(request => this.fetchOptimalTodoList(request))
            );
    }

    private makeTodoListRequest(goals: Goal[]) {
        return {
           options: this.createRequestOptions(),
           body: this.createRequestBody(goals),
           url: this.gamifyUrl
        };
    }

    private fetchOptimalTodoList(request) {
        return this.http.post(request.url, request.body, request.options);
    }

    private createRequestOptions() {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return { headers };
    }

    private createRequestBody(goals: Goal[]) {
        const defaultParameters = {
            timezoneOffsetMinutes: 0,
            updated: Date.now(),
            time_frame: 480
        };

        const currentIntentions = this.makeCurrentIntentions();
        const userKey = this.makeUserKey();

        const projects = this.workflowyService.makeWorkflowyProjects(goals);
        const typicalHours = this.workflowyService.makeTypicalHours();
        const todayHours = this.workflowyService.makeTodayHours();

        return {
            ...defaultParameters,
            currentIntentionsList: currentIntentions,
            projects: projects,
            today_hours: todayHours,
            typical_hours: typicalHours,
            userkey: userKey
        };
    }

    private makeUserKey() {
        return this.userKey || '__testss__';
    }

    private makeCurrentIntentions() {
        return [];
    }
}