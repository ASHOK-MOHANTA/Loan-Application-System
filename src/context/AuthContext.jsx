// utils/getUserRole.js
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../service/firebaseConfig';

export const getUserRole = async (uid) => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (userDoc.exists()) {
    return userDoc.data().role;
  } else {
    return null;
  }
};
