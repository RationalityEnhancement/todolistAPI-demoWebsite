import { Item, Goal, outputItem } from "./views/item"
import { InitComponent } from "./views/init.component"


export class Globals {

    static taskList:Item[] = []
    static goalList: Goal[] = []
    static optTaskList:outputItem[] = []
    static ai_method_result: boolean;
}