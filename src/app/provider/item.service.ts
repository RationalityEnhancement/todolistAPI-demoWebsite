import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { Globals } from "../globals";

@Injectable() 
export class ItemService {
    // private gamifyUrl: string = 'http:///127.0.0.1:6789/api/constant/basic/30/14/inf/0/7000/0/60/t/2/10/tree/u123/getTasksForToday'
    private gamifyUrl: string = 'https://aqueous-hollows-34193.herokuapp.com/api/smdp/mdp/30/14/inf/0/inf/0/inf/false/0/max/0.999999/0.1/2/1.39/0.0001/0.01/tree/__test__/getTasksForToday'
    constructor(private http: HttpClient) {}

    makeProject() {
        console.log("In makeProject");
        let project = [];
        for (let i = 1; i < Globals.goalList.length+1; i++){
            console.log(i);
            var node = {
                id: "g"+ i,
                nm: "#CG" + i + "_" + Globals.goalList[i-1].name + " ==" + Globals.goalList[i-1].value + " ~~" + Globals.goalList[i-1].time_est + "h DUE:" + Globals.goalList[i-1].deadline,
                lm: 0,
                ch: null,
                parentId: "None"
              }
            
            if ('num_children' in Globals.goalList[i-1] && Globals.goalList[i-1].num_children > 0){
                node.ch = [];
                for (let j = 1; j < Globals.goalList[i-1].num_children+1; j++){
                    let td = Globals.goalList[i-1].tasks[j-1].today ? " #today": " #future";
                    var task = {
                        id: "g"+ i + "-t" + j,
                        nm: Globals.goalList[i-1].tasks[j-1].name + " ~~" + Globals.goalList[i-1].tasks[j-1].time_est + "h" + td,
                        lm: 0,
                        parentId: node.id
                      }
                    node.ch.push(task);
                }
            }
            console.log("NODE", node);
            project.push(node);
            console.log("Project");
            console.log(project);
            console.log("String Project");
            JSON.stringify(project);
            console.log(project);
 
        }
        return project;
    }

    make_typical_hours() {
        let list = [];
        let obj = {
            id: "_",
            nm: "#HOURS_TYPICAL ==12",
            lm: 0
        };
        list.push(obj);
        JSON.stringify(list)
        console.log('Typ Hours', list);
        return list;
    }

    make_today_hours() {
        let list = [];
        let obj = {
            id: "_",
            nm: "#HOURS_TODAY ==12",
            lm: 0
        };
        list.push(obj);
        JSON.stringify(list)
        console.log('Today Hours', list);
        return list;
    }
    getOptimalList(): Observable<any> {
        let list: {} = {}

        // Globals.taskList.forEach(li => {
        //     list[li.name.toLowerCase()] = li.amount
        // })

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        })

        const options = {
            headers,
        }
        console.log("Making List to be sent to API");
        let project = this.makeProject();
        console.log("Returned from makeProject");
        let typical_hours = this.make_typical_hours();
        let today_hours = this.make_today_hours();
        console.log("Make Today Hours");
        console.log(today_hours);
        let body = {
            currentIntentionsList: [],
            projects: project,
            timezoneOffsetMinutes: 0,
            today_hours: today_hours, 
            typical_hours: typical_hours,
            updated: 0,
            userkey: '__test__',
            bias: 683.2111000706025,
            scale: 1.1,
            time_frame: 480
        };
        console.log("Body of POST");
        console.log(body);
        return this.http.post(this.gamifyUrl, body, options);

    }
}