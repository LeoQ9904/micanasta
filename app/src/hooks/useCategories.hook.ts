import { useQuery } from "@tanstack/react-query";
import { getFindAllCategories } from "../services/categories.service";
import { useProductStore } from "@/app/src/store/productStore";

export const useCategories = () => {
    const setCategories = useProductStore((state) => state.setCategories);

    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            let data = await getFindAllCategories();
            data = data.filter((item) => !item.parentId);
            setCategories(data);
            return data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutos
        refetchOnWindowFocus: false,
    });
};
