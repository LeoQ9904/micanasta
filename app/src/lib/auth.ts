import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import { auth } from "./firebase";
import { registerUser, getUserByFirebaseUid } from "../services/users.service";
import { User } from "../interfaces/users/User";

const googleProvider = new GoogleAuthProvider();

export const loginWithEmail = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await ensureUserInAPI(result.user);
    return result;
};

export const registerWithEmail = async (email: string, password: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await ensureUserInAPI(result.user);
    return result;
};

export const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    await ensureUserInAPI(result.user);
    return result;
};

export const resetPassword = async (email: string) => {
    return await sendPasswordResetEmail(auth, email);
};

const ensureUserInAPI = async (firebaseUser: any) => {
    try {
        await getUserByFirebaseUid(firebaseUser.uid);
    } catch {
        const userData: User = {
            firebaseUid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || '',
            phoneNumber: firebaseUser.phoneNumber || '',
            photoURL: firebaseUser.photoURL || '',
            isActive: true,
        };
        await registerUser(userData);
    }
};

export const logout = async () => {
    return await signOut(auth);
};
