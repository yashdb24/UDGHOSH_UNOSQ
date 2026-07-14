import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPJyLwFTSVaBj9H3JyB81EdJaSE4hjluM",
  authDomain: "unosq-23-1.firebaseapp.com",
  databaseURL: "https://unosq-23-1-default-rtdb.firebaseio.com",
  projectId: "unosq-23-1",
  storageBucket: "unosq-23-1.firebasestorage.app",
  messagingSenderId: "842602193414",
  appId: "1:842602193414:web:5a67f90ba1cd1e041bd987",
  measurementId: "G-4GZNPN14WH"
};

// Next.js (SSR) requires checking if the app is already initialized to prevent errors during hot reloads
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
