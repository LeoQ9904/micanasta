"use client";
import { create } from "zustand";
import { Product } from "../interfaces/product/Product";
import { ICategory } from "../interfaces/product/Category";

export interface ProductStore {
    products: Product[];
    popularProducts: Product[];
    categories: ICategory[];
    setProductos: (products: Product[]) => void;
    setPopularProducts: (popularProducts: Product[]) => void;
    setCategories: (category: ICategory[]) => void;
    filterPopularProductsByCategory: (category: string) => Product[];
    filterProductsByCategory: (category: string) => Product[];
}

export const useProductStore = create<ProductStore>((set, get) => ({
    products: [],
    popularProducts: [],
    categories: [],
    setProductos: (products) => set({ products }),
    setPopularProducts: (popularProducts) => set({ popularProducts }),
    setCategories: (categories) => set({ categories }),
    filterPopularProductsByCategory: (category: string) => {
        if (category === "Todas") {
            return get().popularProducts;
        }
        return get().popularProducts.filter(
            (product) => product.category === category
        );
    },
    filterProductsByCategory: (category: string) => {
        if (category === "Todas") {
            return get().products;
        }
        return get().products.filter(
            (product) => product.category === category
        );
    },
}));
