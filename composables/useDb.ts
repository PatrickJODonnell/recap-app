import { collection, type CollectionReference, getFirestore } from 'firebase/firestore';
import type { User } from '~/types/User';

export function useDb() {
  const db = getFirestore();
  return {
    users: collection(db, 'Users') as CollectionReference<User>,
  }
};