export default interface IAuth {
    signUp(email: string, password: string): Promise<void>;

    signIn(email: string, password: string): Promise<void>;
}