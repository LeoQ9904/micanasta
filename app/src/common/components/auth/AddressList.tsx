"use client";

import { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    IconButton,
    Button,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { Add, Edit, Delete, LocationOn, Home } from "@mui/icons-material";
import { useAuthStore } from "@/app/src/store/authStore";
import { updateProfile } from "@/app/src/services/users.service";
import { Address, Customer } from "@/app/src/interfaces/users/Customer";
import AddressModal from "./AddressModal";

export default function AddressList() {
    const { customer, setCustomer } = useAuthStore();
    const [addressModalOpen, setAddressModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [addressToDelete, setAddressToDelete] = useState(-1);
    const [isDeleting, setIsDeleting] = useState(false);

    const addresses = customer?.addresses || [];

    // Abrir modal para agregar nueva dirección
    const handleAddAddress = () => {
        setEditingAddress(null);
        setEditingIndex(-1);
        setAddressModalOpen(true);
    };

    // Abrir modal para editar dirección existente
    const handleEditAddress = (address: Address, index: number) => {
        setEditingAddress(address);
        setEditingIndex(index);
        setAddressModalOpen(true);
    };

    // Cerrar modal de dirección
    const handleCloseAddressModal = () => {
        setAddressModalOpen(false);
        setEditingAddress(null);
        setEditingIndex(-1);
    };

    // Confirmar eliminación de dirección
    const handleDeleteAddress = (index: number) => {
        setAddressToDelete(index);
        setDeleteDialogOpen(true);
    };

    // Eliminar dirección
    const confirmDeleteAddress = async () => {
        if (!customer || addressToDelete < 0) return;

        setIsDeleting(true);
        try {
            let updatedAddresses = [...addresses];
            const wasDefault = updatedAddresses[addressToDelete].isDefault;

            // Eliminar la dirección
            updatedAddresses.splice(addressToDelete, 1);

            // Si era la dirección por defecto y quedan direcciones, hacer la primera como default
            if (wasDefault && updatedAddresses.length > 0) {
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

            setCustomer(updatedCustomer);
            setDeleteDialogOpen(false);
            setAddressToDelete(-1);
        } catch (error) {
            console.error("Error deleting address:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    // Cancelar eliminación
    const cancelDeleteAddress = () => {
        setDeleteDialogOpen(false);
        setAddressToDelete(-1);
    };

    // Establecer dirección como predeterminada
    const setAsDefault = async (index: number) => {
        if (!customer) return;

        try {
            let updatedAddresses = [...addresses];

            // Desmarcar todas como default
            updatedAddresses = updatedAddresses.map((addr) => ({
                ...addr,
                isDefault: false,
            }));

            // Marcar la seleccionada como default
            updatedAddresses[index].isDefault = true;

            // Actualizar perfil
            const updateData: Partial<Customer> = {
                addresses: updatedAddresses,
            };

            const updatedCustomer = await updateProfile(
                updateData,
                customer.firebaseUid
            );

            setCustomer(updatedCustomer);
        } catch (error) {
            console.error("Error setting default address:", error);
        }
    };

    return (
        <Box>
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
                    <Typography variant="h6" fontWeight="bold">
                        Mis Direcciones
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleAddAddress}
                    sx={{
                        backgroundColor: "var(--primary)",
                        "&:hover": {
                            backgroundColor: "var(--primary)",
                            opacity: 0.9,
                        },
                    }}
                >
                    Agregar
                </Button>
            </Box>

            {/* Lista de direcciones */}
            {addresses.length === 0 ? (
                <Card sx={{ textAlign: "center", py: 4 }}>
                    <CardContent>
                        <LocationOn
                            sx={{ fontSize: 48, color: "#ccc", mb: 2 }}
                        />
                        <Typography
                            variant="h6"
                            color="text.secondary"
                            gutterBottom
                        >
                            No tienes direcciones guardadas
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 3 }}
                        >
                            Agrega una dirección para facilitar tus entregas
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={handleAddAddress}
                            sx={{
                                backgroundColor: "var(--primary)",
                                "&:hover": {
                                    backgroundColor: "var(--primary)",
                                    opacity: 0.9,
                                },
                            }}
                        >
                            Agregar Primera Dirección
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {addresses.map((address, index) => (
                        <Card
                            key={index}
                            sx={{
                                border: address.isDefault
                                    ? "2px solid var(--primary)"
                                    : "1px solid #e0e0e0",
                                position: "relative",
                            }}
                        >
                            <CardContent>
                                {/* Badge de dirección predeterminada */}
                                {address.isDefault && (
                                    <Chip
                                        icon={<Home />}
                                        label="Predeterminada"
                                        size="small"
                                        sx={{
                                            position: "absolute",
                                            top: 16,
                                            right: 16,
                                            backgroundColor: "var(--primary)",
                                            color: "white",
                                        }}
                                    />
                                )}

                                {/* Información de la dirección */}
                                <Box sx={{ pr: address.isDefault ? 10 : 0 }}>
                                    <Typography
                                        variant="body1"
                                        fontWeight="medium"
                                        gutterBottom
                                    >
                                        {address.street}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {address.city}, {address.state}{" "}
                                        {address.zipCode}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {address.country}
                                    </Typography>
                                </Box>

                                {/* Acciones */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        mt: 2,
                                    }}
                                >
                                    <Box sx={{ display: "flex", gap: 1 }}>
                                        {!address.isDefault && (
                                            <Button
                                                size="small"
                                                onClick={() =>
                                                    setAsDefault(index)
                                                }
                                                sx={{ color: "var(--primary)" }}
                                            >
                                                Hacer Predeterminada
                                            </Button>
                                        )}
                                    </Box>

                                    <Box>
                                        <IconButton
                                            size="small"
                                            onClick={() =>
                                                handleEditAddress(
                                                    address,
                                                    index
                                                )
                                            }
                                            sx={{ color: "var(--primary)" }}
                                        >
                                            <Edit fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() =>
                                                handleDeleteAddress(index)
                                            }
                                            sx={{ color: "error.main" }}
                                        >
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}

            {/* Modal de dirección */}
            <AddressModal
                open={addressModalOpen}
                onClose={handleCloseAddressModal}
                editingAddress={editingAddress}
                editingIndex={editingIndex}
            />

            {/* Dialog de confirmación de eliminación */}
            <Dialog open={deleteDialogOpen} onClose={cancelDeleteAddress}>
                <DialogTitle>¿Eliminar dirección?</DialogTitle>
                <DialogContent>
                    <Typography>
                        ¿Estás seguro de que quieres eliminar esta dirección?
                        Esta acción no se puede deshacer.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelDeleteAddress} disabled={isDeleting}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={confirmDeleteAddress}
                        color="error"
                        disabled={isDeleting}
                        variant="contained"
                    >
                        {isDeleting ? "Eliminando..." : "Eliminar"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
