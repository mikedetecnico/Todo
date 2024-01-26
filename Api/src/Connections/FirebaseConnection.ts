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
            await this.db.collection(this.collectionName).doc().create({item});
            return item
        } catch (error: any) {
            throw new Error("Error adding entry");
        }
    }

    async delete(id: string): Promise<T> {
        const querySnapshot = await this.db.collection(this.collectionName).get();
        let entry : T | null = null;
        querySnapshot.forEach((doc) => {
            if(doc.data().item?.id == id) {
                entry = doc.data().item;
                doc.ref.delete();
            }
        });

        if (entry === null) {
            throw new Error("Entry not found");
        }

        return entry;
    }

    async getByUserId(userId: string): Promise<T[]> {
        const entries : T[] = [];

        try {
            const querySnapshot = await this.db.collection(this.collectionName).get();
        
            querySnapshot.forEach((doc) => {
                if(doc.data().item?.userId === userId) {
                    entries.push(doc.data().item);
                }
            });
        } catch (error: any) {
            throw new Error("Error getting entries");
        }

        return entries;
    }

    async update(patchedItem: T, id: string): Promise<T> {
        const querySnapshot = await this.db.collection(this.collectionName).get();

        let updatedItem : T | null = null;

        querySnapshot.forEach(async (doc) => {
            if(doc.data().item?.id == id) {
                let item = doc.data().item;
                item = {...item, ...patchedItem};
                updatedItem = item as T;
                await doc.ref.update({item});
            }
        });

        if (updatedItem === null) {
            throw new Error("Entry not found");
        }
        
        return updatedItem;
    }
}