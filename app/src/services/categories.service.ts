import { ICategory } from "../interfaces/product/Category";
import { api } from "./apiClient";

export async function getFindAllCategories(): Promise<ICategory[]> {
    const response = await api.get<ICategory[]>("/categories");
    return response.data;
}
