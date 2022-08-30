import { Injectable } from "@angular/core";
import { NewCompliceGoal, RelevantCompliceGoalAttributes } from "../interfaces/Complice-Goal";
import { Goal, OptimizedTodo } from "../interfaces/item";

@Injectable()
export class AdapterService {

    constructor() { }

    public parseEntities<T>(input: string): T[] {
        return this.parseEntity<T[]>(input);
    }

    public parseEntity<T>(input: string): T {
        return JSON.parse(input);
    }

    public toRegGoals(goals: RelevantCompliceGoalAttributes[]): Goal[] {
        return goals.map(goal => this.toRelevantRegGoalAttributes(goal));
    }

    public toCompliceGoals(goals: Goal[]): RelevantCompliceGoalAttributes[] {
        return goals.map(goal => this.toRelevantCompliceGoalAttributes(goal));
    }

    public toRelevantCompliceGoalAttributes(goal: Goal): RelevantCompliceGoalAttributes {
        return {
            _id: goal.id,
            name: goal.name,
            code: goal.code,
            value: goal.value,
            estimate: goal.time_est,
            deadline: goal.deadline,
            tasks: goal.tasks,
            color: goal.color
        };
    }

    public toRelevantRegGoalAttributes(compliceGoal: RelevantCompliceGoalAttributes): Goal {
        return {
            id: compliceGoal._id,
            name: compliceGoal.name,
            code: compliceGoal.code,
            value: compliceGoal.value,
            time_est: compliceGoal.estimate,
            deadline: compliceGoal.deadline,
            tasks: compliceGoal.tasks,
            color: compliceGoal.color
        };
    }

    public toNewCompliceGoal(goal: Goal): NewCompliceGoal {
        const defaultCompliceAttributes = {
            oneliner: "",
            privacy: 10,
            justCreated: true,
            startdate: new Date().toISOString().substring(0, 10),
            enddate: "2055-01-01",
            topPriority: {}
        };

        const relevantCompliceAttributes = this.toRelevantCompliceGoalAttributes(goal);

        return { ...defaultCompliceAttributes, ...relevantCompliceAttributes };
    }
}