"use client";
import { useFindProductsNews } from "@/app/src/hooks/useProducts.hook";
import Layout from "../components/ProductsLayout";

export default function Page() {
    const { data, isLoading, error } = useFindProductsNews();

    return (
        <Layout
            titleHeader="Nuevos Productos"
            search=""
            showCategories={false}
            products={data ?? []}
            isLoading={isLoading}
            error={error?.message ?? ""}
        />
    );
}
