import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBlCs8iIlsSGwcz7h_cwtdyASchpUYSzro",
  authDomain: "agency-c7a0f.firebaseapp.com",
  projectId: "agency-c7a0f",
  storageBucket: "agency-c7a0f.firebasestorage.app",
  messagingSenderId: "206001569414",
  appId: "1:206001569414:web:d0d41e5ad7d9aadb641b07",
  measurementId: "G-JBQ6W96G3Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { 
  auth, 
  db, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged 
};