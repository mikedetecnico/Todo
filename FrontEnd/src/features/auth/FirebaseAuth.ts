import { User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import IAuth from "./IAuth";
import { auth } from "../../firebase";

export default class FirebaseAuth implements IAuth {
    async signUp(email: string, password: string, firstName: string, lastName: string): Promise<void> {
        await createUserWithEmailAndPassword(auth, email, password);

        if (auth.currentUser) {
            await updateProfile(auth.currentUser, {displayName: `${firstName} ${lastName}`});
        }
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

    async signOut(): Promise<void> {
        await auth.signOut();
    }
}