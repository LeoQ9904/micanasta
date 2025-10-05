"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import CategoryPageClient from "./components/CategoryPageClient";

function ProductsContent() {
    const searchParams = useSearchParams();
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    if (!category) {
        return (
            <div className="flex flex-col gap-4 px-4 md:px-0">
                <div className="bg-[url(/header-bg.png)] p-4 rounded-3xl h-32 md:h-40 flex items-center px-4 md:px-32">
                    <h2 className="text-3xl md:text-6xl font-semibold text-gray-700">
                        Productos
                    </h2>
                </div>
                <div className="text-center py-8">
                    <p className="text-lg text-gray-600">
                        Selecciona una categoría para ver los productos
                    </p>
                </div>
            </div>
        );
    }

    return (
        <CategoryPageClient
            categoryId={category}
            searchTerm={search || undefined}
        />
    );
}

export default function ProductsPage() {
    return (
        <Suspense
            fallback={
                <div className="flex flex-col gap-4 px-4 md:px-0">
                    <div className="bg-[url(/header-bg.png)] p-4 rounded-3xl h-32 md:h-40 flex items-center px-4 md:px-32">
                        <h2 className="text-3xl md:text-6xl font-semibold text-gray-700">
                            Cargando...
                        </h2>
                    </div>
                </div>
            }
        >
            <ProductsContent />
        </Suspense>
    );
}
