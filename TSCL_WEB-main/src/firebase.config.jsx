// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClGUWxnX9aDysdUj9vVajqpgjWjHSh62Y",
  authDomain: "tscl-user.firebaseapp.com",
  projectId: "tscl-user",
  storageBucket: "tscl-user.firebasestorage.app",
  messagingSenderId: "242335280158",
  appId: "1:242335280158:web:4ff5ed75d96d5238c5d20f",
  measurementId: "G-QF8DYXNPVR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);