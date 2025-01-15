// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-logo-c09f2.firebaseapp.com",
  projectId: "ai-logo-c09f2",
  storageBucket: "ai-logo-c09f2.firebasestorage.app",
  messagingSenderId: "151428093367",
  appId: "1:151428093367:web:7706d96ae06ed661e5c432",
  measurementId: "G-BHGFZ7G4G2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
