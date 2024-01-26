export interface IRepository<T> {
    add(item: T): Promise<T>;
    delete(id: string): Promise<T | null>;
    getByUserId(userId: string): Promise<T[]>;
    update(item: T, id: string): Promise<T>;
}