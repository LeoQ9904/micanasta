"use client";
import ProductComponent from "@/app/src/common/components/ProductComponent";
import { useProductStore } from "@/app/src/store/productStore";
import { useState, useEffect } from "react";
import { IProduct } from "@/app/src/interfaces/product/Product";
import CategoriesListComponent from "@/app/src/common/components/CatagoriesListComponent";
import { BorderAllRounded } from "@mui/icons-material";
import PopoverMenuComponent from "@/app/src/common/components/PopoverMenuComponent";

interface CategoryPageClientProps {
    categoryId: number;
}

export default function CategoryPageClient({
    categoryId,
}: CategoryPageClientProps) {
    const optionsList = [2, 5, 7];
    const [optionSelected, setOptionSelected] = useState(5);
    const [mounted, setMounted] = useState(false);
    const {
        categories,
        filterProductsByCategory,
        fetchProducts,
        fetchCategories,
    } = useProductStore();
    const category = categories.find((cat) => cat.id === categoryId);
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [fetchProducts, fetchCategories]);

    useEffect(() => {
        if (category) {
            setProducts(filterProductsByCategory(category.name));
        }
    }, [categoryId, category, filterProductsByCategory]);

    return (
        <div className="flex flex-col gap-4 px-4 md:px-0">
            <div className="bg-[url(/header-bg.png)] p-4 rounded-3xl h-32 md:h-40 flex items-center px-4 md:px-32">
                <h2 className="text-3xl md:text-6xl font-semibold text-gray-700">
                    {category?.name}
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4 md:gap-8">
                <div className="hidden md:block">
                    <div className="border border-gray-200 p-4 rounded-3xl">
                        <h2 className="text-3xl font-semibold text-gray-700 mb-4 border-b-3 border-[rgb(var(--primary-),.3)] pb-1">
                            Categorías
                        </h2>
                        <CategoriesListComponent />
                    </div>
                </div>
                <div>
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
                        {products.map((producto, index) => (
                            <li key={index} className="">
                                <ProductComponent producto={producto} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
