import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/**
 * Firebase Configuration
 * To be filled with the config from your Firebase Console.
 */
const firebaseConfig = {
  apiKey: "AIzaSyBZmHPTb7qSHQEcHbw_WBD-bnCOT6x6uRs",
  authDomain: "hetuwedsmeetu.firebaseapp.com",
  projectId: "hetuwedsmeetu",
  storageBucket: "hetuwedsmeetu.firebasestorage.app",
  messagingSenderId: "228775207252",
  appId: "1:228775207252:web:7c8ddf44c413c616d228c1",
  measurementId: "G-7XZNJMC1B7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore (Database)
export const db = getFirestore(app);

export default app;
