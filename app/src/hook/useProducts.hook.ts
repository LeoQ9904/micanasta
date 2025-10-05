import {
    getProducts,
    getProductPopular,
    getProductByCategory,
    getProductDiscounted,
    getProductsNew,
} from "@/app/src/services/productos.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IProduct } from "../interfaces/product/Product";
import { useProductStore } from "@/app/src/store/productStore";

// Hook para obtener todos los productos
export function useFindAllProducts() {
    const fetchProducts = useProductStore((state) => state.setProductos);
    return useQuery<IProduct[], Error>({
        queryKey: ["getFindAllProducts"],
        queryFn: async () => {
            const data = await getProducts();
            fetchProducts(data);
            return data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutos
        refetchOnWindowFocus: false,
    });
}

// Hook para obtener todos los productos
export function useFindAllProductsDestacados() {
    const fetchProducts = useProductStore((state) => state.setPopularProducts);
    return useQuery<IProduct[], Error>({
        queryKey: ["getFindAllProductsDestacados"],
        queryFn: async () => {
            const data = await getProductPopular();
            fetchProducts(data);
            return data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutos
        refetchOnWindowFocus: false,
    });
}

// Hook para obtener un producto por categoría
export function useFindProductByCategory(
    category: string,
    searchTerm?: string
) {
    return useQuery<IProduct[], Error>({
        queryKey: ["getProductByCategory", category, searchTerm],
        queryFn: () => getProductByCategory(category, searchTerm),
        enabled: !!category,
        staleTime: 1000 * 60 * 5, // 5 minutos
        refetchOnWindowFocus: false,
    });
}

// Hook para obtener el listado de productos con descuentos.
export function useFindProductDiscounted() {
    getProductDiscounted;
    return useQuery<IProduct[], Error>({
        queryKey: ["getProductDiscounted"],
        queryFn: () => getProductDiscounted(),
        staleTime: 1000 * 60 * 5, // 5 minutos
        refetchOnWindowFocus: false,
    });
}

// Hook para obtener el listado de productos con descuentos.
export function useFindProductsNews() {
    getProductsNew;
    return useQuery<IProduct[], Error>({
        queryKey: ["getProductsNew"],
        queryFn: () => getProductsNew(),
        staleTime: 1000 * 60 * 5, // 5 minutos
        refetchOnWindowFocus: false,
    });
}

// Hook para obtener un producto por ID (para implementar más adelante)
export function useFindProductById(id: string) {
    return useQuery<IProduct, Error>({
        queryKey: ["getProductById", id],
        queryFn: () => {
            // TODO: Implementar getProductById en el servicio
            throw new Error("Not implemented yet");
        },
        enabled: !!id, // Solo ejecuta si hay ID
        staleTime: 1000 * 60 * 5,
    });
}

// Hook para crear un producto (para implementar más adelante)
export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation<IProduct, Error, Omit<IProduct, "id">>({
        mutationFn: (productData) => {
            // TODO: Implementar createProduct en el servicio
            throw new Error("Not implemented yet");
        },
        onSuccess: () => {
            // Invalidar y refetch la lista de productos
            queryClient.invalidateQueries({ queryKey: ["getFindAllProducts"] });
        },
    });
}

// Hook para actualizar un producto (para implementar más adelante)
export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation<
        IProduct,
        Error,
        { id: string; data: Partial<IProduct> }
    >({
        mutationFn: ({ id, data }) => {
            // TODO: Implementar updateProduct en el servicio
            throw new Error("Not implemented yet");
        },
        onSuccess: (data, variables) => {
            // Invalidar queries relacionadas
            queryClient.invalidateQueries({ queryKey: ["getFindAllProducts"] });
            queryClient.invalidateQueries({
                queryKey: ["getProductById", variables.id],
            });
        },
    });
}

// Hook para eliminar un producto (para implementar más adelante)
export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: (id) => {
            // TODO: Implementar deleteProduct en el servicio
            throw new Error("Not implemented yet");
        },
        onSuccess: (_, productId) => {
            // Invalidar y refetch la lista de productos
            queryClient.invalidateQueries({ queryKey: ["getFindAllProducts"] });
            // Remover el producto específico del cache
            queryClient.removeQueries({
                queryKey: ["getProductById", productId],
            });
        },
    });
}
