"use client";

import {
    Dialog,
    DialogContent,
    Typography,
    Button,
    Box,
    Fade,
} from "@mui/material";
import { CheckCircle, LocalShipping } from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface OrderConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    orderNumber?: number;
}

export default function OrderConfirmationModal({
    open,
    onClose,
    orderNumber,
}: OrderConfirmationModalProps) {
    const router = useRouter();

    const handleViewOrders = () => {
        onClose();
        router.push("/orders");
    };

    const handleContinueShopping = () => {
        onClose();
        router.push("/products");
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    padding: 2,
                },
            }}
        >
            <DialogContent sx={{ textAlign: "center", py: 4 }}>
                <Fade in={open} timeout={500}>
                    <Box>
                        {/* Icono de éxito */}
                        <Box sx={{ mb: 3 }}>
                            <Box
                                sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: "50%",
                                    backgroundColor: "#e8f5e8",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "0 auto",
                                    mb: 2,
                                }}
                            >
                                <CheckCircle
                                    sx={{
                                        fontSize: 50,
                                        color: "#4caf50",
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* Título */}
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            color="#2e7d32"
                            gutterBottom
                        >
                            ¡Pedido Confirmado!
                        </Typography>

                        {/* Número de pedido */}
                        {orderNumber && (
                            <Typography
                                variant="h6"
                                color="text.secondary"
                                gutterBottom
                            >
                                Pedido #
                                {orderNumber.toString().padStart(3, "0")}
                            </Typography>
                        )}

                        {/* Mensaje de estado */}
                        <Box
                            sx={{
                                backgroundColor: "#e8f5e8",
                                borderRadius: 2,
                                p: 2,
                                mb: 3,
                                border: "1px solid #c8e6c9",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 1,
                                    mb: 1,
                                }}
                            >
                                <LocalShipping sx={{ color: "#4caf50" }} />
                                <Typography
                                    variant="body1"
                                    fontWeight="medium"
                                    color="#2e7d32"
                                >
                                    En proceso de entrega
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="#2e7d32">
                                Tu pedido está siendo preparado y pronto estará
                                en camino. Te enviaremos actualizaciones sobre
                                el estado de tu entrega.
                            </Typography>
                        </Box>

                        {/* Información adicional */}
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 4 }}
                        >
                            Gracias por tu compra. Recibirás una confirmación
                            por email con todos los detalles de tu pedido.
                        </Typography>

                        {/* Botones de acción */}
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                flexDirection: { xs: "column", sm: "row" },
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={handleViewOrders}
                                sx={{
                                    flex: 1,
                                    backgroundColor: "var(--primary)",
                                    "&:hover": {
                                        backgroundColor: "var(--primary)",
                                        opacity: 0.9,
                                    },
                                }}
                            >
                                Ver mis pedidos
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={handleContinueShopping}
                                sx={{
                                    flex: 1,
                                    borderColor: "var(--primary)",
                                    color: "var(--primary)",
                                    "&:hover": {
                                        borderColor: "var(--primary)",
                                        backgroundColor:
                                            "rgba(var(--primary-rgb), 0.1)",
                                    },
                                }}
                            >
                                Seguir comprando
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </DialogContent>
        </Dialog>
    );
}
