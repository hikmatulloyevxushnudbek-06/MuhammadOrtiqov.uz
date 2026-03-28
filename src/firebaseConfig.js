import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "SIZNING_API_KEYINGIZ", // Buni Firebase Console'dan oling
  authDomain: "ortiqov-7fde7.firebaseapp.com",
  projectId: "ortiqov-7fde7",
  storageBucket: "ortiqov-7fde7.firebasestorage.app",
  messagingSenderId: "SIZNING_SENDER_ID",
  appId: "SIZNING_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);