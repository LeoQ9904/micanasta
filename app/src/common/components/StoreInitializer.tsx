"use client";
import { useEffect } from "react";
import { useProductStore } from "../../store/productStore";

export default function StoreInitializer() {
    const { fetchCategories, fetchProducts, fetchPopularProducts } = useProductStore();

    useEffect(() => {
        fetchCategories();
        fetchProducts();
        fetchPopularProducts();
    }, [fetchCategories, fetchProducts, fetchPopularProducts]);

    return null;
}