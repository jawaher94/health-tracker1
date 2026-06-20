// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSBpVFuu-J2ozRmSHcsqaxcZFY7Kru_s4",
  authDomain: "healthdashboard-e28b1.firebaseapp.com",
  projectId: "healthdashboard-e28b1",
  storageBucket: "healthdashboard-e28b1.firebasestorage.app",
  messagingSenderId: "128291787416",
  appId: "1:128291787416:web:2d371271ed0fe218e036ed"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
