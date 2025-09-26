"use client";
import ProductComponent from "@/app/src/common/components/ProductComponent";
import { categories } from "@/app/data/data";
import { useState } from "react";
import { useProductStore } from "../../src/store/productStore";

export default function Destacados() {
    const { fetchPopularProducts, filterPopularProductsByCategory } =
        useProductStore();
    const [categorySelect, setCategorySelect] = useState("Todas");
    fetchPopularProducts();
    const [popularProducts, setPopularProducts] = useState(
        filterPopularProductsByCategory(categorySelect)
    );

    const selectCategory = (category: string) => {
        setCategorySelect(category);
        setPopularProducts(filterPopularProductsByCategory(category));
    };
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">
                    Productos destacados
                </h1>
                <div className="gap-4 hidden md:flex">
                    {categories.map((category, index) => (
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
            <ul className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-5 w-full">
                {popularProducts.map((producto, index) => (
                    <li key={index} className="">
                        <ProductComponent producto={producto} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
