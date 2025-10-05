"use client";
import { useFindProductDiscounted } from "@/app/src/hook/useProducts.hook";
import Layout from "../components/layout";

export default function OfertasPage() {
    const { data, isLoading, error } = useFindProductDiscounted();
    return (
        <Layout
            titleHeader="Ofertas del día"
            search=""
            showCategories={false}
            products={data ?? []}
            isLoading={isLoading}
            error={error?.message ?? ""}
        />
    );
}
