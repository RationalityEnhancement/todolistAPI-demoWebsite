import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, ReplaySubject } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

import { Goal, OptimizedTodo } from "../interfaces/item";
import { WorkflowyService } from "./workflowy.service";
import { GoalService } from "./goal.service";

@Injectable()
export class TodoListService {

    private gamifyUrl: string = 'https://yellow-tree.herokuapp.com/api/greedy/mdp/45/14/inf/0/inf/0/inf/0/no_scaling/false/0/tree/test/getTasksForToday'
    private userKey: string;

    private optimizedTodoList$ = new ReplaySubject<OptimizedTodo[]>(1);

    constructor(
        private http: HttpClient,
        private goalService: GoalService,
        private workflowyService: WorkflowyService
    ) {}

    public setoptimizedTodoList(optimizedTodoList: OptimizedTodo[]) {
        this.optimizedTodoList$.next(optimizedTodoList);
    }
    
    public getoptimizedTodoList(): Observable<OptimizedTodo[]> {
        return this.optimizedTodoList$
            .pipe(
                filter(todoList => !!todoList.length),
                take(1)
            );
    }

    public listenTooptimizedTodoList(): Observable<OptimizedTodo[]> {
        return this.optimizedTodoList$.asObservable();
    }

    public requestOptimalTodoList(): Observable<any> {
        return this.goalService.getGoals()
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