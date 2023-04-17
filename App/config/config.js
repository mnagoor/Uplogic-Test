// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7iBTLLwTyduaKLIYgGSFgEX5CXgzUTvI",
  authDomain: "testuplogic-d8686.firebaseapp.com",
  databaseURL: "https://testuplogic-d8686-default-rtdb.firebaseio.com",
  projectId: "testuplogic-d8686",
  storageBucket: "testuplogic-d8686.appspot.com",
  messagingSenderId: "243168005642",
  appId: "1:243168005642:web:d32408bdade6b7861719f3",
  measurementId: "G-DTSLRWWD4N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
