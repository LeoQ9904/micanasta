import type { Metadata } from "next";
import "./globals.css";
import HeaderComponent from "./src/common/components/HeaderComponent";
import { FooterComponent } from "./src/common/components/FooterComponent";
import StoreInitializer from "./src/common/components/StoreInitializer";
import QueryProvider from "./src/providers/QueryProvider";

export const metadata: Metadata = {
    title: "Mi Canasta",
    description: "Productos del agro colombiano.",
    other: {
        "app-version": "1.0.2", // Incrementa este número cuando hagas cambios importantes
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta
                    name="cache-control"
                    content="no-cache, no-store, must-revalidate"
                />
                <meta name="pragma" content="no-cache" />
                <meta name="expires" content="0" />
                <meta name="app-version" content="1.0.2" />
                <link rel="icon" href="/logo.png" type="image/svg+xml" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body
                className="antialiased"
                style={{ fontFamily: "Nunito, sans-serif" }}
            >
                <QueryProvider>
                    <StoreInitializer />
                    <HeaderComponent />
                    <div className="container mx-auto my-5 px-2 md:px-0">
                        {children}
                    </div>
                    <FooterComponent />
                </QueryProvider>
            </body>
        </html>
    );
}
