import { auth } from './firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';

export const signInUser = async (data: any) => {
  return await signInWithEmailAndPassword(auth, data.email, data.password);
};

export const registerUser = async (data: any) => {
  return await createUserWithEmailAndPassword(auth, data.email, data.password);
};

export const signOutUser = async () => {
  return await signOut(auth);
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

// Alias for API routes compatibility
export const getUserSession = getCurrentUser;

################################################################################