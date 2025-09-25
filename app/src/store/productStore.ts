"use client";
import { create } from "zustand";
import { IProduct } from "../interfaces/product/Product";
import { productos, categories } from "@/app/data/data";
import { ICategory } from "../interfaces/product/Category";

export interface ProductStore {
    products: IProduct[];
    popularProducts: IProduct[];
    categories: ICategory[];
    fetchProducts: () => void;
    fetchPopularProducts: () => void;
    fetchCategories: () => void;
    filterPopularProductsByCategory: (category: string) => IProduct[];
    filterProductsByCategory: (category: string) => IProduct[];
}

export const useProductStore = create<ProductStore>((set, get) => ({
    products: [],
    popularProducts: [],
    categories: [],
    fetchProducts: () =>
        set((state) => {
            if (state.products.length === 0) {
                return { products: productos };
            }
            return state;
        }),
    fetchPopularProducts: () =>
        set((state) => {
            if (state.popularProducts.length === 0) {
                const popularProducts = productos.filter(
                    (product) => product.popular
                );
                return { popularProducts };
            }
            return state;
        }),
    filterPopularProductsByCategory: (category: string) => {
        if (category === "Todas") {
            return get().popularProducts;
        }
        return get().popularProducts.filter((product) =>
            product.categories.some((cat) => cat.name === category)
        );
    },
    filterProductsByCategory: (category: string) => {
        if (category === "Todas") {
            return get().products;
        }
        return get().products.filter((product) =>
            product.categories.some((cat) => cat.name === category)
        );
    },
    fetchCategories: () =>
        set((state) => {
            if (state.categories.length === 0) {
                return { categories };
            }
            return state;
        }),
}));
