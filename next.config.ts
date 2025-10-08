import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    // Configuración para evitar problemas de cache
    generateEtags: false,
    poweredByHeader: false,
    // Asegurar que los archivos estáticos tengan hash únicos
    assetPrefix: process.env.NODE_ENV === "production" ? undefined : undefined,
};

export default nextConfig;
