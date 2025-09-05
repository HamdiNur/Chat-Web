import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAeFsUuxpgyltojOFd30iWs4jUpG9hEdZA",
  authDomain: "chat-3501e.firebaseapp.com",
  projectId: "chat-3501e",
  storageBucket: "chat-3501e.firebasestorage.app",
  messagingSenderId: "625233650879",
  appId: "1:625233650879:web:528225f2751f5b12e6920a"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db=getFirestore();
