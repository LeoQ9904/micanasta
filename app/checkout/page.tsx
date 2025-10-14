"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../src/store/cartStore";
import { useAuthStore } from "../src/store/authStore";
import { useCurrencyFormat } from "../src/hooks/useCurrencyFormat";
import { registerOrder } from "../src/services/order.service";
import { sendEmailVerification } from "firebase/auth";
import {
    Button,
    Card,
    CardContent,
    Radio,
    Typography,
    Box,
    Chip,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { Add, Settings, Receipt } from "@mui/icons-material";
import { Address } from "../src/interfaces/users/Customer";
import HeaderPage from "../src/common/components/HeaderPage";
import ListItems from "../cart/components/ListItems";
import Order, { OrderStatus } from "../src/interfaces/otros/order";
import OrderConfirmationModal from "./components/OrderConfirmationModal";
import LoginModal from "../src/common/components/auth/LoginModal";

export default function CheckoutPage() {
    const router = useRouter();
    const { getTotal, getDiscount, items, clearCart } = useCartStore();
    const { customer, user } = useAuthStore();
    const total = getTotal();
    const discount = getDiscount();
    const formatCurrency = useCurrencyFormat({ currency: "COP" });

    const [selectedAddress, setSelectedAddress] = useState<Address | null>(
        null
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showEmailVerificationDialog, setShowEmailVerificationDialog] =
        useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
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
        // Validar que el usuario esté autenticado
        if (!user || !customer) {
            setShowLoginModal(true);
            return;
        }

        if (!selectedAddress || !items.length) return;

        // Validar que el email esté verificado
        if (!user.emailVerified) {
            setShowEmailVerificationDialog(true);
            return;
        }

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
            const orderNumber = response.numberOrder || 1;
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

    const handleSendVerificationEmail = async () => {
        if (user) {
            try {
                await sendEmailVerification(user);
                alert(
                    "Email de verificación enviado. Revisa tu bandeja de entrada y tu carpeta de spam."
                );
            } catch (error) {
                console.error("Error enviando email de verificación:", error);
                alert(
                    "Error al enviar el email de verificación. Inténtalo de nuevo."
                );
            }
        }
    };

    const addresses = customer?.addresses || [];

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            <HeaderPage
                title="Confirmación de pedido"
                Icon={<Receipt sx={{ mr: 1, color: "var(--primary)" }} />}
            />

            {/* Alerta de email no verificado */}
            {user && !user.emailVerified && (
                <Alert
                    severity="warning"
                    sx={{ mb: 3 }}
                    action={
                        <Button
                            color="inherit"
                            size="small"
                            onClick={handleSendVerificationEmail}
                        >
                            Verificar ahora
                        </Button>
                    }
                >
                    <Typography variant="body2">
                        Tu email no está verificado. Debes verificar tu email
                        para poder realizar pedidos.
                    </Typography>
                </Alert>
            )}

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

            {!user || !customer ? (
                <Card sx={{ textAlign: "center", py: 4, mb: 3 }}>
                    <CardContent>
                        <Typography
                            variant="h6"
                            color="text.secondary"
                            gutterBottom
                        >
                            Debes iniciar sesión para continuar
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 2 }}
                        >
                            Para realizar un pedido necesitas tener una cuenta y
                            estar autenticado.
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => setShowLoginModal(true)}
                            sx={{
                                mt: 2,
                                backgroundColor: "var(--primary)",
                                "&:hover": {
                                    backgroundColor: "var(--primary)",
                                },
                            }}
                        >
                            Iniciar Sesión
                        </Button>
                    </CardContent>
                </Card>
            ) : addresses.length === 0 ? (
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
                        disabled={
                            !user ||
                            !customer ||
                            !selectedAddress ||
                            isSubmitting ||
                            (user && !user.emailVerified)
                        }
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
                        {!user || !customer
                            ? "Inicia sesión para continuar"
                            : isSubmitting
                              ? "Procesando pedido..."
                              : !user?.emailVerified
                                ? "Verifica tu email para continuar"
                                : "Confirmar pedido"}
                    </Button>
                </>
            )}

            <OrderConfirmationModal
                open={showConfirmationModal}
                onClose={() => {
                    router.push("/");
                    setShowConfirmationModal(false);
                }}
                orderNumber={lastOrderNumber}
            />

            {/* Modal de Login */}
            <LoginModal
                open={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />

            {/* Diálogo de verificación de email */}
            <Dialog
                open={showEmailVerificationDialog}
                onClose={() => setShowEmailVerificationDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Email no verificado</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Para continuar con tu pedido, necesitas verificar tu
                        dirección de email.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Te enviaremos un email de verificación a{" "}
                        <strong>{customer?.email}</strong>. Revisa tu bandeja de
                        entrada y tu carpeta de spam.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 1 }}>
                    <Button
                        onClick={() => setShowEmailVerificationDialog(false)}
                        color="inherit"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={() => {
                            handleSendVerificationEmail();
                            setShowEmailVerificationDialog(false);
                        }}
                        variant="contained"
                        sx={{
                            backgroundColor: "var(--primary)",
                            "&:hover": { backgroundColor: "var(--primary)" },
                        }}
                    >
                        Enviar verificación
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
