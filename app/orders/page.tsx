"use client";

import { useAuthStore } from "../src/store/authStore";
import { useEffect, useState } from "react";
import Order from "../src/interfaces/otros/order";
import LoadingComponent from "../src/common/components/LoadingComponent";
import EmptyOrdersComponent from "./components/EmptyOrdersComponent";
import OrderCard from "@/app/orders/components/OrderCard";
import { getOrderByIdUser } from "../src/services/order.service";

export default function OrdersPage() {
    const { customer } = useAuthStore();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!customer?._id) {
                setLoading(true);
                return;
            }

            try {
                setLoading(true);
                const fetchedOrders = await getOrderByIdUser(customer._id);
                setOrders(fetchedOrders);
            } catch (err) {
                console.error("Error al cargar pedidos:", err);
                setError("Error al cargar los pedidos");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [customer]);

    if (loading) {
        return <LoadingComponent message="Cargando tus pedidos..." />;
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center text-red-600">
                    <h2 className="text-xl font-semibold mb-2">Error</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!customer) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">
                        Acceso restringido
                    </h2>
                    <p>Debes iniciar sesión para ver tus pedidos.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Mis Pedidos
                </h1>
                <p className="text-gray-600">
                    Revisa el historial de tus pedidos realizados
                </p>
            </div>

            {orders.length === 0 ? (
                <EmptyOrdersComponent />
            ) : (
                <div className="space-y-6">
                    {orders.map((order, index) => (
                        <OrderCard
                            key={index}
                            order={order}
                            orderNumber={index + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
