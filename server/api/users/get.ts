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
        console.log(user)
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

        return ({statusMessage: doc.data() as User, statusCode: 200})
    } catch (error) {
        return {statusCode: 500, statusMessage: "[ERROR] Server Error"}
    }
});