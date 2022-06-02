export interface CompliceGoal {
    _id?: string;
    code: string;
    name: string;
    color: string;
    privacy: number;
    oneliner: string;
    startdate: string;
    enddate: string;
    reviewQuestions?: object,
    justCreated?: boolean;
    topPriority: object;
    stats?: {
        currentStreak: number;
        maxStreak: number;
        totalOutcomes: number;
        totalPomos: number;
        totalValue: number;
        totalWorktime: number;
    }
}
    