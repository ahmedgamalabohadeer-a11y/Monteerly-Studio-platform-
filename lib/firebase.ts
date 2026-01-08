import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkQg0OpIah84-dsC3OQDKWIn1soJACFb0",
  authDomain: "monteerly-studio.firebaseapp.com",
  databaseURL: "https://monteerly-studio-default-rtdb.firebaseio.com",
  projectId: "monteerly-studio",
  storageBucket: "monteerly-studio.firebasestorage.app",
  messagingSenderId: "79891455687",
  appId: "1:79891455687:web:b7a01b2770f899e054a8e2",
  measurementId: "G-Y5MNPK3K4Y",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export async function signUpWithEmail(email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const userRef = doc(db, "users", cred.user.uid);
  await setDoc(
    userRef,
    {
      email: cred.user.email,
      createdAt: new Date(),
    },
    { merge: true }
  );
  return cred.user;
}

export function signInWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  const userRef = doc(db, "users", result.user.uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) {
    await setDoc(
      userRef,
      {
        email: result.user.email,
        createdAt: new Date(),
      },
      { merge: true }
    );
  }
  return result.user;
}

export function logout() {
  return signOut(auth);
}
