import { IConnection } from "./IConnection";
import { collection, query, where, doc, addDoc, getDocs, deleteDoc, getFirestore, Firestore } from "firebase/firestore";
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
        await this.db.collection(this.collectionName).doc().create({item});
        return item
    }

    async delete(id: string): Promise<T | null> {
        const querySnapshot = await this.db.collection(this.collectionName).get();
        let entry : T | null = null;
        querySnapshot.forEach((doc) => {
            if(doc.data().item?.id == id) {
                entry = doc.data().item;
                doc.ref.delete();
            }
        });

        return entry;
    }

    async getByUserId(userId: string): Promise<T[]> {
        const entries : T[] = [];
        const querySnapshot = await this.db.collection(this.collectionName).get();
        
        querySnapshot.forEach((doc) => {
            if(doc.data().item?.userId === userId) {
                entries.push(doc.data().item);
            }
        });

        return entries;
    }
}