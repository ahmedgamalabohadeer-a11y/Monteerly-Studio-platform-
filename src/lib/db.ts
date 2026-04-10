import { db } from './firebase';
import { 
  collection, doc, getDoc, getDocs, setDoc, updateDoc, addDoc, deleteDoc, query, where 
} from 'firebase/firestore';

// Re-export db for API routes
export { db };

// Users
export const getUser = async (uid: string) => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const updateUser = async (uid: string, data: any) => {
  const docRef = doc(db, 'users', uid);
  await updateDoc(docRef, data);
};

// Projects
export const createProject = async (data: any) => {
  const colRef = collection(db, 'projects');
  return await addDoc(colRef, { ...data, createdAt: new Date() });
};

export const getProject = async (id: string) => {
  const docRef = doc(db, 'projects', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const updateProject = async (id: string, data: any) => {
  const docRef = doc(db, 'projects', id);
  await updateDoc(docRef, data);
};

// Wallet & Transactions
export const createTransaction = async (userId: string, data: any) => {
  const colRef = collection(db, 'transactions');
  return await addDoc(colRef, { userId, ...data, createdAt: new Date() });
};

export const getUserWallet = async (userId: string) => {
  const docRef = doc(db, 'wallets', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : { balance: 0, pending: 0 };
};
