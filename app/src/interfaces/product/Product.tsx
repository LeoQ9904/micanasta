import { ICategory } from "./Category";

export interface IProduct {
    title: string;
    description: string;
    image: string;
    price: number;
    discount: number;
    images: string[];
    categories: ICategory[];
}
