// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-estate-327d2.firebaseapp.com",
  projectId: "mern-real-estate-327d2",
  storageBucket: "mern-real-estate-327d2.appspot.com",
  messagingSenderId: "943095389904",
  appId: "1:943095389904:web:18454e80e4bd7e0ddcc8d5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);