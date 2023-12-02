import { toast } from "react-hot-toast";
import IAuth from "./IAuth";
import { useMutation } from "@tanstack/react-query";

export interface IAuthParams {
    email: string;
    password: string;
}   

export function useSignup(auth: IAuth) {
    const {mutate: signup, isPending} = useMutation({
        mutationFn: async (params: IAuthParams) => { await auth.signUp(params.email, params.password); },
        onSuccess: () => {
            toast.success(
            "Account successfully created! Please verufy the new account from the user's email address."
            );
        },
    });
    
    return { signup, isPending };
}