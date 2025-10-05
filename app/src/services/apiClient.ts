import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import { env } from "../config/env";

// Tipos para las respuestas de la API
export interface ApiResponse<T = any> {
    data: T;
    message?: string;
    status: number;
    success: boolean;
}

export interface ApiError {
    message: string;
    status: number;
    code?: string;
    details?: any;
}

// Configuración base del cliente axios
const apiClient: AxiosInstance = axios.create({
    baseURL: env.API_URL,
    timeout: env.API_TIMEOUT || 30000, // 30 segundos por defecto
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Interceptor para requests - agregar token de autenticación si existe
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Agregar token de autenticación si está disponible
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Log de la request en desarrollo
        if (env.IS_DEVELOPMENT) {
            console.log(
                `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`
            );
        }

        return config;
    },
    (error) => {
        console.error("❌ Request Error:", error);
        return Promise.reject(error);
    }
);

// Interceptor para responses - manejo de errores global
apiClient.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
        // Log de la response en desarrollo
        if (env.IS_DEVELOPMENT) {
            console.log(
                `✅ API Response: ${response.status} ${response.config.url}`
            );
        }

        return response;
    },
    (error) => {
        const errorMessage = handleApiError(error);

        // Log del error
        console.error("❌ API Error:", errorMessage);

        // Manejar errores de autenticación
        if (error.response?.status === 401) {
            handleUnauthorized();
        }

        return Promise.reject(errorMessage);
    }
);

// Función para obtener el token de autenticación
function getAuthToken(): string | null {
    // Aquí puedes integrar con tu store de autenticación (Zustand, localStorage, etc.)
    if (typeof window !== "undefined") {
        return (
            localStorage.getItem("authToken") ||
            sessionStorage.getItem("authToken")
        );
    }
    return null;
}

// Función para manejar errores de autenticación
function handleUnauthorized(): void {
    // Limpiar tokens
    if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("authToken");
    }

    // Redirigir al login o ejecutar logout
    // Aquí puedes integrar con tu store de autenticación
    console.warn("🔒 Token expired or invalid. Please login again.");
}

// Función para manejar errores de la API
function handleApiError(error: any): ApiError {
    if (error.response) {
        // Error con respuesta del servidor
        return {
            message: error.response.data?.message || "Error del servidor",
            status: error.response.status,
            code: error.response.data?.code,
            details: error.response.data,
        };
    } else if (error.request) {
        // Error de red o sin respuesta
        return {
            message: "Error de conexión. Verifica tu conexión a internet.",
            status: 0,
            code: "NETWORK_ERROR",
        };
    } else {
        // Error de configuración
        return {
            message: error.message || "Error desconocido",
            status: 0,
            code: "CONFIG_ERROR",
        };
    }
}

// Métodos de conveniencia para HTTP
export const api = {
    // GET request
    get: async <T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<ApiResponse<T>> => {
        const response = await apiClient.get<ApiResponse<T>>(url, config);
        return response.data;
    },

    // POST request
    post: async <T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<ApiResponse<T>> => {
        const response = await apiClient.post<ApiResponse<T>>(
            url,
            data,
            config
        );
        return response.data;
    },

    // PUT request
    put: async <T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<ApiResponse<T>> => {
        const response = await apiClient.put<ApiResponse<T>>(url, data, config);
        return response.data;
    },

    // PATCH request
    patch: async <T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<ApiResponse<T>> => {
        const response = await apiClient.patch<ApiResponse<T>>(
            url,
            data,
            config
        );
        return response.data;
    },

    // DELETE request
    delete: async <T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<ApiResponse<T>> => {
        const response = await apiClient.delete<ApiResponse<T>>(url, config);
        return response.data;
    },

    // Upload de archivos
    upload: async <T = any>(
        url: string,
        formData: FormData,
        config?: AxiosRequestConfig
    ): Promise<ApiResponse<T>> => {
        const response = await apiClient.post<ApiResponse<T>>(url, formData, {
            ...config,
            headers: {
                ...config?.headers,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },
};

// Exportar el cliente base para casos especiales
export default apiClient;

// Función para configurar el token manualmente
export const setAuthToken = (token: string): void => {
    if (typeof window !== "undefined") {
        localStorage.setItem("authToken", token);
    }
};

// Función para limpiar el token
export const clearAuthToken = (): void => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("authToken");
    }
};
