import { IProduct } from "../interfaces/product/Product";
import { api } from "./apiClient";

export async function getProducts(): Promise<IProduct[]> {
    const response = await api.get<IProduct[]>("/products");
    return response.data;
}

export async function getProductPopular(): Promise<IProduct[]> {
    const response = await api.get<IProduct[]>("/products/popular");
    return response.data;
}

export async function getProductByCategory(
    category: string,
    searchTerm?: string
): Promise<IProduct[]> {
    const url = searchTerm
        ? `/products/category/${category}?search=${encodeURIComponent(searchTerm)}`
        : `/products/category/${category}`;
    const response = await api.get<IProduct[]>(url);
    return response.data;
}

export async function getProductDiscounted(): Promise<IProduct[]> {
    const response = await api.get<IProduct[]>("/products/discounted");
    return response.data;
}

export async function getProductsNew(): Promise<IProduct[]> {
    const response = await api.get<IProduct[]>("/products/nuevos");
    return response.data;
}
