// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "white-cedar-426610-g5.firebaseapp.com",
  projectId: "white-cedar-426610-g5",
  storageBucket: "white-cedar-426610-g5.appspot.com",
  messagingSenderId: "640112388981",
  appId: "1:640112388981:web:f3af5b2eb803ab34ea813c",
  measurementId: "G-Z6GMWZ4N0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app ;
