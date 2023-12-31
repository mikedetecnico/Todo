export interface IConnection<T> {
    add(item: T): Promise<T>;
    delete(id: string): Promise<T>;
    getByUserId(userId: string): Promise<T[]> 
}