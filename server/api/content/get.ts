import { useServerAuth } from "~/server/utils/userServerAuth";
import { connectToFirestore } from "~/server/utils/connectToFirestore";
import type { Content } from "~/types/Content";

/**
 * Endpoint used for gathering all content info
 * 
 * @param {Event} - Nitro event object representing the request.
 * @returns {{statusCode: number, statusMessage: Object}} - Standard return format for all endpoints
 * 
 * Object returned will contain content assigned to the user
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
        const contentSnapshot = db.collection('Newsletters').where('userId', '==', uid);
        const contentObjs = await contentSnapshot.get();
        try {
            const contentObj = contentObjs.docs[0];
            const contentData = contentObj.data();
            const content: Content = {
                userId: contentData.userId,
                webFinalSummaries: contentData.webFinalSummaries,
                webLinks: contentData.webLinks,
                youtubeFinalSummaries: contentData.youtubeFinalSummaries,
                youtubeLinks: contentData.youtubeLinks
            }
            return({statusCode: 200, statusMessage: content})
        } catch {
            return({statusCode: 204, statusMessage: null})
        }
    } catch (error) {
        throw createError({statusCode: 500, statusMessage: "[ERROR] Server Error"})
    }
});