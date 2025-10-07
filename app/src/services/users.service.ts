import { Customer } from "@/app/src/interfaces/users/Customer";
import { User } from "../interfaces/users/User";
import { api } from "./apiClient";

/**
 * registerUser, function que registra un nuevo usuario en el servidor.
 * @param userData Los datos del usuario a registrar.
 * @returns Un objeto User con los datos del usuario registrado.
 */
export const registerUser = async (userData: User): Promise<User> => {
    const response = await api.post<User>("/customers", userData);
    return response.data;
};

/**
 * registerCustomer, function que registra un nuevo cliente en el servidor.
 * @param userData Los datos del cliente a registrar.
 * @returns Un objeto Customer con los datos del cliente registrado.
 */
export const registerCustomer = async (userData: User): Promise<Customer> => {
    const response = await api.post<Customer>("/customers", userData);
    return response.data;
};

/**
 * getUserByFirebaseUid, function que consulta un usuario por su UID de Firebase.
 * @param firebaseUid El UID de Firebase del usuario.
 * @returns Un objeto User con los datos del usuario.
 */
export const getUserByFirebaseUid = async (
    firebaseUid: string
): Promise<User> => {
    const response = await api.get<User>(`/customers/firebase/${firebaseUid}`);
    return response.data;
};

/**
 * getCustomerByFirebaseUid, function que consulta un cliente por su UID de Firebase.
 * @param firebaseUid El UID de Firebase del cliente.
 * @returns Un objeto Customer con los datos del cliente.
 */
export const getCustomerByFirebaseUid = async (
    firebaseUid: string
): Promise<Customer> => {
    const response = await api.get<Customer>(
        `/customers/firebase/${firebaseUid}`
    );
    return response.data;
};

// Obtener perfil del usuario actual
export const getCurrentUser = async (): Promise<User> => {
    const response = await api.get<User>("/customers");
    return response.data;
};

/**
 * updateProfile, function que actualiza el perfil del usuario actual.
 * @param userData Los datos del usuario a actualizar.
 * @param uid El UID de Firebase del usuario.
 * @param file Archivo opcional para actualizar el avatar.
 * @returns Un objeto Customer con los datos actualizados del usuario.
 */
export const updateProfile = async (
    userData: Partial<Customer>,
    uid: string,
    file?: File
): Promise<Customer> => {
    const data = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
        if (value !== undefined) {
            if (key === "addresses" && Array.isArray(value)) {
                data.append(key, JSON.stringify(value));
                return;
            }
            data.append(key, value as string);
        }
    });
    if (file) {
        data.append("image", file);
    }
    const response = await api.put<Customer>(
        `/customers/firebase/${uid}`,
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return response.data;
};

/**
 * changePassword, function que cambia la contraseña del usuario actual.
 * @param oldPassword La contraseña actual del usuario.
 * @param newPassword La nueva contraseña del usuario.
 */
export const changePassword = async (
    oldPassword: string,
    newPassword: string
): Promise<void> => {
    await api.post("/user/change-password", { oldPassword, newPassword });
};

/**
 * uploads, function que sube una imagen al servidor.
 * @param file El archivo de imagen a subir.
 */
export const uploads = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await api.post("/uploads/image", formData);
    console.log(response);
    return response.data;
};
