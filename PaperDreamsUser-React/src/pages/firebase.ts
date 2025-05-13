// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBzrf-muqu1JUKW1ZTaPQxATXt7TrAqvGk",
    authDomain: "invitationonline-9a46c.firebaseapp.com",
    projectId: "invitationonline-9a46c",
    storageBucket: "invitationonline-9a46c.firebasestorage.app",
    messagingSenderId: "565169769924",
    appId: "1:565169769924:web:94f07fa75ece348a606891",
    measurementId: "G-9QWL0R3QVD"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
