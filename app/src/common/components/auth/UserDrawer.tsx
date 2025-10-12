"use client";

import { useState } from "react";
import {
    Drawer,
    Box,
    Typography,
    Avatar,
    Button,
    Divider,
    IconButton,
} from "@mui/material";
import {
    Close,
    ExitToApp,
    Email,
    Edit,
    Settings,
    LocationOn,
    Receipt,
} from "@mui/icons-material";
import { useAuthStore } from "@/app/src/store/authStore";
import { logout } from "@/app/src/lib/auth";
import { sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/navigation";
import UpdateProfileModal from "./UpdateProfileModal";

interface UserDrawerProps {
    open: boolean;
    onClose: () => void;
}

export default function UserDrawer({ open, onClose }: UserDrawerProps) {
    const user = useAuthStore((state) => state.user);
    const customer = useAuthStore((state) => state.customer);
    const router = useRouter();
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        useAuthStore.getState().logout();
        onClose();
    };

    const handleVerifyEmail = async () => {
        if (user) {
            try {
                await sendEmailVerification(user);
                alert(
                    "Email de verificación enviado. Revisa tu bandeja de entrada, revisar spam."
                );
            } catch (error) {
                console.error("Error sending verification email:", error);
            }
        }
    };

    const getDisplayName = () => {
        if (customer?.displayName) return customer.displayName;
        if (user?.displayName) return user.displayName;
        return "Usuario";
    };

    const getAvatarUrl = () => {
        if (customer?.photoURL) return customer.photoURL;
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(getDisplayName())}&background=random`;
    };

    const handleUpdateProfile = () => {
        setUpdateModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setUpdateModalOpen(false);
    };

    const handleGoToProfile = () => {
        onClose();
        router.push("/profile");
    };

    const handleGoToOrders = () => {
        onClose();
        router.push("/orders");
    };

    return (
        <>
            <Drawer
                anchor="right"
                open={open}
                onClose={onClose}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: { xs: "100vw", sm: 350 },
                        p: 3,
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                    }}
                >
                    <Typography variant="h6" fontWeight="bold">
                        Mi Perfil
                    </Typography>
                    <Button onClick={onClose} sx={{ minWidth: "auto", p: 1 }}>
                        <Close />
                    </Button>
                </Box>

                {user && customer && (
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                mb: 3,
                            }}
                        >
                            <Box sx={{ position: "relative", mb: 2 }}>
                                <Avatar
                                    src={getAvatarUrl()}
                                    sx={{ width: 80, height: 80 }}
                                />
                                <IconButton
                                    onClick={handleUpdateProfile}
                                    sx={{
                                        position: "absolute",
                                        bottom: -5,
                                        right: -5,
                                        backgroundColor: "var(--primary)",
                                        color: "white",
                                        width: 30,
                                        height: 30,
                                        "&:hover": {
                                            backgroundColor: "var(--primary)",
                                            opacity: 0.9,
                                        },
                                    }}
                                >
                                    <Edit fontSize="small" />
                                </IconButton>
                            </Box>
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                textAlign="center"
                            >
                                {getDisplayName()}
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mt: 1,
                                }}
                            >
                                <Email fontSize="small" color="action" />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {customer.email}
                                </Typography>
                            </Box>
                            {customer.phoneNumber && (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mt: 1 }}
                                >
                                    📞 {customer.phoneNumber}
                                </Typography>
                            )}
                            {customer.addresses &&
                                customer.addresses.length > 0 && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            mt: 1,
                                        }}
                                    >
                                        <LocationOn
                                            fontSize="small"
                                            color="action"
                                        />
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {customer.addresses.length}{" "}
                                            dirección
                                            {customer.addresses.length !== 1
                                                ? "es"
                                                : ""}{" "}
                                            guardada
                                            {customer.addresses.length !== 1
                                                ? "s"
                                                : ""}
                                        </Typography>
                                    </Box>
                                )}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mt: 1,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: "50%",
                                        backgroundColor: user.emailVerified
                                            ? "success.main"
                                            : "warning.main",
                                    }}
                                />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {user.emailVerified
                                        ? "Email verificado"
                                        : "Email no verificado"}
                                </Typography>
                            </Box>
                        </Box>

                        <Divider sx={{ mb: 3 }} />

                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<Settings />}
                            onClick={handleGoToProfile}
                            sx={{
                                mb: 2,
                                backgroundColor: "#f5f5f5",
                                color: "text.primary",
                                py: 1.2,
                                textTransform: "none",
                                fontWeight: 500,
                                boxShadow: "none",
                                "&:hover": {
                                    backgroundColor: "#eeeeee",
                                    boxShadow: "none",
                                },
                            }}
                        >
                            Gestionar Perfil
                        </Button>

                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<Receipt />}
                            onClick={handleGoToOrders}
                            sx={{
                                mb: 2,
                                backgroundColor: "#f5f5f5",
                                color: "text.primary",
                                py: 1.2,
                                textTransform: "none",
                                fontWeight: 500,
                                boxShadow: "none",
                                "&:hover": {
                                    backgroundColor: "#eeeeee",
                                    boxShadow: "none",
                                },
                            }}
                        >
                            Mis Pedidos
                        </Button>

                        {!user.emailVerified && (
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={handleVerifyEmail}
                                sx={{
                                    mb: 2,
                                    borderColor: "var(--primary)",
                                    color: "var(--primary)",
                                    "&:hover": {
                                        backgroundColor: "var(--primary)",
                                        color: "white",
                                        opacity: 0.1,
                                    },
                                }}
                            >
                                Verificar Email
                            </Button>
                        )}

                        <Button
                            fullWidth
                            variant="text"
                            startIcon={<ExitToApp />}
                            onClick={handleLogout}
                            sx={{
                                color: "#666",
                                py: 1.2,
                                textTransform: "none",
                                fontWeight: 500,
                                "&:hover": {
                                    backgroundColor: "#f5f5f5",
                                    color: "#d32f2f",
                                },
                            }}
                        >
                            Cerrar Sesión
                        </Button>
                    </>
                )}
            </Drawer>

            <UpdateProfileModal
                open={updateModalOpen}
                onClose={handleCloseUpdateModal}
            />
        </>
    );
}
