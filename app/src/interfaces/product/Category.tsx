export interface ICategory {
    _id: string;
    name: string;
    description: string;
    isActive: boolean;
    parentId: string | null;
}

export interface ICategorySample {
    id: number;
    name: string;
    description?: string;
}
