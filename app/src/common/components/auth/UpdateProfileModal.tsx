"use client";

import { useState, useRef } from "react";
import {
    Modal,
    Box,
    TextField,
    Button,
    Typography,
    IconButton,
    Avatar,
    CircularProgress,
    Alert,
} from "@mui/material";
import { Close, PhotoCamera } from "@mui/icons-material";
import { useAuthStore } from "@/app/src/store/authStore";
import { updateProfile } from "@/app/src/services/users.service";
import { Customer } from "@/app/src/interfaces/users/Customer";

interface UpdateProfileModalProps {
    open: boolean;
    onClose: () => void;
}

export default function UpdateProfileModal({
    open,
    onClose,
}: UpdateProfileModalProps) {
    // Store
    const { customer, setCustomer } = useAuthStore();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Estados locales
    const [displayName, setDisplayName] = useState(customer?.displayName || "");
    const [phoneNumber, setPhoneNumber] = useState(customer?.phoneNumber || "");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Manejar selección de archivo de avatar
    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Validar tipo de archivo
            if (!file.type.startsWith("image/")) {
                setError("Por favor selecciona un archivo de imagen válido");
                return;
            }

            // Validar tamaño (máximo 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError("La imagen no puede ser mayor a 5MB");
                return;
            }

            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            setError("");
        }
    };

    // Manejar click en avatar para abrir selector de archivo
    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    // Manejar envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!customer) {
            setError("No se encontró información del usuario");
            return;
        }

        setError("");
        setSuccess("");
        setIsUpdating(true);

        try {
            // Preparar datos para actualizar
            const updateData: Partial<Customer> = {
                displayName: displayName.trim(),
                phoneNumber: phoneNumber.trim(),
            };

            // Actualizar perfil (el servicio maneja la subida de imagen internamente)
            const updatedCustomer = await updateProfile(
                updateData,
                customer.firebaseUid,
                avatarFile || undefined
            );

            // Actualizar el store con los nuevos datos
            setCustomer(updatedCustomer);

            setSuccess("Perfil actualizado correctamente");

            // Cerrar modal después de 2 segundos
            setTimeout(() => {
                onClose();
                resetForm();
            }, 2000);
        } catch (error: any) {
            console.error("Error updating profile:", error);
            setError(
                error.response?.data?.message ||
                    "Error al actualizar el perfil. Inténtalo de nuevo."
            );
        } finally {
            setIsUpdating(false);
        }
    };

    // Resetear formulario
    const resetForm = () => {
        setDisplayName(customer?.displayName || "");
        setPhoneNumber(customer?.phoneNumber || "");
        setAvatarFile(null);
        setAvatarPreview(null);
        setError("");
        setSuccess("");
    };

    // Manejar cierre del modal
    const handleClose = () => {
        if (!isUpdating) {
            resetForm();
            onClose();
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "90vw", sm: 450 },
                    maxWidth: 450,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 24,
                    p: { xs: 3, sm: 4 },
                    maxHeight: "90vh",
                    overflow: "auto",
                }}
            >
                {/* Header */}
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
                        Actualizar Perfil
                    </Typography>
                    <IconButton onClick={handleClose} disabled={isUpdating}>
                        <Close />
                    </IconButton>
                </Box>

                {/* Avatar Section */}
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
                            src={avatarPreview || customer?.photoURL}
                            sx={{
                                width: 100,
                                height: 100,
                                cursor: "pointer",
                                border: "3px solid",
                                borderColor: "var(--primary)",
                            }}
                            onClick={handleAvatarClick}
                        >
                            {customer?.displayName?.charAt(0)?.toUpperCase()}
                        </Avatar>
                        <IconButton
                            sx={{
                                position: "absolute",
                                bottom: -5,
                                right: -5,
                                backgroundColor: "var(--primary)",
                                color: "white",
                                width: 35,
                                height: 35,
                                "&:hover": {
                                    backgroundColor: "var(--primary)",
                                    opacity: 0.9,
                                },
                            }}
                            onClick={handleAvatarClick}
                            disabled={isUpdating}
                        >
                            {isUpdating ? (
                                <CircularProgress size={20} color="inherit" />
                            ) : (
                                <PhotoCamera fontSize="small" />
                            )}
                        </IconButton>
                    </Box>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign="center"
                    >
                        Haz clic en la imagen para cambiar tu avatar
                        <br />
                        (Máximo 5MB - JPG, PNG, GIF)
                    </Typography>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleAvatarChange}
                        style={{ display: "none" }}
                    />
                </Box>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Email (read-only) */}
                    <TextField
                        fullWidth
                        label="Correo Electrónico"
                        value={customer?.email || ""}
                        margin="normal"
                        disabled
                        helperText="El correo electrónico no se puede modificar en esta versión"
                        sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#666",
                            },
                        }}
                    />

                    {/* Display Name */}
                    <TextField
                        fullWidth
                        label="Nombre de Usuario"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        margin="normal"
                        required
                        disabled={isUpdating}
                        placeholder="Ingresa tu nombre de usuario"
                    />

                    {/* Phone Number */}
                    <TextField
                        fullWidth
                        label="Número Telefónico"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        margin="normal"
                        disabled={isUpdating}
                        placeholder="Ej: +1234567890"
                        helperText="Incluye el código de país si es necesario"
                    />

                    {/* Error Message */}
                    {error && (
                        <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {/* Success Message */}
                    {success && (
                        <Alert severity="success" sx={{ mt: 2, mb: 2 }}>
                            {success}
                        </Alert>
                    )}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isUpdating || !displayName.trim()}
                        sx={{
                            mt: 3,
                            py: 1.5,
                            backgroundColor: "var(--primary)",
                            "&:hover": {
                                backgroundColor: "var(--primary)",
                                opacity: 0.9,
                            },
                            "&:disabled": {
                                backgroundColor: "#ccc",
                            },
                        }}
                    >
                        {isUpdating ? (
                            <>
                                <CircularProgress size={20} sx={{ mr: 1 }} />
                                Actualizando...
                            </>
                        ) : (
                            "Actualizar Perfil"
                        )}
                    </Button>

                    {/* Cancel Button */}
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleClose}
                        disabled={isUpdating}
                        sx={{
                            mt: 2,
                            borderColor: "#dadce0",
                            color: "#666",
                            "&:hover": {
                                backgroundColor: "#f8f9fa",
                                borderColor: "#dadce0",
                            },
                        }}
                    >
                        Cancelar
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}
