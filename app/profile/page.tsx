"use client";

import { useAuthStore } from "@/app/src/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import ProfileManagement from "@/app/src/common/components/auth/ProfileManagement";

export default function ProfilePage() {
    const { user, customer } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        // Redirigir a home si no está autenticado
        if (!user || !customer) {
            router.push("/");
        }
    }, [user, customer, router]);

    // Mostrar loading mientras se verifica la autenticación
    if (!user || !customer) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "50vh",
                }}
            >
                <CircularProgress sx={{ color: "var(--primary)" }} />
            </Box>
        );
    }

    const handleBack = () => {
        router.back();
    };

    return <ProfileManagement onBack={handleBack} />;
}
