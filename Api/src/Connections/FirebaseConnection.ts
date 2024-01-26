import { IConnection } from "./IConnection";
import * as admin from "firebase-admin";
import serviceAccount from '../../admin.json';

export class FirebaseConnection<T> implements IConnection<T> {
    readonly db: admin.firestore.Firestore;
    readonly collectionName: string;

    constructor(collectionName: string) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
        });
        this.db = admin.firestore();
        this.collectionName = collectionName;
    }

    async add(item: T): Promise<T> {
        try {
            const res = await this.db.collection(this.collectionName).add(item as any);
            (item as any).id = res.id;
            return item;
        } catch (error: any) {
            throw new Error("Error adding entry");
        }
    }

    async delete(id: string): Promise<T> {
        const entry = await this.db.collection(this.collectionName).doc(id);

        if (!entry) {
            throw new Error("Entry not found");
        }

        const doc = await entry.get();

        await entry.delete();

        return doc.data() as T;
    }

    async getByUserId(userId: string): Promise<T[]> {
        const entries : T[] = [];

        try {
            const querySnapshot = await this.db.collection(this.collectionName).get();
        
            querySnapshot.forEach((doc) => {
                if(doc.data().userId === userId) {
                    entries.push(doc.data() as T);
                }
            });
        } catch (error: any) {
            throw new Error("Error getting entries");
        }

        return entries;
    }

    async update(patchedItem: T, id: string): Promise<T> {
        const entry = await this.db.collection(this.collectionName).doc(id);

        if (!entry) {
            throw new Error("Entry not found");
        }

        await entry.update(patchedItem as any);

        return (await entry.get()).data() as T;
    }
}