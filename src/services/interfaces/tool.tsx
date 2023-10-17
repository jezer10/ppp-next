export interface Item {
    name: string;
}
  
export interface Dimension {
    dimension_id: number;
    items: Item[];
}
  
export interface CreateToolBody{
    name: string;
    dimensions: Dimension[];
}