import { User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import IAuth from "./IAuth";
import { auth } from "../firebase";

export default class FirebaseAuth implements IAuth {
    async signUp(email: string, password: string): Promise<void> {
        await createUserWithEmailAndPassword(auth, email, password);
    }

    async signIn(email: string, password: string): Promise<void> {
        await signInWithEmailAndPassword(auth, email, password)
    }

    async getCurrentUser(): Promise<User | null> {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("user found");
            } else {
                console.log("no user");
            }
        })

        return auth.currentUser;
    }
}