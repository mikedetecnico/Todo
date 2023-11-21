export default interface IAuth {
    signUp(email: string, password: string): Promise<void>;
}