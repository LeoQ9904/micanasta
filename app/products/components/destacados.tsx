"use client";
import ProductComponent from "@/app/src/common/components/ProductComponent";
import { useEffect, useState } from "react";
import { useProductStore } from "../../src/store/productStore";
import { ICategory } from "@/app/src/interfaces/product/Category";

export default function Destacados() {
    const { filterPopularProductsByCategory } = useProductStore();
    const [categorySelect, setCategorySelect] = useState("Todas");
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [popularProducts, setPopularProducts] = useState(
        filterPopularProductsByCategory(categorySelect)
    );

    const selectCategory = (category: string) => {
        setCategorySelect(category);
        setPopularProducts(filterPopularProductsByCategory(category));
    };

    useEffect(() => {
        const uniqueCategoryNames = Array.from(
            new Set(popularProducts.map((product) => product.category))
        );
        const categoriesList: ICategory[] = [
            {
                _id: "0",
                name: "Todas",
                description: "Todas las categorías",
                isActive: true,
                parentId: null,
            },
            ...uniqueCategoryNames.map((categoryName, index) => {
                return {
                    _id: index + (1).toString(),
                    name: categoryName,
                    description: categoryName,
                    isActive: true,
                    parentId: null,
                };
            }),
        ];
        if (categories.length == 0) {
            setCategories(categoriesList);
        }
    }, [popularProducts, categories]);
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">
                    Productos destacados
                </h1>
                <div className="gap-4 hidden md:flex">
                    {categories.length > 0 &&
                        categories.map((category, index) => (
                            <button
                                key={index}
                                className={
                                    "font-bold hover:text-[var(--primary)] cursor-pointer transition-all duration-300 hover:-translate-y-1 " +
                                    (categorySelect === category.name
                                        ? " text-[var(--primary)]"
                                        : "text-gray-600")
                                }
                                onClick={() => selectCategory(category.name)}
                            >
                                {category.name}
                            </button>
                        ))}
                </div>
            </div>
            <ul className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-5 w-full items-stretch">
                {popularProducts.map((producto, index) => (
                    <li key={index} className="">
                        <ProductComponent producto={producto} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
