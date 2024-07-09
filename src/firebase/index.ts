import { initializeApp } from "firebase/app";
import { getDatabase } from "@firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDxOkHQ8lRW-sNYDmlWLkdD9QMF4-B12I0",
  authDomain: "board-dcb26.firebaseapp.com",
  projectId: "board-dcb26",
  storageBucket: "board-dcb26.appspot.com",
  messagingSenderId: "195587381352",
  appId: "1:195587381352:web:b6fcbbdfe0a8c2faad43dd",
  measurementId: "G-H8Q9HY217T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);