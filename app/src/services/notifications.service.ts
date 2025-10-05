import { api } from "./apiClient";
import { Notification } from "@/app/src/interfaces/otros/notification";

// Obtener notificaciones
export const getNotifications = async (): Promise<Notification[]> => {
    const response = await api.get<Notification[]>("/notifications");
    return response.data;
};
