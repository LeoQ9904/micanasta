import CategoriesListComponent from "@/app/src/common/components/CatagoriesListComponent";
import Header from "./header";
import PopoverMenuComponent from "@/app/src/common/components/PopoverMenuComponent";
import LoadingComponent from "@/app/src/common/components/LoadingComponent";
import EmptyStateComponent from "@/app/src/common/components/EmptyStateComponent";
import { BorderAllRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Product } from "@/app/src/interfaces/product/Product";
import ProductComponent from "@/app/src/common/components/ProductComponent";

export default function Layout({
    titleHeader,
    search,
    showCategories,
    products,
    isLoading,
    error,
}: {
    titleHeader: string;
    search: string;
    showCategories: boolean;
    products: Product[];
    isLoading: boolean;
    error: string;
}) {
    const optionsList = [2, 5, 7];
    const [optionSelected, setOptionSelected] = useState(5);
    const [mounted, setMounted] = useState(false);
    const categories = () => {
        if (showCategories) {
            return (
                <div className="hidden md:block">
                    <div className="border border-gray-200 p-4 rounded-3xl">
                        <h2 className="text-3xl font-semibold text-gray-700 mb-4 border-b-3 border-[rgb(var(--primary-),.3)] pb-1">
                            Categorías
                        </h2>
                        <CategoriesListComponent />
                    </div>
                </div>
            );
        }
    };
    useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <div className="flex flex-col gap-4 px-4 md:px-0">
            <Header
                title={titleHeader}
                additional={
                    search && search != "" ? `Resultados para: ${search}` : ""
                }
            />
            <div
                className={
                    !showCategories
                        ? "w-full"
                        : "grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4 md:gap-8"
                }
            >
                {categories()}
                <div className={!showCategories ? "w-full" : ""}>
                    <div className="hidden w-full mb-4 border-b-3 border-gray-200 md:flex justify-start">
                        <PopoverMenuComponent
                            icon={<BorderAllRounded fontSize="large" />}
                            variant="text"
                            Title={`Mostrar: ${optionSelected}`}
                            Children={
                                <div className="w-full">
                                    <ul>
                                        {optionsList.map((option) => (
                                            <li
                                                key={option}
                                                className={`cursor-pointer ${optionSelected == option ? "font-bold text-[var(--primary)]" : ""}`}
                                                onClick={() =>
                                                    setOptionSelected(option)
                                                }
                                            >
                                                {option}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            }
                        />
                    </div>
                    <ul
                        className={`grid gap-4 md:gap-x-8 md:gap-y-5 w-full ${
                            !mounted
                                ? "grid-cols-2 md:grid-cols-5"
                                : optionSelected === 2
                                  ? "grid-cols-2"
                                  : optionSelected === 5
                                    ? "grid-cols-2 md:grid-cols-5"
                                    : "grid-cols-2 md:grid-cols-7"
                        }`}
                    >
                        {isLoading ? (
                            <div className="col-span-full">
                                <LoadingComponent
                                    message="Cargando productos..."
                                    size="large"
                                />
                            </div>
                        ) : error ? (
                            <div className="col-span-full">
                                <EmptyStateComponent
                                    message={`Error al cargar productos: ${error}`}
                                    type="search"
                                    size="large"
                                />
                            </div>
                        ) : products.length === 0 ? (
                            <div className="col-span-full">
                                <EmptyStateComponent
                                    message="No hay productos en esta categoría."
                                    type="category"
                                    size="large"
                                />
                            </div>
                        ) : (
                            products.map((producto, index) => (
                                <li key={index} className="">
                                    <ProductComponent producto={producto} />
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
