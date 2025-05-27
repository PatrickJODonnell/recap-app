import { auth } from "./admin";
import type { H3Event } from "h3";
import { useServerFirestore } from "../utils/useServerFirestore";

export const useServerAuth = async (event: H3Event) => {
  const headers = getHeaders(event);
  const authHeader = headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false as const;
  }
  const token = authHeader.split('Bearer ')[1];
  if (typeof token !== 'string') {
    return false as const;
  }
  const user = await auth.verifyIdToken(token).then(async (firebaseAuthUser) => {
    // can get the user from firestore if needed here to return it when using Fetch
    const userRef = useServerFirestore().Users.doc(firebaseAuthUser.uid);
    const userDoc = await userRef.get();
    if (!userDoc) {
      return false as const;
    }
    const userData = userDoc.data();
    return {
      userData: userData,
      firebaseAuthUser: firebaseAuthUser
    };
  }).catch(() => {
    return false as const;
  });
  return user;
}