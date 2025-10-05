"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

interface QueryProviderProps {
    children: React.ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Tiempo en cache (5 minutos)
                        staleTime: 1000 * 60 * 5,
                        // Tiempo antes de garbage collection (10 minutos)
                        gcTime: 1000 * 60 * 10,
                        // Reintento automático en caso de error
                        retry: 2,
                        // Refetch en focus de ventana
                        refetchOnWindowFocus: false,
                        // Refetch en reconexión
                        refetchOnReconnect: true,
                    },
                    mutations: {
                        // Reintento en mutaciones fallidas
                        retry: 1,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* Solo mostrar devtools en desarrollo */}
            {process.env.NODE_ENV === "development" && (
                <ReactQueryDevtools initialIsOpen={false} />
            )}
        </QueryClientProvider>
    );
}
