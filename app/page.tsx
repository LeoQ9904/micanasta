"use client";
import Descuentos from "./products/components/descuentos";
import Destacados from "./products/components/destacados";
import NotasComponent from "./src/common/components/NotasComponent";
import {
    useFindAllProducts,
    useFindAllProductsDestacados,
} from "@/app/src/hooks/useProducts.hook";

export default function Home() {
    const { data: products, isLoading, error } = useFindAllProducts();
    const {
        data: productsD,
        isLoading: isLoadingD,
        error: errorD,
    } = useFindAllProductsDestacados();

    if (isLoading || isLoadingD) {
        return (
            <main className="flex flex-col gap-8">
                <NotasComponent />
                <div className="text-center py-8">
                    <p>Cargando productos...</p>
                </div>
            </main>
        );
    }

    if (error || errorD) {
        console.error("Error loading products:", error);
    }

    return (
        <main className="flex flex-col gap-8">
            <NotasComponent />
            <Descuentos />
            <Destacados />
        </main>
    );
}
