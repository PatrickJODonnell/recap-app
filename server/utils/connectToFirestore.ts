import admin from "../utils/admin";

/**
 * Util used to connect to the firebase admin sdk
 * 
 * @returns {FirebaseFirestore.Firestore} - an instance of our firestore
 * 
 */
export const connectToFirestore = () => {
    const db = admin.app().firestore();
    return db;
}