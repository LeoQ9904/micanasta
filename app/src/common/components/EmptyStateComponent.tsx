"use client";

import { ShoppingBasket, SearchOff, Category } from "@mui/icons-material";

interface EmptyStateComponentProps {
    message?: string;
    type?: "products" | "search" | "category";
    size?: "small" | "medium" | "large";
}

export default function EmptyStateComponent({
    message = "No hay productos en esta categoría.",
    type = "products",
    size = "medium",
}: EmptyStateComponentProps) {
    const sizeClasses = {
        small: "w-16 h-16",
        medium: "w-24 h-24",
        large: "w-32 h-32",
    };

    const containerClasses = {
        small: "py-8",
        medium: "py-12",
        large: "py-16",
    };

    const textClasses = {
        small: "text-lg",
        medium: "text-xl",
        large: "text-2xl",
    };

    const getIcon = () => {
        switch (type) {
            case "search":
                return (
                    <SearchOff
                        className={`${sizeClasses[size]} text-gray-400`}
                    />
                );
            case "category":
                return (
                    <Category
                        className={`${sizeClasses[size]} text-gray-400`}
                    />
                );
            default:
                return (
                    <ShoppingBasket
                        className={`${sizeClasses[size]} text-gray-400`}
                    />
                );
        }
    };

    return (
        <div
            className={`flex flex-col items-center justify-center ${containerClasses[size]}`}
        >
            {/* Contenedor del ícono con animación */}
            <div className="relative mb-6">
                {/* Círculo de fondo con pulso */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full animate-pulse opacity-50"></div>

                {/* Círculo principal */}
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-full p-6 shadow-lg">
                    {getIcon()}
                </div>

                {/* Efectos decorativos */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-30"></div>
                <div
                    className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-400 rounded-full animate-ping opacity-20"
                    style={{ animationDelay: "1s" }}
                ></div>
            </div>

            {/* Mensaje principal */}
            <div className="text-center max-w-md">
                <h3
                    className={`${textClasses[size]} font-semibold text-gray-700 mb-2`}
                >
                    ¡Oops! Parece que está vacío aquí
                </h3>
                <p className="text-gray-500 leading-relaxed">{message}</p>
            </div>

            {/* Elementos decorativos flotantes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-300 rounded-full animate-float opacity-30"></div>
                <div
                    className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-300 rounded-full animate-float opacity-40"
                    style={{ animationDelay: "2s" }}
                ></div>
                <div
                    className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-300 rounded-full animate-float opacity-25"
                    style={{ animationDelay: "3s" }}
                ></div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    25% {
                        transform: translateY(-10px) rotate(90deg);
                    }
                    50% {
                        transform: translateY(-5px) rotate(180deg);
                    }
                    75% {
                        transform: translateY(-15px) rotate(270deg);
                    }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
