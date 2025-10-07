import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signOut,
    UserCredential,
} from "firebase/auth";
import { auth } from "./firebase";
import {
    registerCustomer,
    getCustomerByFirebaseUid,
} from "../services/users.service";
import { User } from "../interfaces/users/User";
import { Customer } from "../interfaces/users/Customer";

const googleProvider = new GoogleAuthProvider();

/**
 * loginWithEmail, function para iniciar sesión con correo
 * @param email
 * @param password
 * @returns Info de Customer de la api
 */
export const loginWithEmail = async (
    email: string,
    password: string
): Promise<Customer> => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return await ensureUserInAPI(result.user);
};

/**
 * registerWithEmail, function para registrar al usuario por medio de correo
 * @param email
 * @param password
 * @returns Info de Customer de la api
 */
export const registerWithEmail = async (
    email: string,
    password: string
): Promise<Customer> => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return await ensureUserInAPI(result.user);
};

/**
 * loginWithGoogle, function que permite iniciar sesión con Google
 * @returns Retorna usuario de google UserCredential
 */
export const loginWithGoogle = async (): Promise<Customer> => {
    const result = await signInWithPopup(auth, googleProvider);
    return await ensureUserInAPI(result.user);
};

export const resetPassword = async (email: string) => {
    return await sendPasswordResetEmail(auth, email);
};

/**
 * ensureUserInAPI, function para validar si el usuario existe en la api o si no lo registra
 * @param firebaseUser
 */
const ensureUserInAPI = async (firebaseUser: any): Promise<Customer> => {
    try {
        return await getCustomerByFirebaseUid(firebaseUser.uid);
    } catch {
        const userData: User = {
            firebaseUid: firebaseUser.uid,
            email: firebaseUser.email || "",
            displayName: firebaseUser.displayName || "",
            phoneNumber: firebaseUser.phoneNumber || "",
            photoURL: firebaseUser.photoURL || "",
            isActive: true,
        };
        return await registerCustomer(userData);
    }
};

export const logout = async () => {
    return await signOut(auth);
};
