import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import IAuth from "./IAuth";
import { auth } from "../firebase";
import { useQueryClient } from "@tanstack/react-query";

export default class FirebaseAuth implements IAuth {
    async signUp(email: string, password: string): Promise<void> {
        await createUserWithEmailAndPassword(auth, email, password);
    }

    async signIn(email: string, password: string): Promise<void> {
        await signInWithEmailAndPassword(auth, email, password)
    }

    async getCurrentUser(): Promise<void> {
        onAuthStateChanged(auth, (user) => {
            const queryClient = useQueryClient();
            if (user) {
                queryClient.setQueryData(['user'], user);
            } else {
                console.log("no user")
            }
        })
    }
}