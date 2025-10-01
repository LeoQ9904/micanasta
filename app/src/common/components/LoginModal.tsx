"use client";

import { useState } from "react";
import {
    Modal,
    Box,
    TextField,
    Button,
    Typography,
    IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import ForgotPasswordModal from "./ForgotPasswordModal";
import GoogleIcon from "./utils/icons/google";

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isRegister) {
            console.log("Register:", { email, password, confirmPassword });
        } else {
            console.log("Login:", { email, password });
        }
        onClose();
    };

    const handleGoogleLogin = () => {
        // Aquí iría la lógica de Google OAuth
        console.log("Google Login");
        onClose();
    };

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: { xs: "90vw", sm: 400 },
                        maxWidth: 400,
                        bgcolor: "background.paper",
                        borderRadius: 2,
                        boxShadow: 24,
                        p: { xs: 3, sm: 4 },
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
                        <Typography
                            variant="h5"
                            component="h2"
                            fontWeight="bold"
                            sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
                        >
                            {isRegister ? "Registrarse" : "Iniciar Sesión"}
                        </Typography>
                        <IconButton onClick={onClose}>
                            <Close />
                        </IconButton>
                    </Box>

                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleGoogleLogin}
                        sx={{
                            mb: 3,
                            borderColor: "#dadce0",
                            color: "#3c4043",
                            textTransform: "none",
                            fontWeight: 500,
                            py: 1.5,
                            "&:hover": {
                                backgroundColor: "#f8f9fa",
                                borderColor: "#dadce0",
                            },
                        }}
                        startIcon={<GoogleIcon />}
                    >
                        Continuar con Google
                    </Button>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <Box
                            sx={{
                                flex: 1,
                                height: "1px",
                                backgroundColor: "#e0e0e0",
                            }}
                        />
                        <Typography
                            sx={{ px: 2, color: "#666", fontSize: "14px" }}
                        >
                            o
                        </Typography>
                        <Box
                            sx={{
                                flex: 1,
                                height: "1px",
                                backgroundColor: "#e0e0e0",
                            }}
                        />
                    </Box>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Contraseña"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            required
                        />
                        {isRegister && (
                            <TextField
                                fullWidth
                                label="Confirmar Contraseña"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                margin="normal"
                                required
                            />
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                backgroundColor: "var(--primary)",
                                "&:hover": {
                                    backgroundColor: "var(--primary)",
                                    opacity: 0.9,
                                },
                            }}
                        >
                            {isRegister ? "Registrarse" : "Iniciar Sesión"}
                        </Button>
                    </form>

                    {!isRegister && (
                        <Box sx={{ textAlign: "center", mt: 2 }}>
                            <Button
                                variant="text"
                                onClick={() => {
                                    onClose();
                                    setForgotPasswordOpen(true);
                                }}
                                sx={{
                                    textTransform: "none",
                                    color: "var(--primary)",
                                    fontSize: "14px",
                                }}
                            >
                                ¿Olvidaste tu contraseña?
                            </Button>
                        </Box>
                    )}

                    <Box sx={{ textAlign: "center", mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                            {isRegister
                                ? "¿Ya tienes cuenta?"
                                : "¿No tienes cuenta?"}
                            <Button
                                variant="text"
                                onClick={() => setIsRegister(!isRegister)}
                                sx={{
                                    ml: 1,
                                    textTransform: "none",
                                    color: "var(--primary)",
                                    fontWeight: 600,
                                }}
                            >
                                {isRegister ? "Iniciar Sesión" : "Regístrate"}
                            </Button>
                        </Typography>
                    </Box>
                </Box>
            </Modal>
            <ForgotPasswordModal
                open={forgotPasswordOpen}
                onClose={() => setForgotPasswordOpen(false)}
            />
        </>
    );
}
