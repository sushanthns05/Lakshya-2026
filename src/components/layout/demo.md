

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9j_6EJZe-rOe3NGx-7wjW1_aQ6PNNQ3Q",
  authDomain: "lakshya-2026-e5b9b.firebaseapp.com",
  projectId: "lakshya-2026-e5b9b",
  storageBucket: "lakshya-2026-e5b9b.firebasestorage.app",
  messagingSenderId: "286329306127",
  appId: "1:286329306127:web:dc8b2dfcfa7cdbc37c377a",
  measurementId: "G-WRP5DZ5F42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);