import { useServerAuth } from "~/server/utils/userServerAuth";
import { connectToFirestore } from "~/server/utils/connectToFirestore";
import type { User } from "~/types/User";

/**
 * Endpoint used for updating a user
 * 
 * @param {Event} - Nitro event object representing the request.
 * @returns {{statusCode: number, statusMessage: Object}} - Standard return format for all endpoints
 * 
 * Object returned will contain user information
 */
export default defineEventHandler(async (event) => {
  try {
    // Verifying request
    const user = await useServerAuth(event);
    if (!user) {
      console.error('[ERROR] Unauthorized');
      throw createError({ statusCode: 401, statusMessage: '[ERROR] Unauthorized' })
    }
    // Gathering params
    const body = await readBody(event);
    const uid: string = String(body.uid);
    const firstName: string = String(body.firstName);
    const lastName: string = String(body.lastName);
    const birthDate: string = String(body.birthDate);
    const interests: string = String(body.interests);

    // Creating list of interests
    const interestsList: string[] = interests.split(', ');

    // Formatting date to mm-dd-yyyy
    const date = birthDate.split('T')[0];
    const year = date.split('-')[0];
    const month = date.split('-')[1];
    const day = date.split('-')[2];
    const formattedBirthDate = `${month}-${day}-${year}`;

    // Updating user in firestore
    const db = connectToFirestore();
    await db.collection('Users').doc(uid).update({
      firstName: firstName,
      lastName: lastName,
      birthDate: formattedBirthDate,
      interests: interestsList,
    });

    // Getting new doc for error handling
    const doc = await db.collection('Users').doc(uid).get();

    // Error handling
    if (doc === undefined) {
      console.error('[ERROR] FIREBASE FAILED TO UPDATE USER INFO');
      throw createError({ statusCode: 501, statusMessage: '[ERROR] FIREBASE FAILED TO UPDATE USER INFO' });
    }

    return ({ statusMessage: doc.data(), statusCode: 200 })
  } catch (error) {
    console.error('[ERROR] FIREBASE FAILED TO CREATE USER INFO: ', error);
    throw createError({ statusCode: 500, statusMessage: "[ERROR] Server Error" })
  }
});