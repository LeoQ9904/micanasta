import { User } from "../interfaces/users/User";
import { api } from "./apiClient";

// Registrar nuevo usuario
export const registerUser = async (userData: User): Promise<User> => {
    const response = await api.post<User>("/customers", userData);
    return response.data;
};

// Obtener el perfil del usuario por Id de firebase
export const getUserByFirebaseUid = async (
    firebaseUid: string
): Promise<User> => {
    const response = await api.get<User>(`/customers/firebase/${firebaseUid}`);
    return response.data;
};

// Obtener perfil del usuario actual
export const getCurrentUser = async (): Promise<User> => {
    const response = await api.get<User>("/customers");
    return response.data;
};

// Actualizar perfil del usuario
export const updateProfile = async (userData: Partial<User>): Promise<User> => {
    const response = await api.put<User>("/customers", userData);
    return response.data;
};

// Cambiar contraseña
export const changePassword = async (
    oldPassword: string,
    newPassword: string
): Promise<void> => {
    await api.post("/user/change-password", { oldPassword, newPassword });
};
