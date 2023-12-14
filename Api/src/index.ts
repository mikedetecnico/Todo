import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { initializeApp } from "firebase/app";
import { collection, query, where, doc, addDoc, getDocs, deleteDoc, getFirestore } from "firebase/firestore";

const  firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID ,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};
const firebaseapp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseapp);

// Define the Todo interface
interface Todo {
  id: string;
  task: string;
  scheduledDate: string;
  completed: boolean;
  userId: string;
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/todos', async (req, res) => {
  const todo: Todo = {
    id: Math.random().toString(36),
    task: req.body.task,
    scheduledDate: req.body.scheduledDate,
    completed: false,
    userId: req.body.userId
  };

  await addDoc(collection(db, "Todos"), todo);

  res.status(201).json(todo);
});

app.get('/todos/:uid', async (req, res) => {
  const q = query(collection(db, "Todos"), where("userId", "==", req.body.uid));
  const querySnapshot = await getDocs(q);
  const fetchedData: Todo[] = [];
  querySnapshot.forEach((doc) => {
    fetchedData.push({ id: doc.id, ...doc.data() } as Todo);
  });

  res.status(201).json(fetchedData);
});

app.delete('/todos/:id', async (req, res) => {
  const deletedDoc = await deleteDoc(doc(db, "notes", req.body.id));
  res.status(201).json(deletedDoc);
});

app.listen(3000, () => console.log('Server is running on port 3000'));