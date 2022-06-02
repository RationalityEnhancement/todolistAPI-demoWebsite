import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, ReplaySubject } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

import { Globals } from "../globals";
import { Goal, outputItem } from "../interfaces/item";

@Injectable()
export class ItemService {

    // private gamifyUrl: string = 'http:///127.0.0.1:6789/api/constant/basic/30/14/inf/0/7000/0/60/t/2/10/tree/u123/getTasksForToday'
    private gamifyUrl: string = 'https://yellow-tree.herokuapp.com/api/greedy/mdp/45/14/inf/0/inf/0/inf/0/no_scaling/true/0/tree/test/getTasksForToday'
    private userKey: string;
    private currentIntentions: string;

    private goals$ = new ReplaySubject<Goal[]>();
    private optimizedGoals$ = new ReplaySubject<outputItem[]>();

    constructor(private http: HttpClient) {
        this.setGoals(Globals.goalList);
     }


    makeProject(goals: Goal[]) {
        let project = [];
        for (let i = 1; i < goals.length + 1; i++) {
            var node = {
                id: "g" + i,
                nm: "#CG" + i + "_" + goals[i - 1].name + " ==" + goals[i - 1].value + " ~~" + goals[i - 1].time_est + "h DUE:" + goals[i - 1].deadline,
                lm: 0,
                ch: null,
                parentId: "None"
            }
            if ('num_children' in goals[i - 1] && goals[i - 1].num_children > 0) {
                node.ch = [];
                for (let j = 1; j < goals[i - 1].num_children + 1; j++) {
                    let td = goals[i - 1].tasks[j - 1].today ? " #today" : " #future";
                    var task = {
                        id: "g" + i + "-t" + j,
                        nm: goals[i - 1].tasks[j - 1].name + " ~~" + goals[i - 1].tasks[j - 1].time_est + "h" + td,
                        lm: 0,
                        parentId: node.id
                    }
                    node.ch.push(task);
                }
            }

            project.push(node);
            JSON.stringify(project);
        }
        return project;
    }
    public setOptimizedGoals(optimizedGoals: outputItem[]) {
        this.optimizedGoals$.next(optimizedGoals);
    }

    public setGoals(goals: Goal[]) {
        this.goals$.next(goals);
    }

    public getGoals(): Observable<Goal[]> {
        return this.goals$
        .pipe(
            first()
        );
    }

    public getOptimizedGoals(): Observable<outputItem[]> {
        return this.optimizedGoals$
            .pipe(
                first()
            );
    }

    public listenToGoals(): Observable<Goal[]> {
        return this.goals$.asObservable();
    }

    public listenToOptimizedGoals(): Observable<outputItem[]> {
        return this.optimizedGoals$.asObservable();
    }

    public requestOptimalTodoList(): Observable<any> {
        return this.getGoals()
            .pipe(
                map(goals => this.makeTodoListRequest(goals)),
                switchMap(request => this.http.post(request.url, request.body, request.options))
            );
    }

    private makeTodoListRequest(goals: Goal[]) {
        return {
           options: this.createRequestOptions(),
           body: this.createRequestBody(goals),
           url: this.gamifyUrl
        };
    }

    private makeUserKey() {
        return this.userKey || '__test__';
    }

    private makeCurrentIntentions() {
        return this.currentIntentions || [];
    }

    private makeTypicalHours() {
        const value = "#HOURS_TYPICAL ==10000";

        return this.makeHoursNode(value);
    }

    private makeTodayHours() {
        const value = "#HOURS_TODAY ==10000";

        return this.makeHoursNode(value);
    }

    private makeHoursNode(value: string) {
        const hourNode = [
            {
                id: "_",
                nm: value,
                lm: 0
            }
        ];

        return hourNode;
    }

    private createRequestOptions() {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        })

        return { headers };
    }

    private createRequestBody(goals: Goal[]) {
        const projects = this.makeProject(goals);
        const typicalHours = this.makeTypicalHours();
        const todayHours = this.makeTodayHours();
        const currentIntentions = this.makeCurrentIntentions();
        const userKey = this.makeUserKey();

        const defaultParameters = {
            timezoneOffsetMinutes: 0,
            updated: 0,
            time_frame: 480
        };

        return {
            ...defaultParameters,
            currentIntentionsList: currentIntentions,
            projects: projects,
            today_hours: todayHours,
            typical_hours: typicalHours,
            userkey: userKey
        };
    }
}