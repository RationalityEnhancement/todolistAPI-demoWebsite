import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, ReplaySubject } from 'rxjs';
import { filter, map, switchMap, take, withLatestFrom } from 'rxjs/operators';

import { Goal, OptimizedTodo } from "../interfaces/item";
import { WorkflowyService } from "./workflowy.service";
import { GoalService } from "./goal.service";
import { ApiConfiguration } from "../interfaces/Api-Configuration";

@Injectable()
export class TodoListService {

    private apiConfiguration$ = new ReplaySubject<ApiConfiguration>(1);
    private optimizedTodoList$ = new ReplaySubject<OptimizedTodo[]>(1);

    constructor(
        private http: HttpClient,
        private goalService: GoalService,
        private workflowyService: WorkflowyService
    ) {}

    public setoptimizedTodoList(optimizedTodoList: OptimizedTodo[]) {
        this.optimizedTodoList$.next(optimizedTodoList);
    }

    public setApiConfiguration(apiConfiguration: ApiConfiguration) {
        this.apiConfiguration$.next(apiConfiguration);
    }
    
    public getoptimizedTodoList(): Observable<OptimizedTodo[]> {
        return this.optimizedTodoList$
            .pipe(
                filter(todoList => !!todoList.length),
                take(1)
            );
    }
        
    public getApiConfiguration(): Observable<ApiConfiguration> {
        return this.apiConfiguration$.asObservable();
    }

    public listenTooptimizedTodoList(): Observable<OptimizedTodo[]> {
        return this.optimizedTodoList$.asObservable();
    }

    public requestOptimalTodoList(): Observable<any> {
        return this.goalService.getGoals()
            .pipe(
                withLatestFrom(this.getApiConfiguration()),
                map(([goals, apiConfiguration]) => this.makeTodoListRequest(goals, apiConfiguration)),
                switchMap(request => this.fetchOptimalTodoList(request))
            );
    }

    private makeTodoListRequest(goals: Goal[], apiConfiguration: ApiConfiguration) {
        return {
           options: this.createRequestOptions(),
           body: this.createRequestBody(goals, apiConfiguration),
           url: apiConfiguration.apiUrl
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

    private createRequestBody(goals: Goal[], apiConfiguration: ApiConfiguration) {
        const defaultParameters = {
            ymd: apiConfiguration.ymd,
            hourOfYmd: apiConfiguration.hourOfYmd,
            timezoneOffsetMinutes: apiConfiguration.timezoneOffsetMinutes || 0,
            userkey: apiConfiguration.userkey,
            updated: Date.now()
        };

        const currentIntentions = this.makeCurrentIntentions();
        const projects = this.workflowyService.makeWorkflowyProjects(goals);
        const typicalHours = this.workflowyService.makeTypicalHours();
        const todayHours = this.workflowyService.makeTodayHours();

        return {
            ...defaultParameters,
            currentIntentionsList: currentIntentions,
            projects: projects,
            today_hours: todayHours,
            typical_hours: typicalHours
        };
    }

    private makeCurrentIntentions() {
        return [];
    }
}