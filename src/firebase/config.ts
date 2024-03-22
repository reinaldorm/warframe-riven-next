// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnhbKtBJhxMxj1t2GDfqu3Z2ZYXQnrlbo",
  authDomain: "warframe-riven-next.firebaseapp.com",
  projectId: "warframe-riven-next",
  storageBucket: "warframe-riven-next.appspot.com",
  messagingSenderId: "804745432774",
  appId: "1:804745432774:web:a8f54ff0425645507451c7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
