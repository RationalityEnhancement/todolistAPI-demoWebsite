import { Injectable } from "@angular/core";
import { NewCompliceGoal, RelevantCompliceGoalAttributes } from "../interfaces/Complice-Goal";
import { Goal, outputItem } from "../interfaces/item";

@Injectable()
export class AdapterService {

    constructor() { }

    public parseGoals<T>(input: string): T[] {
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
            tasks: goal.tasks
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
            color: "#6600cc",
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

    public toRawCompliceIntentions(todoList: outputItem[]): string {
        return todoList
            .map(task => this.getRawCompliceIntentionName(task))
            .join('\n')
            .replace(/ ?#today/g, '');
    }

    private getRawCompliceIntentionName(task: outputItem): string {
        const taskName = task.nm;
        const taskValue = `=${task.val}`;
        const workflowyId = `$wf:${task.id}`;

        return `${taskName} ${taskValue} ${workflowyId}`;
    }
}