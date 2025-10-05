"use client";

import {
    Drawer,
    Box,
    Typography,
    Avatar,
    Button,
    Divider,
} from "@mui/material";
import { Close, ExitToApp, Email } from "@mui/icons-material";
import { useAuthStore } from "@/app/src/store/authStore";
import { logout } from "@/app/src/lib/auth";
import { sendEmailVerification } from "firebase/auth";

interface UserDrawerProps {
    open: boolean;
    onClose: () => void;
}

export default function UserDrawer({ open, onClose }: UserDrawerProps) {
    const user = useAuthStore((state) => state.user);

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
        if (user?.displayName) return user.displayName;
        if (user?.email) return user.email.split("@")[0];
        return "Usuario";
    };

    const getAvatarUrl = () => {
        if (user?.photoURL) return user.photoURL;
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(getDisplayName())}&background=random`;
    };

    return (
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

            {user && (
                <>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            mb: 3,
                        }}
                    >
                        <Avatar
                            src={getAvatarUrl()}
                            sx={{ width: 80, height: 80, mb: 2 }}
                        />
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
                            <Typography variant="body2" color="text.secondary">
                                {user.email}
                            </Typography>
                        </Box>
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
                            <Typography variant="body2" color="text.secondary">
                                {user.emailVerified
                                    ? "Email verificado"
                                    : "Email no verificado"}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {!user.emailVerified && (
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleVerifyEmail}
                            sx={{
                                mb: 2,
                                backgroundColor: "var(--primary)",
                                "&:hover": {
                                    backgroundColor: "var(--primary)",
                                    opacity: 0.9,
                                },
                            }}
                        >
                            Verificar Email
                        </Button>
                    )}

                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<ExitToApp />}
                        onClick={handleLogout}
                        sx={{
                            color: "error.main",
                            borderColor: "error.main",
                            "&:hover": {
                                backgroundColor: "error.light",
                                borderColor: "error.main",
                            },
                        }}
                    >
                        Cerrar Sesión
                    </Button>
                </>
            )}
        </Drawer>
    );
}
