// Ejemplo de uso del apiClient
import { api, ApiResponse } from "./apiClient";

// Interfaces para tus modelos
interface Product {
    id: string;
    name: string;
    price: number;
    description?: string;
    categoryId: string;
    imageUrl?: string;
    stock: number;
}

interface Category {
    id: string;
    name: string;
    description?: string;
}

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

// Ejemplos de servicios usando el apiClient
export const productService = {
    // Obtener todos los productos
    getProducts: async (): Promise<Product[]> => {
        const response = await api.get<Product[]>("/products");
        return response.data;
    },

    // Obtener un producto por ID
    getProduct: async (id: string): Promise<Product> => {
        const response = await api.get<Product>(`/products/${id}`);
        return response.data;
    },

    // Crear un nuevo producto
    createProduct: async (
        productData: Omit<Product, "id">
    ): Promise<Product> => {
        const response = await api.post<Product>("/products", productData);
        return response.data;
    },

    // Actualizar un producto
    updateProduct: async (
        id: string,
        productData: Partial<Product>
    ): Promise<Product> => {
        const response = await api.put<Product>(`/products/${id}`, productData);
        return response.data;
    },

    // Eliminar un producto
    deleteProduct: async (id: string): Promise<void> => {
        await api.delete(`/products/${id}`);
    },

    // Obtener productos por categoría
    getProductsByCategory: async (categoryId: string): Promise<Product[]> => {
        const response = await api.get<Product[]>(
            `/products/category/${categoryId}`
        );
        return response.data;
    },
};

export const categoryService = {
    // Obtener todas las categorías
    getCategories: async (): Promise<Category[]> => {
        const response = await api.get<Category[]>("/categories");
        return response.data;
    },

    // Obtener una categoría por ID
    getCategory: async (id: string): Promise<Category> => {
        const response = await api.get<Category>(`/categories/${id}`);
        return response.data;
    },

    // Crear una nueva categoría
    createCategory: async (
        categoryData: Omit<Category, "id">
    ): Promise<Category> => {
        const response = await api.post<Category>("/categories", categoryData);
        return response.data;
    },
};

export const userService = {
    // Obtener perfil del usuario actual
    getCurrentUser: async (): Promise<User> => {
        const response = await api.get<User>("/user/profile");
        return response.data;
    },

    // Actualizar perfil del usuario
    updateProfile: async (userData: Partial<User>): Promise<User> => {
        const response = await api.put<User>("/user/profile", userData);
        return response.data;
    },

    // Cambiar contraseña
    changePassword: async (
        oldPassword: string,
        newPassword: string
    ): Promise<void> => {
        await api.post("/user/change-password", { oldPassword, newPassword });
    },
};

// Servicio de autenticación
export const authService = {
    // Login
    login: async (
        email: string,
        password: string
    ): Promise<{ user: User; token: string }> => {
        const response = await api.post<{ user: User; token: string }>(
            "/auth/login",
            { email, password }
        );
        return response.data;
    },

    // Registro
    register: async (userData: {
        email: string;
        password: string;
        name: string;
    }): Promise<{ user: User; token: string }> => {
        const response = await api.post<{ user: User; token: string }>(
            "/auth/register",
            userData
        );
        return response.data;
    },

    // Logout
    logout: async (): Promise<void> => {
        await api.post("/auth/logout");
    },

    // Refrescar token
    refreshToken: async (): Promise<{ token: string }> => {
        const response = await api.post<{ token: string }>("/auth/refresh");
        return response.data;
    },
};
