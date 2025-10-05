"use client";

interface LoadingComponentProps {
    message?: string;
    size?: "small" | "medium" | "large";
}

export default function LoadingComponent({
    message = "Cargando productos...",
    size = "medium",
}: LoadingComponentProps) {
    const sizeClasses = {
        small: "w-8 h-8",
        medium: "w-12 h-12",
        large: "w-16 h-16",
    };

    const containerClasses = {
        small: "py-4",
        medium: "py-8",
        large: "py-12",
    };

    return (
        <div
            className={`flex flex-col items-center justify-center ${containerClasses[size]}`}
        >
            {/* Spinner animado */}
            <div className="relative">
                {/* Círculo exterior */}
                <div
                    className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full animate-spin`}
                >
                    <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>
                </div>

                {/* Círculo interior */}
                <div className="absolute inset-2">
                    <div className="w-full h-full border-2 border-gray-100 rounded-full animate-pulse">
                        <div
                            className="absolute inset-0 border-2 border-transparent border-b-pink-400 border-l-cyan-400 rounded-full animate-spin"
                            style={{
                                animationDirection: "reverse",
                                animationDuration: "1.5s",
                            }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Texto con animación */}
            <div className="mt-4 text-center">
                <p className="text-gray-600 font-medium animate-pulse">
                    {message}
                </p>

                {/* Puntos animados */}
                <div className="flex justify-center mt-2 space-x-1">
                    <div
                        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                        className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                        className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                    ></div>
                </div>
            </div>

            {/* Efecto de ondas */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-24 h-24 border border-blue-200 rounded-full animate-ping opacity-20"></div>
                <div
                    className="absolute w-32 h-32 border border-purple-200 rounded-full animate-ping opacity-10"
                    style={{ animationDelay: "1s" }}
                ></div>
            </div>
        </div>
    );
}
