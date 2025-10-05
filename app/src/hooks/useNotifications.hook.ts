import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../services/notifications.service";
import { Notification } from "@/app/src/interfaces/otros/notification";

export function useFetchNotifications() {
    return useQuery<Notification[], Error>({
        queryKey: ["fetchNotifications"],
        queryFn: async () => {
            const data = await getNotifications();
            return data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutos
        refetchOnWindowFocus: false,
    });
}
