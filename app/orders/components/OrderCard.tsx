"use client";

import Order, { OrderStatus } from "../../src/interfaces/otros/order";
import { CartItem } from "../../src/store/cartStore";
import {
    CheckCircle,
    LocalShipping,
    Schedule,
    Cancel,
} from "@mui/icons-material";

interface OrderCardProps {
    order: Order;
    orderNumber: number;
}

export default function OrderCard({ order, orderNumber }: OrderCardProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
        }).format(amount);
    };

    const getOrderStatusInfo = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.ACTIVE:
                return {
                    icon: (
                        <LocalShipping
                            sx={{ color: "#16a34a", fontSize: 20 }}
                        />
                    ),
                    text: "Pedido Confirmado",
                    description:
                        "Tu pedido está siendo preparado para el envío",
                    bgColor: "bg-green-50",
                    borderColor: "border-green-400",
                    textColor: "text-green-700",
                    descColor: "text-green-600",
                };
            case OrderStatus.COMPLETED:
                return {
                    icon: (
                        <CheckCircle sx={{ color: "#16a34a", fontSize: 20 }} />
                    ),
                    text: "Pedido Completado",
                    description: "Tu pedido ha sido entregado exitosamente",
                    bgColor: "bg-blue-50",
                    borderColor: "border-blue-400",
                    textColor: "text-blue-700",
                    descColor: "text-blue-600",
                };
            case OrderStatus.CANCELLED:
                return {
                    icon: <Cancel sx={{ color: "#dc2626", fontSize: 20 }} />,
                    text: "Pedido Cancelado",
                    description: "Este pedido ha sido cancelado",
                    bgColor: "bg-red-50",
                    borderColor: "border-red-400",
                    textColor: "text-red-700",
                    descColor: "text-red-600",
                };
            default:
                return {
                    icon: <Schedule sx={{ color: "#f59e0b", fontSize: 20 }} />,
                    text: "Estado Desconocido",
                    description: "Estado del pedido no definido",
                    bgColor: "bg-yellow-50",
                    borderColor: "border-yellow-400",
                    textColor: "text-yellow-700",
                    descColor: "text-yellow-600",
                };
        }
    };

    const statusInfo = getOrderStatusInfo(order.status);

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
            {/* Header del pedido */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle sx={{ color: "#16a34a", fontSize: 24 }} />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            Pedido #{orderNumber.toString().padStart(3, "0")}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {order.items.length}{" "}
                            {order.items.length === 1
                                ? "producto"
                                : "productos"}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold text-green-600">
                        {formatCurrency(order.totalPrice)}
                    </p>
                    {order.totalDiscount > 0 && (
                        <p className="text-sm text-red-500">
                            Ahorro: {formatCurrency(order.totalDiscount)}
                        </p>
                    )}
                </div>
            </div>

            {/* Estado del pedido */}
            <div
                className={`mb-4 p-3 ${statusInfo.bgColor} rounded-md border-l-4 ${statusInfo.borderColor}`}
            >
                <div className="flex items-center gap-2">
                    {statusInfo.icon}
                    <span className={`${statusInfo.textColor} font-medium`}>
                        {statusInfo.text}
                    </span>
                </div>
                <p className={`${statusInfo.descColor} text-sm mt-1`}>
                    {statusInfo.description}
                </p>
            </div>

            {/* Dirección de entrega */}
            <div className="mb-4 p-3 bg-gray-50 rounded-md">
                <h4 className="font-semibold text-gray-700 mb-2">
                    Dirección de entrega:
                </h4>
                <p className="text-gray-600 text-sm">
                    {order.address.street}, {order.address.city}
                    {order.address.state && `, ${order.address.state}`}
                    {order.address.zipCode && ` - ${order.address.zipCode}`}
                </p>
            </div>

            {/* Lista de productos */}
            <div className="space-y-3">
                <h4 className="font-semibold text-gray-700">Productos:</h4>
                {order.items.map((item: CartItem, index: number) => (
                    <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                    >
                        <div className="flex-1">
                            <p className="font-medium text-gray-800">
                                {item.product.name}
                            </p>
                            <p className="text-sm text-gray-500">
                                Cantidad: {item.quantity}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-gray-800">
                                {formatCurrency(
                                    item.product.price *
                                        (1 - item.product.discount / 100) *
                                        item.quantity
                                )}
                            </p>
                            {item.product.discount > 0 && (
                                <p className="text-sm text-gray-500 line-through">
                                    {formatCurrency(
                                        item.product.price * item.quantity
                                    )}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Resumen */}
            <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">
                        Total del pedido:
                    </span>
                    <span className="text-xl font-bold text-green-600">
                        {formatCurrency(order.totalPrice)}
                    </span>
                </div>
            </div>
        </div>
    );
}
