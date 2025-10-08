"use client";
import { create } from "zustand";
import { IProduct } from "../interfaces/product/Product";
import { ICategory } from "../interfaces/product/Category";

export interface ProductStore {
    products: IProduct[];
    popularProducts: IProduct[];
    categories: ICategory[];
    setProductos: (products: IProduct[]) => void;
    setPopularProducts: (popularProducts: IProduct[]) => void;
    setCategories: (category: ICategory[]) => void;
    filterPopularProductsByCategory: (category: string) => IProduct[];
    filterProductsByCategory: (category: string) => IProduct[];
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
