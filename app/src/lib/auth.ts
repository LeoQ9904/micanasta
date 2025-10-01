import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();

export const loginWithEmail = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmail = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
};

export const resetPassword = async (email: string) => {
    return await sendPasswordResetEmail(auth, email);
};

export const logout = async () => {
    return await signOut(auth);
};
