"use client";
import { useState, useEffect } from "react";
import { IProduct } from "@/app/src/interfaces/product/Product";
import { useFindProductByCategory } from "@/app/src/hook/useProducts.hook";
import Layout from "./layout";

interface CategoryPageClientProps {
    categoryId: string;
    searchTerm?: string;
}

export default function CategoryPageClient({
    categoryId,
    searchTerm,
}: CategoryPageClientProps) {
    const [products, setProducts] = useState<IProduct[]>([]);
    const { data, isLoading, error } = useFindProductByCategory(
        categoryId,
        searchTerm
    );

    useEffect(() => {
        if (data) {
            setProducts(data);
        }
    }, [data]);

    return (
        <Layout
            titleHeader={categoryId}
            search={searchTerm ?? ""}
            showCategories={true}
            products={products}
            isLoading={isLoading}
            error={error?.message ?? ""}
        />
    );
}
