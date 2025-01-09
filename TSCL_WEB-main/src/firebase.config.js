// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQkH7coHpHCgoWc748UDjIw5P9ngDk-bk",
  authDomain: "maduraismartcity-85253.firebaseapp.com",
  projectId: "maduraismartcity-85253",
  storageBucket: "maduraismartcity-85253.firebasestorage.app",
  messagingSenderId: "983909293100",
  appId: "1:983909293100:web:e9232ea32ee4b6374dc589"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);