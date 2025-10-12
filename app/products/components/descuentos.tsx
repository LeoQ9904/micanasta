"use client";
import ProductComponent from "@/app/src/common/components/ProductComponent";
import { useFindProductDiscounted } from "@/app/src/hooks/useProducts.hook";
import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useRef } from "react";

export default function Descuentos() {
    const { data: popularProducts } = useFindProductDiscounted();
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 200;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">
                    Ofertas del día
                </h1>
            </div>
            <div className="relative w-full">
                <IconButton
                    onClick={() => scroll("left")}
                    sx={{
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 10,
                        background:
                            "linear-gradient(45deg, #FF6B6B 0%, #4ECDC4 50%, #45B7D1 100%)",
                        color: "white",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                        "&:hover": {
                            background:
                                "linear-gradient(45deg, #FF5252 0%, #26C6DA 50%, #2196F3 100%)",
                            transform: "translateY(-50%) scale(1.1)",
                            boxShadow: "0 12px 20px rgba(0,0,0,0.3)",
                        },
                    }}
                >
                    <ChevronLeft />
                </IconButton>
                <div
                    ref={scrollRef}
                    className="overflow-x-auto scrollbar-hide"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    <ul className="flex gap-4 pb-4 w-max">
                        {popularProducts?.map((producto, index) => (
                            <li
                                key={index}
                                className="flex-shrink-0 w-60 md:w-[300px]"
                            >
                                <ProductComponent producto={producto} />
                            </li>
                        ))}
                    </ul>
                </div>
                <IconButton
                    onClick={() => scroll("right")}
                    sx={{
                        position: "absolute",
                        right: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 10,
                        background:
                            "linear-gradient(45deg, #FF6B6B 0%, #4ECDC4 50%, #45B7D1 100%)",
                        color: "white",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                        "&:hover": {
                            background:
                                "linear-gradient(45deg, #FF5252 0%, #26C6DA 50%, #2196F3 100%)",
                            transform: "translateY(-50%) scale(1.1)",
                            boxShadow: "0 12px 20px rgba(0,0,0,0.3)",
                        },
                    }}
                >
                    <ChevronRight />
                </IconButton>
            </div>
        </div>
    );
}
