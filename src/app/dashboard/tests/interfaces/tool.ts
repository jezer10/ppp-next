interface ITool {
    assesment_tool_id:number;
    name:string;
}


// backend schema

export interface Item {
    name: string;
}
  
export interface Dimension {
    dimension_id: number;
    items: Item[];
}
  
export interface CreateToolRequest {
    name: string;
    dimensions: Dimension[];
}

export type { ITool };