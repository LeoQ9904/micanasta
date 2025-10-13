import { CartItem } from "../../store/cartStore";
import { Address } from "../users/Customer";

export enum OrderStatus {
    ACTIVE = "active",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
}

export default interface Order {
    user_id: string;
    items: CartItem[];
    address: Address;
    status: OrderStatus;
    totalDiscount: number;
    totalPrice: number;
    numberOrder?: number;
}
