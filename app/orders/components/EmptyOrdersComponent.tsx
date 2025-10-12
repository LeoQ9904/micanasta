"use client";

import { ShoppingCart, ArrowForward } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function EmptyOrdersComponent() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center py-16">
            {/* Icono principal */}
            <div className="relative mb-8">
                <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-full p-8 shadow-lg">
                    <ShoppingCart sx={{ fontSize: 80, color: "#f97316" }} />
                </div>

                {/* Efectos decorativos */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-400 rounded-full animate-ping opacity-30"></div>
                <div
                    className="absolute -bottom-2 -left-2 w-3 h-3 bg-red-400 rounded-full animate-ping opacity-20"
                    style={{ animationDelay: "1s" }}
                ></div>
            </div>

            {/* Contenido */}
            <div className="text-center max-w-md mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    ¡Aún no tienes pedidos!
                </h3>
                <p className="text-gray-600 leading-relaxed mb-2">
                    Descubre nuestros productos frescos del agro colombiano.
                </p>
                <p className="text-gray-500 text-sm">
                    Cuando realices tu primer pedido, aparecerá aquí con todos
                    los detalles.
                </p>
            </div>

            {/* Botón de acción */}
            <Button
                variant="contained"
                endIcon={<ArrowForward />}
                onClick={() => router.push("/products")}
                sx={{
                    backgroundColor: "var(--primary)",
                    color: "white",
                    fontWeight: "600",
                    textTransform: "none",
                    py: 1.5,
                    px: 4,
                    borderRadius: 2,
                    "&:hover": {
                        backgroundColor: "var(--primary)",
                        opacity: 0.9,
                        transform: "translateY(-1px)",
                    },
                    transition: "all 0.2s ease-in-out",
                }}
            >
                Explorar Productos
            </Button>

            {/* Elementos decorativos flotantes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-300 rounded-full animate-float opacity-30"></div>
                <div
                    className="absolute top-1/3 right-1/3 w-1 h-1 bg-red-300 rounded-full animate-float opacity-40"
                    style={{ animationDelay: "2s" }}
                ></div>
                <div
                    className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-float opacity-25"
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
