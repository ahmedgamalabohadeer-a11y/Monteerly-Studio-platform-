import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { auth, googleProvider, db } from "./firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

// تسجيل الدخول
export const loginUser = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// إنشاء حساب جديد
export const registerUser = async (email: string, password: string, fullName: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, { displayName: fullName });

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    displayName: fullName,
    role: "user",
    createdAt: serverTimestamp(),
    plan: "free"
  });

  return userCredential;
};

// جوجل
export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result;
};

// خروج
export const logoutUser = () => {
  return firebaseSignOut(auth);
};
