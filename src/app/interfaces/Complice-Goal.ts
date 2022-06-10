import { Item, WorkflowyProject } from "./item";

export interface CompliceGoal {
    _id: string;
    code: string;
    name: string;
    color: string;
    privacy: number;
    oneliner: string;
    tasks: Item[];
    startdate: string;
    enddate: string;
    stats: {
        currentStreak: number;
        maxStreak: number;
        totalOutcomes: number;
        totalPomos: number;
        totalValue: number;
        totalWorktime: number
    }
}

export interface NewCompliceGoal {
    code: string;
    color: string;
    name: string;
    oneliner: string;
    privacy: number;
    tasks?: Item[];
    justCreated: boolean;
    startdate: string;
    enddate: string;
    topPriority: {};
}

export interface RelevantCompliceGoalAttributes {
    _id: string;
    code: string;
    name: string;
    value?: number;
    deadline?: string;
    estimate?: number;
    tasks: Item[];
    color?: string;
    workflowyProject?: WorkflowyProject
}
    