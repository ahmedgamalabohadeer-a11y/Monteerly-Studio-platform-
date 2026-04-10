// ⚡ MODERN FIREBASE LAYER (Phase 1)
// Wraps legacy Firebase without breaking it
// File: src/lib/firebase-modern.ts

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  Auth
} from 'firebase/auth';
import {
  getFirestore,
  connectFirestoreEmulator,
  Firestore,
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { getStorage, connectStorageEmulator, FirebaseStorage } from 'firebase/storage';

// ============ MODERN CONFIG (from env) ============
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

// ============ INIT (Only once) ============
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

// ============ DEV EMULATORS ============
if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_EMULATOR === 'true') {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
  } catch (error) {
    // Already connected
  }
}

// ============ AUTH WRAPPER (Non-Destructive) ============
export interface AuthResponse {
  success: boolean;
  user?: any;
  error?: string;
}

export async function modernSignUp(email: string, password: string, fullName: string): Promise<AuthResponse> {
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName: fullName });

    // Save to Firestore
    const userRef = doc(db, 'users', credential.user.uid);
    await setDoc(userRef, {
      uid: credential.user.uid,
      email: email,
      displayName: fullName,
      createdAt: new Date(),
      role: 'creator',
      subscription: 'free'
    }, { merge: true });

    return {
      success: true,
      user: {
        uid: credential.user.uid,
        email: credential.user.email,
        displayName: fullName
      }
    };
  } catch (error: any) {
    console.error('[Firebase] SignUp Error:', error);
    return {
      success: false,
      error: error.message || 'Sign up failed'
    };
  }
}

export async function modernSignIn(email: string, password: string): Promise<AuthResponse> {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const userRef = doc(db, 'users', credential.user.uid);
    const userSnap = await getDoc(userRef);

    return {
      success: true,
      user: {
        uid: credential.user.uid,
        email: credential.user.email,
        ...userSnap.data()
      }
    };
  } catch (error: any) {
    console.error('[Firebase] SignIn Error:', error);
    return {
      success: false,
      error: error.message || 'Sign in failed'
    };
  }
}

export async function modernSignOut(): Promise<AuthResponse> {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export default app;
