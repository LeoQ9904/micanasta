export interface IProduct {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    discount: number;
    images: string[];
    category: string;
    tags?: string[];
    popular: boolean;
    unit: string;
}
