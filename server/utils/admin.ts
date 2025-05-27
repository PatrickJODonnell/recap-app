import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const app = admin.initializeApp()
export const firestore = getFirestore(app);
export const auth = getAuth(app);
 
export default admin;