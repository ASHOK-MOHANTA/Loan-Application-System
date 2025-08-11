// utils/getUserRole.js
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export const getUserRole = async (uid) => {
  try {
    if (!uid) return null;
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const data = userDocSnap.data();
      return data.role || null; // return "pending", "manager", "admin" or "user"
    }
    return null;
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
};
