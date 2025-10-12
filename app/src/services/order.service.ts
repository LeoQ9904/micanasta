import Order from "../interfaces/otros/order";
import { api } from "./apiClient";

/**
 * registerOrder, function para registrar la orden
 * @param orderData Info de la orden
 * @returns Info de la orden
 */
export const registerOrder = async (orderData: Order): Promise<Order> => {
    const response = await api.post<Order>("/cart", orderData);
    return response.data;
};

/**
 * getOrderByIdUser, function para obtener el listado de las ordenes del cliente
 * @param user string id de customer
 * @returns listado de ordenes realizadas
 */
export const getOrderByIdUser = async (user: string): Promise<Order[]> => {
    const response = await api.get<Order[]>(`/cart/user/${user}`);
    return response.data;
};
