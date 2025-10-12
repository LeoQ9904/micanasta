"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../src/store/cartStore";
import { useAuthStore } from "../src/store/authStore";
import { useCurrencyFormat } from "../src/hooks/useCurrencyFormat";
import { registerOrder } from "../src/services/order.service";
import {
    Button,
    Card,
    CardContent,
    Radio,
    Typography,
    Box,
    Chip,
} from "@mui/material";
import { Add, Settings, Receipt } from "@mui/icons-material";
import { Address } from "../src/interfaces/users/Customer";
import HeaderPage from "../src/common/components/HeaderPage";
import ListItems from "../cart/components/ListItems";
import Order, { OrderStatus } from "../src/interfaces/otros/order";
import OrderConfirmationModal from "./components/OrderConfirmationModal";

export default function CheckoutPage() {
    const router = useRouter();
    const { getTotal, getDiscount, items, clearCart } = useCartStore();
    const { customer } = useAuthStore();
    const total = getTotal();
    const discount = getDiscount();
    const formatCurrency = useCurrencyFormat({ currency: "COP" });

    const [selectedAddress, setSelectedAddress] = useState<Address | null>(
        null
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [lastOrderNumber, setLastOrderNumber] = useState<
        number | undefined
    >();

    useEffect(() => {
        if (customer?.addresses) {
            const defaultAddr = customer.addresses.find(
                (addr) => addr.isDefault
            );
            setSelectedAddress(defaultAddr || customer.addresses[0] || null);
        }
    }, [customer]);

    const handleSubmit = async () => {
        if (!selectedAddress || !items.length || !customer) return;

        setIsSubmitting(true);

        try {
            const data: Order = {
                user_id: customer._id ?? "",
                items: items,
                status: OrderStatus.ACTIVE,
                address: selectedAddress,
                totalDiscount: discount,
                totalPrice: total,
            };

            const response = await registerOrder(data);

            // Limpiar el carrito después de crear el pedido exitosamente
            clearCart();

            // Generar número de pedido (puedes usar el ID del response si está disponible)
            const orderNumber = Math.floor(Math.random() * 1000) + 1;
            setLastOrderNumber(orderNumber);

            // Mostrar modal de confirmación
            setShowConfirmationModal(true);
        } catch (error) {
            console.error("Error al crear el pedido:", error);
            alert(
                "Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const addresses = customer?.addresses || [];

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            <HeaderPage
                title="Confirmación de pedido"
                Icon={<Receipt sx={{ mr: 1, color: "var(--primary)" }} />}
            />

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-2xl font-semibold">
                    Total a pagar: {formatCurrency(total)}
                </p>
                <p className="text-xl font-semibold">
                    Total de descuento: {formatCurrency(discount)}
                </p>
                <p className="text-sm text-gray-600">Pago contra entrega</p>
                <p>
                    <strong>Pedido con costo de envío CERO ($0) COP</strong>
                </p>
            </div>

            <Box>
                <ListItems />
            </Box>

            {addresses.length === 0 ? (
                <Card sx={{ textAlign: "center", py: 4, mb: 3 }}>
                    <CardContent>
                        <Typography
                            variant="h6"
                            color="text.secondary"
                            gutterBottom
                        >
                            No tienes direcciones guardadas
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => router.push("/profile")}
                            sx={{
                                mt: 2,
                                backgroundColor: "var(--primary)",
                                "&:hover": {
                                    backgroundColor: "var(--primary)",
                                },
                            }}
                        >
                            Agregar Dirección
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >
                        <Typography variant="h6">
                            Selecciona dirección de entrega
                        </Typography>
                        <Button
                            size="small"
                            startIcon={<Settings />}
                            onClick={() => router.push("/profile")}
                            sx={{ color: "var(--primary)" }}
                        >
                            Configurar direcciones
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            mb: 3,
                        }}
                    >
                        {addresses.map((address, index) => (
                            <Card
                                key={index}
                                sx={{
                                    border:
                                        selectedAddress === address
                                            ? "2px solid var(--primary)"
                                            : "1px solid #e0e0e0",
                                    cursor: "pointer",
                                }}
                                onClick={() => setSelectedAddress(address)}
                            >
                                <CardContent
                                    sx={{
                                        display: "flex",
                                        alignItems: "start",
                                        gap: 2,
                                    }}
                                >
                                    <Radio
                                        checked={selectedAddress === address}
                                        sx={{
                                            color: "var(--primary)",
                                            "&.Mui-checked": {
                                                color: "var(--primary)",
                                            },
                                        }}
                                    />
                                    <Box sx={{ flex: 1 }}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                gap: 1,
                                                mb: 1,
                                            }}
                                        >
                                            <Typography
                                                variant="body1"
                                                fontWeight="medium"
                                            >
                                                {address.street}
                                            </Typography>
                                            {address.isDefault && (
                                                <Chip
                                                    label="Predeterminada"
                                                    size="small"
                                                    sx={{
                                                        backgroundColor:
                                                            "var(--primary)",
                                                        color: "white",
                                                    }}
                                                />
                                            )}
                                        </Box>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {address.city}, {address.state}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>

                    <Button
                        variant="contained"
                        fullWidth
                        disabled={!selectedAddress || isSubmitting}
                        onClick={handleSubmit}
                        sx={{
                            height: 48,
                            fontSize: "1.125rem",
                            fontWeight: "bold",
                            backgroundColor: "var(--primary)",
                            "&:hover": { backgroundColor: "var(--primary)" },
                            "&:disabled": {
                                backgroundColor: "#cccccc",
                                color: "#666666",
                            },
                        }}
                    >
                        {isSubmitting
                            ? "Procesando pedido..."
                            : "Confirmar pedido"}
                    </Button>
                </>
            )}

            <OrderConfirmationModal
                open={showConfirmationModal}
                onClose={() => setShowConfirmationModal(false)}
                orderNumber={lastOrderNumber}
            />
        </div>
    );
}
