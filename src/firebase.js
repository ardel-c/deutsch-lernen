import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "deutsch-lernen-9f1f2",
  appId: "1:78575737340:web:33ac1c0a71fb985f94fa79",
  storageBucket: "deutsch-lernen-9f1f2.firebasestorage.app",
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "deutsch-lernen-9f1f2.firebaseapp.com",
  messagingSenderId: "78575737340",
  measurementId: "G-GNM2M3HW2D",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({tabManager: persistentMultipleTabManager()})
});
export const googleProvider = new GoogleAuthProvider();
