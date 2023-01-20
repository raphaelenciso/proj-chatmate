// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAixZ6eIBeU8uTc8cyMAzssQWVjicZG8fo",
  authDomain: "chat-app-98c79.firebaseapp.com",
  projectId: "chat-app-98c79",
  storageBucket: "chat-app-98c79.appspot.com",
  messagingSenderId: "215060404636",
  appId: "1:215060404636:web:8f681562c4004599d49059",
  measurementId: "G-SFTL0CZEQ8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
