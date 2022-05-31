import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, ReplaySubject } from 'rxjs';
import { first } from 'rxjs/operators';

import { Globals } from "../globals";
import { Goal, outputItem } from "../interfaces/item";

@Injectable()
export class ItemService {

    public goalname_map = {};//add a goalname map
    public goal_map = {}; //add a goalmap for all info

    // private gamifyUrl: string = 'http:///127.0.0.1:6789/api/constant/basic/30/14/inf/0/7000/0/60/t/2/10/tree/u123/getTasksForToday'
    private gamifyUrl: string = 'https://yellow-tree.herokuapp.com/api/greedy/mdp/45/14/inf/0/inf/0/inf/0/no_scaling/true/0/tree/test/getTasksForToday'
    private userKey: string;
    private currentIntentions: string;

    private goals$ = new ReplaySubject<Goal[]>();
    private optimizedGoals$ = new ReplaySubject<outputItem[]>();

    constructor(private http: HttpClient) {
        this.setGoals(Globals.goalList);
     }


    makeProject() {
        let project = [];
        for (let i = 1; i < Globals.goalList.length + 1; i++) {
            var node = {
                id: "g" + i,
                nm: "#CG" + i + "_" + Globals.goalList[i - 1].name + " ==" + Globals.goalList[i - 1].value + " ~~" + Globals.goalList[i - 1].time_est + "h DUE:" + Globals.goalList[i - 1].deadline,
                lm: 0,
                ch: null,
                parentId: "None"
            }
            this.goalname_map[i - 1] = Globals.goalList[i - 1].name;//update a goalname map
            this.goal_map[i - 1] = Globals.goalList[i - 1].name + "/ Value: " + Globals.goalList[i - 1].value + "/ Time Estimation: " + Globals.goalList[i - 1].time_est + "h/ Deadline: " + Globals.goalList[i - 1].deadline; //update a goalmap
            if ('num_children' in Globals.goalList[i - 1] && Globals.goalList[i - 1].num_children > 0) {
                node.ch = [];
                for (let j = 1; j < Globals.goalList[i - 1].num_children + 1; j++) {
                    let td = Globals.goalList[i - 1].tasks[j - 1].today ? " #today" : " #future";
                    var task = {
                        id: "g" + i + "-t" + j,
                        nm: Globals.goalList[i - 1].tasks[j - 1].name + " ~~" + Globals.goalList[i - 1].tasks[j - 1].time_est + "h" + td,
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
    //need to set GoalName_map ?
    public setGoalName_map(goalname_map) {
        this.goalname_map = goalname_map;
    }
    public setGoal_map(goal_map) {
        this.goal_map = goal_map;
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

    public listenToOptimizedGoals(): Observable<outputItem[]> {
        return this.optimizedGoals$.asObservable();
    }

    public requestOptimalTodoList(): Observable<any> {
        const options = this.createRequestOptions();
        const body = this.createRequestBody();

        return this.http.post(this.gamifyUrl, body, options);
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

    private createRequestBody() {
        const projects = this.makeProject();
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