// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBw46mNH4Bm4rSKzLosrwblDdscNaEcwSE",
  authDomain: "asset-ease.firebaseapp.com",
  projectId: "asset-ease",
  storageBucket: "asset-ease.firebasestorage.app",
  messagingSenderId: "6169377232",
  appId: "1:6169377232:web:085ddc72a4dd36cf2321d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app