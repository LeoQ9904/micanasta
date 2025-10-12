import { Product } from "../interfaces/product/Product";
import { api } from "./apiClient";

export async function getProducts(): Promise<Product[]> {
    const response = await api.get<Product[]>("/products");
    return response.data;
}

export async function getProductPopular(): Promise<Product[]> {
    const response = await api.get<Product[]>("/products/popular");
    return response.data;
}

export async function getProductByCategory(
    category: string,
    searchTerm?: string
): Promise<Product[]> {
    const url = searchTerm
        ? `/products/category/${category}?search=${encodeURIComponent(searchTerm)}`
        : `/products/category/${category}`;
    const response = await api.get<Product[]>(url);
    return response.data;
}

export async function getProductDiscounted(): Promise<Product[]> {
    const response = await api.get<Product[]>("/products/discounted");
    return response.data;
}

export async function getProductsNew(): Promise<Product[]> {
    const response = await api.get<Product[]>("/products/nuevos");
    return response.data;
}
