interface IToolResponse {
    assesment_tool_id: number;
    name: string;
    type:number
    Instrumento_Dimension: IToolDimensionResponse[]
}

interface IToolDimensionResponse {
    tool_dimension_id:number;
    dimension_id:number;
    assesment_tool_id:number;
    Dimension:IDimensionResponse;
    Item:IItemResponse[];
}

interface IDimensionResponse {
    dimension_id:number;
    name:string;
}

interface IItemResponse {
    item_id:number;
    name:string
}

export type { IToolResponse, IToolDimensionResponse, IDimensionResponse, IItemResponse }