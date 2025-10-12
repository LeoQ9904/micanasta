"use client";

import { useState, useEffect } from "react";
import {
    Modal,
    Box,
    TextField,
    Button,
    Typography,
    IconButton,
    Switch,
    FormControlLabel,
    Alert,
    CircularProgress,
} from "@mui/material";
import { Close, LocationOn, Add } from "@mui/icons-material";
import { useAuthStore } from "@/app/src/store/authStore";
import { updateProfile } from "@/app/src/services/users.service";
import { Address, Customer } from "@/app/src/interfaces/users/Customer";

interface AddressModalProps {
    open: boolean;
    onClose: () => void;
    editingAddress?: Address | null;
    editingIndex?: number;
}

export default function AddressModal({
    open,
    onClose,
    editingAddress = null,
    editingIndex = -1,
}: AddressModalProps) {
    const { customer, setCustomer } = useAuthStore();

    // Estados del formulario
    const [formData, setFormData] = useState<Address>({
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        isDefault: false,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Cargar datos si estamos editando
    useEffect(() => {
        if (editingAddress) {
            setFormData(editingAddress);
        } else {
            // Si no hay direcciones, marcar como default automáticamente
            const hasNoAddresses =
                !customer?.addresses || customer.addresses.length === 0;
            setFormData({
                street: "",
                city: "",
                state: "",
                zipCode: "",
                country: "",
                isDefault: hasNoAddresses,
            });
        }
    }, [editingAddress, customer?.addresses, open]);

    // Manejar cambios en los campos
    const handleChange =
        (field: keyof Address) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value =
                field === "isDefault"
                    ? event.target.checked
                    : event.target.value;
            setFormData((prev) => ({
                ...prev,
                [field]: value,
            }));
        };

    // Validar formulario
    const validateForm = (): boolean => {
        if (!formData.street.trim()) {
            setError("La dirección es requerida");
            return false;
        }
        if (!formData.city.trim()) {
            setError("La ciudad es requerida");
            return false;
        }
        if (!formData.state.trim()) {
            setError("El estado/provincia es requerido");
            return false;
        }
        return true;
    };

    // Manejar envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!customer) {
            setError("No se encontró información del usuario");
            return;
        }

        if (!validateForm()) {
            return;
        }

        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            let updatedAddresses = [...(customer.addresses || [])];

            // Si se marca como default, desmarcar las demás
            if (formData.isDefault) {
                updatedAddresses = updatedAddresses.map((addr) => ({
                    ...addr,
                    isDefault: false,
                }));
            }

            if (editingIndex >= 0) {
                // Editando dirección existente
                updatedAddresses[editingIndex] = formData;
            } else {
                // Agregando nueva dirección
                updatedAddresses.push(formData);
            }

            // Asegurar que al menos una dirección sea default si hay direcciones
            if (
                updatedAddresses.length > 0 &&
                !updatedAddresses.some((addr) => addr.isDefault)
            ) {
                updatedAddresses[0].isDefault = true;
            }

            // Actualizar perfil
            const updateData: Partial<Customer> = {
                addresses: updatedAddresses,
            };

            const updatedCustomer = await updateProfile(
                updateData,
                customer.firebaseUid
            );

            // Actualizar el store
            setCustomer(updatedCustomer);

            setSuccess(
                editingIndex >= 0
                    ? "Dirección actualizada correctamente"
                    : "Dirección agregada correctamente"
            );

            // Cerrar modal después de 1.5 segundos
            setTimeout(() => {
                handleClose();
            }, 1500);
        } catch (error: any) {
            console.error("Error saving address:", error);
            setError(
                error.response?.data?.message ||
                    "Error al guardar la dirección. Inténtalo de nuevo."
            );
        } finally {
            setIsLoading(false);
        }
    };

    // Manejar cierre del modal
    const handleClose = () => {
        if (!isLoading) {
            setFormData({
                street: "",
                city: "",
                state: "",
                zipCode: "",
                country: "",
                isDefault: false,
            });
            setError("");
            setSuccess("");
            onClose();
        }
    };

    const isEditing = editingIndex >= 0;

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "90vw", sm: 500 },
                    maxWidth: 500,
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
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <LocationOn sx={{ color: "var(--primary)" }} />
                        <Typography
                            variant="h5"
                            component="h2"
                            fontWeight="bold"
                            sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
                        >
                            {isEditing
                                ? "Editar Dirección"
                                : "Agregar Dirección"}
                        </Typography>
                    </Box>
                    <IconButton onClick={handleClose} disabled={isLoading}>
                        <Close />
                    </IconButton>
                </Box>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        {/* Street Address */}
                        <TextField
                            fullWidth
                            label="Dirección *"
                            value={formData.street}
                            onChange={handleChange("street")}
                            disabled={isLoading}
                            placeholder="Ej: Av. Principal 123, Edificio A, Apto 4B"
                            multiline
                            rows={2}
                        />

                        {/* City and State */}
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                flexDirection: { xs: "column", sm: "row" },
                            }}
                        >
                            <TextField
                                fullWidth
                                label="Ciudad *"
                                value={formData.city}
                                onChange={handleChange("city")}
                                disabled={isLoading}
                                placeholder="Ej: Bucaramanga"
                            />
                            <TextField
                                fullWidth
                                label="Departamento *"
                                value={formData.state}
                                onChange={handleChange("state")}
                                disabled={isLoading}
                                placeholder="Ej: Santander"
                            />
                        </Box>

                        {/* Default Address Switch */}
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.isDefault}
                                    onChange={handleChange("isDefault")}
                                    disabled={isLoading}
                                    sx={{
                                        "& .MuiSwitch-switchBase.Mui-checked": {
                                            color: "var(--primary)",
                                        },
                                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                            {
                                                backgroundColor:
                                                    "var(--primary)",
                                            },
                                    }}
                                />
                            }
                            label={
                                <Box>
                                    <Typography
                                        variant="body1"
                                        fontWeight="medium"
                                    >
                                        Dirección predeterminada
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Esta será tu dirección principal para
                                        entregas
                                    </Typography>
                                </Box>
                            }
                        />
                    </Box>

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

                    {/* Action Buttons */}
                    <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isLoading}
                            startIcon={isEditing ? <LocationOn /> : <Add />}
                            sx={{
                                flex: 1,
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
                            {isLoading ? (
                                <>
                                    <CircularProgress
                                        size={20}
                                        sx={{ mr: 1 }}
                                    />
                                    {isEditing
                                        ? "Actualizando..."
                                        : "Guardando..."}
                                </>
                            ) : isEditing ? (
                                "Actualizar Dirección"
                            ) : (
                                "Agregar Dirección"
                            )}
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={handleClose}
                            disabled={isLoading}
                            sx={{
                                flex: 1,
                                py: 1.5,
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
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}
