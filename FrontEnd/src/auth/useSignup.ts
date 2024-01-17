import { toast } from "react-hot-toast";
import IAuth from "./IAuth";
import { useMutation } from "@tanstack/react-query";

export interface IAuthParams {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}   

export function useSignup(auth: IAuth) {
    const {mutate: signup, isPending} = useMutation({
        mutationFn: async (params: IAuthParams) => { await auth.signUp(params.email, params.password, params.firstName, params.lastName); },
        onSuccess: () => {
            toast.success(
            "Account successfully created! Please verufy the new account from the user's email address."
            );
        },
        onError: (error: Error) => {
            if (error.message.includes("email-already-in-use")) {
                toast.error("The email address is already in use by another account");
            } else {
                toast.error("An error occurred creating the account");
            }
        }
    });
    
    return { signup, isPending };
}