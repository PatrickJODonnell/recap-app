import { useServerAuth } from "~/server/utils/userServerAuth";
import { connectToFirestore } from "~/server/utils/connectToFirestore";
import type { User } from "~/types/User";

/**
 * Endpoint used for creating user
 * 
 * @param {Event} - Nitro event object representing the request.
 * @returns {{statusCode: number, statusMessage: Object}} - Standard return format for all endpoints
 * 
 * Object returned will contain user information
 */
export default defineEventHandler( async (event) => {
    try {
        // Verifying request
        const user = await useServerAuth(event);
        if (!user) {
            console.error('[ERROR] Unauthorized');
            throw createError({statusCode: 401, statusMessage: '[ERROR] Unauthorized'})
        }
        // Gathering params
        const body = await readBody(event);
        const uid: string = String(body.uid);
        const email: string = String(body.email);
        const today: Date = new Date();

        // Creating user in firestore
        const db = connectToFirestore();
        const newUser: User = {
            birthDate: null,
            email: email,
            firstName: null,
            lastName: null,
            plan: 'basic',
            signUpDate: `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}-${today.getFullYear()}`,
            interests: [],
            uid: uid,
        }

        await db.collection('Users').doc(uid).set(newUser);

        // Getting new doc for error handling
        const doc = await db.collection('Users').doc(uid).get();

        // Error handling
        if (doc === undefined) {
            console.error('[ERROR] FIREBASE FAILED TO CREATE USER INFO');
            throw createError({statusCode: 501, statusMessage: '[ERROR] FIREBASE FAILED TO CREATE USER INFO'});
        }

        return ({statusMessage: newUser, statusCode: 200})
    } catch (error) {
        console.error('[ERROR] FIREBASE FAILED TO CREATE USER INFO: ', error);
        throw createError({statusCode: 500, statusMessage: "[ERROR] Server Error"})
    }
});