import { IConnection } from "./IConnection";
import { initializeApp } from "firebase/app";
import { collection, query, where, doc, addDoc, getDocs, deleteDoc, getFirestore, Firestore } from "firebase/firestore";

export class FirebaseConnection<T> implements IConnection<T> {
    readonly db: Firestore;
    readonly collectionName: string;

    constructor(collectionName: string) {
        const  firebaseConfig = {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            projectId: process.env.FIREBASE_PROJECT_ID ,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID
        };

        const firebaseapp = initializeApp(firebaseConfig);
        this.db = getFirestore(firebaseapp);
        this.collectionName = collectionName;
    }

    async add(item: T): Promise<T> {
        await addDoc(collection(this.db, this.collectionName), item as any);

        return item
    }

    async delete(id: string): Promise<T> {
        const deletedDoc = await deleteDoc(doc(this.db, this.collectionName, id));
        return deletedDoc as T;
    }

    async getByUserId(userId: string): Promise<T[]> {
        const q = query(collection(this.db, this.collectionName), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const fetchedData: T[] = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push({ id: doc.id, ...doc.data() } as T);
        });

        return fetchedData;
    }
}