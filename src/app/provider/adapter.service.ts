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

    public toCompliceGoal(goal: Goal) {
        // return {
        //     _id: string;
        //     code: string;
        //     name: string;
        //     color: string;
        //     privacy: number;
        //     oneliner: string;
        //     startdate: string;
        //     enddate: string;
        //     stats: {
        //         currentStreak: number;
        //         maxStreak: number;
        //         totalOutcomes: number;
        //         totalPomos: number;
        //         totalValue: number;
        //         totalWorktime: number;
        //     }
        // }
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