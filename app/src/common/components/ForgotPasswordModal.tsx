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

interface ForgotPasswordModalProps {
    open: boolean;
    onClose: () => void;
}

export default function ForgotPasswordModal({
    open,
    onClose,
}: ForgotPasswordModalProps) {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Reset password for:", email);
        onClose();
    };

    return (
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
                        Recuperar Contraseña
                    </Typography>
                    <IconButton onClick={onClose}>
                        <Close />
                    </IconButton>
                </Box>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    Ingresa tu email y te enviaremos un enlace para restablecer
                    tu contraseña.
                </Typography>

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
                        Enviar Enlace
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}
