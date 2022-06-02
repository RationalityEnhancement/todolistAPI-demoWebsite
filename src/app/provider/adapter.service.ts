import { Injectable } from "@angular/core";
import { CompliceGoal } from "../interfaces/Complice-Goal";
import { Goal } from "../interfaces/item";

@Injectable()
export class AdapterService {

    constructor() { }

    public parseGoals<T>(input: string): T[] {
        return JSON.parse(input);
    }

    public toRegGoals(goals: CompliceGoal[]): Goal[] {
        return goals.map(goal => this.toRegGoal(goal)); 
    }

    public toCompliceGoals(goals: Goal[]): CompliceGoal[] {
        return goals.map(goal => this.toCompliceGoal(goal));
    }

    private toCompliceGoal(goal: Goal): CompliceGoal {
        const compliceProperties = {
            "code": "5",
            "color": "#1f0044",
            "name": "a new goal",
            "oneliner": "",
            "privacy": 20,
            "justCreated": true,
            "startdate": "2022-06-01",
            "enddate": "2061-11-03",
            "$$hashKey": "object:91",
            "topPriority": {}
        }

        const regGoalProperties = {
            _id: goal.id,
            code: goal.code,
            name: goal.name,
            enddate: goal.deadline
        }

        return { ...compliceProperties, ...regGoalProperties };
    }

    private toRegGoal(compliceGoal: CompliceGoal): Goal {
        return {
            id: compliceGoal._id,
            code: compliceGoal.code,
            name: compliceGoal.name,
            deadline: compliceGoal.enddate,
            color: compliceGoal.color
        };
    }
}