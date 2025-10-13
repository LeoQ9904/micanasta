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
    Settings,
    Receipt,
    Phone,
    CheckCircle,
    Warning,
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
                        p: 2,
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <Typography variant="h6" fontWeight={600}>
                        Mi Cuenta
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        size="small"
                        sx={{
                            color: "text.secondary",
                            "&:hover": { backgroundColor: "grey.100" },
                        }}
                    >
                        <Close fontSize="small" />
                    </IconButton>
                </Box>

                {user && customer && (
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <Avatar
                                src={getAvatarUrl()}
                                sx={{
                                    width: 64,
                                    height: 64,
                                    mb: 1.5,
                                    border: "2px solid",
                                    borderColor: "grey.200",
                                }}
                            />
                            <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                textAlign="center"
                                sx={{ mb: 0.5 }}
                            >
                                {getDisplayName()}
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "start",
                                    mb: 2,
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    textAlign="center"
                                    sx={{ mb: 1 }}
                                >
                                    {customer.email}
                                </Typography>

                                {/* Estado de verificación del email */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        mb: customer.phoneNumber ? 1 : 0,
                                    }}
                                >
                                    {user.emailVerified ? (
                                        <CheckCircle
                                            sx={{
                                                fontSize: 16,
                                                color: "success.main",
                                            }}
                                        />
                                    ) : (
                                        <Warning
                                            sx={{
                                                fontSize: 16,
                                                color: "warning.main",
                                            }}
                                        />
                                    )}
                                    <Typography
                                        variant="caption"
                                        color={
                                            user.emailVerified
                                                ? "success.main"
                                                : "warning.main"
                                        }
                                        fontWeight={500}
                                    >
                                        {user.emailVerified
                                            ? "Email verificado"
                                            : "Email no verificado"}
                                    </Typography>
                                </Box>

                                {/* Número de teléfono si existe */}
                                {customer.phoneNumber && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                        }}
                                    >
                                        <Phone
                                            sx={{
                                                fontSize: 16,
                                                color: "text.secondary",
                                            }}
                                        />
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {customer.phoneNumber}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Box>

                        <Divider sx={{ mb: 2 }} />

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                            }}
                        >
                            <Button
                                fullWidth
                                startIcon={
                                    <Settings
                                        sx={{
                                            fontSize: "20px !important",
                                            minWidth: 20,
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    />
                                }
                                onClick={handleGoToProfile}
                                sx={{
                                    justifyContent: "flex-start",
                                    px: 2,
                                    py: 1.2,
                                    color: "text.primary",
                                    textTransform: "none",
                                    fontWeight: 500,
                                    "&:hover": {
                                        backgroundColor: "grey.50",
                                    },
                                    "& .MuiButton-startIcon": {
                                        marginRight: 2,
                                        marginLeft: 0,
                                        width: 20,
                                    },
                                }}
                            >
                                Gestionar Cuenta
                            </Button>

                            <Button
                                fullWidth
                                startIcon={
                                    <Receipt
                                        sx={{
                                            fontSize: "20px !important",
                                            minWidth: 20,
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    />
                                }
                                onClick={handleGoToOrders}
                                sx={{
                                    justifyContent: "flex-start",
                                    px: 2,
                                    py: 1.2,
                                    color: "text.primary",
                                    textTransform: "none",
                                    fontWeight: 500,
                                    "&:hover": {
                                        backgroundColor: "grey.50",
                                    },
                                    "& .MuiButton-startIcon": {
                                        marginRight: 2,
                                        marginLeft: 0,
                                        width: 20,
                                    },
                                }}
                            >
                                Mis Pedidos
                            </Button>

                            {!user.emailVerified && (
                                <Button
                                    fullWidth
                                    startIcon={
                                        <Email
                                            sx={{
                                                fontSize: "20px !important",
                                                minWidth: 20,
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        />
                                    }
                                    onClick={handleVerifyEmail}
                                    sx={{
                                        justifyContent: "flex-start",
                                        px: 2,
                                        py: 1.2,
                                        color: "warning.main",
                                        textTransform: "none",
                                        fontWeight: 500,
                                        "&:hover": {
                                            backgroundColor: "warning.50",
                                        },
                                        "& .MuiButton-startIcon": {
                                            marginRight: 2,
                                            marginLeft: 0,
                                            width: 20,
                                        },
                                    }}
                                >
                                    Verificar Email
                                </Button>
                            )}
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Button
                            fullWidth
                            startIcon={
                                <ExitToApp
                                    sx={{
                                        fontSize: "20px !important",
                                        minWidth: 20,
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                />
                            }
                            onClick={handleLogout}
                            sx={{
                                justifyContent: "flex-start",
                                px: 2,
                                py: 1.2,
                                color: "error.main",
                                textTransform: "none",
                                fontWeight: 500,
                                "&:hover": {
                                    backgroundColor: "error.50",
                                },
                                "& .MuiButton-startIcon": {
                                    marginRight: 2,
                                    marginLeft: 0,
                                    width: 20,
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
