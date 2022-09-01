import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, ReplaySubject } from 'rxjs';
import { filter, map, switchMap, take, withLatestFrom } from 'rxjs/operators';

import { Goal, OptimizedTodo } from "../interfaces/item";
import { WorkflowyService } from "./workflowy.service";
import { GoalService } from "./goal.service";
import { Configuration } from "../interfaces/Configuration";
import { ConfigService } from "./config.service";

@Injectable()
export class TodoListService {

    private optimizedTodoList$ = new ReplaySubject<OptimizedTodo[]>(1);

    constructor(
        private http: HttpClient,
        private goalService: GoalService,
        private workflowyService: WorkflowyService,
        private configService: ConfigService
    ) { }

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
                withLatestFrom(this.configService.getConfiguration()),
                map(([goals, configuration]) => this.makeTodoListRequest(goals, configuration)),
                switchMap(request => this.fetchOptimalTodoList(request))
            );
    }

    private makeTodoListRequest(goals: Goal[], configuration: Configuration) {
        return {
            options: this.createRequestOptions(),
            body: this.createRequestBody(goals, configuration),
            url: configuration.apiUrl
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

    private createRequestBody(goals: Goal[], configuration: Configuration) {
        const now = new Date();

        const ymd = now.toISOString().substring(0, 10);
        const hourOfYmd = now.getHours() + now.getMinutes() / 60;
        const timezoneOffsetMinutes = now.getTimezoneOffset();
        const updated = now.getTime();

        const currentIntentions = this.makeCurrentIntentions();
        const projects = this.workflowyService.makeWorkflowyProjects(goals);
        const typicalHours = this.workflowyService.makeTypicalHours();
        const todayHours = this.workflowyService.makeTodayHours();

        const userkey = configuration.userkey;

        return {
            ymd: ymd,
            hourOfYmd: hourOfYmd,
            timezoneOffsetMinutes: timezoneOffsetMinutes,
            updated: updated,
            userkey: userkey,
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