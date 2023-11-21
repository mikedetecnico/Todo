import { createUserWithEmailAndPassword } from "firebase/auth";
import IAuth from "./IAuth";
import { auth } from "../firebase";

export default class FirebaseAuth implements IAuth {
    async signUp(email: string, password: string): Promise<void> {
        await createUserWithEmailAndPassword(auth, email, password)
    }
}