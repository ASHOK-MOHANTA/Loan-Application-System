// src/services/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCf7TCNEGE8pQ4wZlo_FBDrShcCg_g_-Nw",
  authDomain: "loan-application-system-5e151.firebaseapp.com",
  projectId: "loan-application-system-5e151",
  storageBucket: "loan-application-system-5e151.firebasestorage.app",
  messagingSenderId: "773894747797",
  appId: "1:773894747797:web:8ba9cdb42738922945cd9c",
  measurementId: "G-TBHS6R9VCS",
  databaseURL: "https://loan-application-system-5e151-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
export const storage = getStorage(app);

// export const auth = getAuth(app);
export const db = getFirestore(app);
export{auth,database}
export default app;