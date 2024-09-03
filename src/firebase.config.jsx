
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClGUWxnX9aDysdUj9vVajqpgjWjHSh62Y",
  authDomain: "tscl-user.firebaseapp.com",
  projectId: "tscl-user",
  storageBucket: "tscl-user.appspot.com",
  messagingSenderId: "242335280158",
  appId: "1:242335280158:web:4ff5ed75d96d5238c5d20f",
  measurementId: "G-QF8DYXNPVR"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth= getAuth(app);