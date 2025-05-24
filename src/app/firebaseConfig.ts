import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAD1CGsfOE27EQDHnmy1eWzv7wT5ZcfoBs",
  authDomain: "petguard-241ae.firebaseapp.com",
  projectId: "petguard-241ae",
  storageBucket: "petguard-241ae.firebasestorage.app",
  messagingSenderId: "281041292845",
  appId: "1:281041292845:web:5e4d30a8c13d36ac3372a4",
  measurementId: "G-9ZFT4YD905"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
