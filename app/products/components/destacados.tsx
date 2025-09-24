"use client";
import ProductComponent from "@/app/src/common/components/ProductComponent";
import { productos, categories } from "@/app/data/data";
import { useState } from "react";

export default function Destacados() {
    const [categorySelect, setCategorySelect] = useState("Todas");
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-700 mb-4">
                    Productos destacados
                </h1>
                <div className="flex gap-4">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            className={
                                "font-bold hover:text-[var(--primary)] cursor-pointer transition-all duration-300 hover:-translate-y-1 " +
                                (categorySelect === category.name
                                    ? " text-[var(--primary)]"
                                    : "text-gray-600")
                            }
                            onClick={() => setCategorySelect(category.name)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
            <ul className="grid grid-cols-5 gap-x-8 gap-y-5 w-full">
                {productos.map((producto, index) => (
                    <li key={index} className="">
                        <ProductComponent producto={producto} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
