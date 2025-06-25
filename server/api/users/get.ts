import { useServerAuth } from "~/server/utils/userServerAuth";
import { connectToFirestore } from "~/server/utils/connectToFirestore";
import type { User } from "~/types/User";

/**
 * Endpoint used for gathering all user information
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
        const params = getQuery(event);
        const uid: string = String(params.uid);

        // Pulling user data
        const db = connectToFirestore();
        const userRef = db.collection('Users').doc(uid);
        const doc = await userRef.get();

        // Error handling
        if (doc === undefined) {
            console.error('[ERROR] FIREBASE FAILED TO PULL USER INFO');
            throw createError({statusCode: 501, statusMessage: '[ERROR] FIREBASE FAILED TO PULL USER INFO'})
        }

        //Creating returned dict
        const returnObj: User = {
            birthDate: doc.data()?.birthDate,
            email: doc.data()?.email,
            firstName: doc.data()?.firstName,
            lastName: doc.data()?.lastName,
            plan: doc.data()?.plan,
            signUpDate: doc.data()?.signUpDate,
            interests: doc.data()?.interests,
            uid: userRef.id,
        }

        return ({statusMessage: returnObj, statusCode: 200})
    } catch (error) {
        throw createError({statusCode: 500, statusMessage: "[ERROR] Server Error"})
    }
});