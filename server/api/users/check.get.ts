import { connectToFirestore } from "~/server/utils/connectToFirestore";

/**
 * Endpoint used for checking if a user with a certain email exists
 * 
 * @param {Event} - Nitro event object representing the request.
 * @returns {{statusCode: number, statusMessage: Object}} - Standard return format for all endpoints
 * 
 * Object returned will be a bool
 */
export default defineEventHandler( async (event) => {
    try {
        // Gathering params
        const params = getQuery(event);
        const email: string = String(params.email);

        // Pulling user data
        const db = connectToFirestore();
        const queryResult = await db.collection('Users').where("email", "==", email).count().get();
        const count = queryResult.data().count

        // Generating result
        let result: boolean = false;
        if (count > 0) {
            result = true;
        }

        return ({statusMessage: result, statusCode: 200})
    } catch (error) {
        throw createError({statusCode: 500, statusMessage: "[ERROR] Server Error"})
    }
});