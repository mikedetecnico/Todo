export interface IConnection<T> {
    add(item: T): Promise<T>;
    delete(id: string): Promise<T | null>;
    getByUserId(userId: string): Promise<T[]> 
}