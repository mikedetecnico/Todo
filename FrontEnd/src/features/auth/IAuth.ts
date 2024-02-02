import { User } from "firebase/auth";

export default interface IAuth {
    signUp(email: string, password: string, firstName: string, lastName: string): Promise<void>;

    signIn(email: string, password: string): Promise<void>;

    getCurrentUser(): Promise<User | null> ;

    signOut(): Promise<void>;
}