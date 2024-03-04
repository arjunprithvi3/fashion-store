import { getFirestore } from "@firebase/firestore";
import { getStorage } from 'firebase/storage';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDOONnTaj3IAibqM5NnjcmID_j-xVhJnRc",
  authDomain: "fashion-store-1c658.firebaseapp.com",
  projectId: "fashion-store-1c658",
  storageBucket: "fashion-store-1c658.appspot.com",
  messagingSenderId: "978467648480",
  appId: "1:978467648480:web:dc763e7f3e05cffb93b185",
  measurementId: "G-D055L44SBS"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const imagedb = getStorage(app);
export const database = getFirestore(app);
export {auth,imagedb,db}
export default app;
