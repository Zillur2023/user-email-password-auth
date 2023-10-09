// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNvngrWacdfa2ezbY8HqtTJIcfqfXA-mQ",
  authDomain: "user-email-password-auth-bc5a3.firebaseapp.com",
  projectId: "user-email-password-auth-bc5a3",
  storageBucket: "user-email-password-auth-bc5a3.appspot.com",
  messagingSenderId: "895345356908",
  appId: "1:895345356908:web:16bdf09143439d56d22849"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth