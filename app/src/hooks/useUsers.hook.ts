import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "../interfaces/users/User";
import { Customer } from "../interfaces/users/Customer";
import {
    registerUser,
    getCurrentUser,
    updateProfile,
    changePassword,
} from "../services/users.service";

export const useUsers = () => {
    const queryClient = useQueryClient();

    const currentUser = useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
    });

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        },
    });

    const updateProfileMutation = useMutation({
        mutationFn: ({
            userData,
            uid,
            file,
        }: {
            userData: Partial<Customer>;
            uid: string;
            file?: File;
        }) => updateProfile(userData, uid, file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        },
    });

    const changePasswordMutation = useMutation({
        mutationFn: ({
            oldPassword,
            newPassword,
        }: {
            oldPassword: string;
            newPassword: string;
        }) => changePassword(oldPassword, newPassword),
    });

    return {
        currentUser,
        register: registerMutation.mutate,
        updateProfile: updateProfileMutation.mutate,
        changePassword: changePasswordMutation.mutate,
        isRegistering: registerMutation.isPending,
        isUpdating: updateProfileMutation.isPending,
        isChangingPassword: changePasswordMutation.isPending,
        updateProfileError: updateProfileMutation.error,
        updateProfileSuccess: updateProfileMutation.isSuccess,
    };
};
