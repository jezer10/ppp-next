interface IDimension {
    dimension_id:number;
    name:string;
}

// backend schema

export interface Item {
    name?: string | null;
}
  
export interface Dimension {
    dimension_id: number | null;
    name:string | null;
    items?: Item[] | null;
}
  
export interface CreateTool {
    name?: string | null;
    type?:number | null;
    dimensions?: Dimension[] | null | undefined;
}


export type { IDimension };