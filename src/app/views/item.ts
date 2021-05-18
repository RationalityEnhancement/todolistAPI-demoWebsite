

export interface Goal{
    name: string,
    num_children?: number,
    time_est?: number,
    deadline?: string,
    value?: number,
    tasks?: Item[],
}

export interface Item{
    name: string
    time_est?: number,
    deadline?: string,
    value?: number,
    today?: boolean
}

export interface outputItem{
    id: string,
    nm: string,
    lm: number,
    parentId: string,
    pcp: boolean,
    est: number,
    val: number
}

export interface Node{
    id: string,
    nm: string,
    lm: number,
    ch?: Node[]
}