import type { CollectionReference } from "firebase-admin/firestore";
import type { User } from "../../types/User";
import { firestore } from "./admin";

/**
 * 
 * @returns Users object typing from Firestore
 */
export const useServerFirestore = () => {
  return {
    Users: firestore.collection('Users') as CollectionReference<User>,
   }
}