"use client";
import ProductComponent from "@/app/src/common/components/ProductComponent";
import { useProductStore } from "@/app/src/store/productStore";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { IProduct } from "@/app/src/interfaces/product/Product";

export default function CategoriesSelectComponent() {
    const {
        categories,
        filterProductsByCategory,
        fetchProducts,
        fetchCategories,
    } = useProductStore();
    const params = useParams();
    const categoryId = Number(params.id);
    const category = categories.find((cat) => cat.id === categoryId);
    const [products, setProducts] = useState<IProduct[]>([]);

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
        <div className="flex flex-col gap-4 px-5 my-6">
            <div className="bg-[url(/header-bg.png)] p-4 rounded-3xl h-40 flex items-center px-32">
                <h2 className="text-6xl font-semibold text-gray-700">
                    {category?.name}
                </h2>
            </div>
            <ul className="grid grid-cols-5 gap-x-8 gap-y-5 w-full">
                {products.map((producto, index) => (
                    <li key={index} className="">
                        <ProductComponent producto={producto} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
