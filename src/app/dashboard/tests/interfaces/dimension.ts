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

export interface ToolDimension {
    tool_dimension_id?: number | null;
    assesment_tool_id?:number;
    dimension_id?:number;
}
  
export interface CreateTool {
    assesment_tool_id?: number | null;
    name?: string | null;
    type?:number | null;
    dimensions?: Dimension[] | null | undefined;
    toolDimensions?: ToolDimension[];
}


export type { IDimension };