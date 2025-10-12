import Order from "../interfaces/otros/order";
import {
    registerOrder,
    getOrderByIdUser,
} from "@/app/src/services/order.service";

// Hook para registrar una orden
export async function useRegisterOrder(order: Order) {
    const data = await registerOrder(order);
    console.log(data);
}

export async function useGetOrderByIdUser(userId: string): Promise<Order[]> {
    const orders = await getOrderByIdUser(userId);
    return orders;
}
