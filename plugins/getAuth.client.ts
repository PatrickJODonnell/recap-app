/**
 * 
 * This plugin initializes after the firebase.client.ts and is used to add both auth listeners and firestore
 * listeners to all data stores that need refreshing from firebase throughout the app.
 * 
 * The auth lister ensures that all components pause rendering content until the auth state is regained (due to some wonky firebase stuff)
 * The firestore listener will live update pinia stores when something in firebase is changed.
 * 
 */
export default defineNuxtPlugin(() => {
  const userStore = useUserStore();

  // Initialize the auth state listener when the app starts
  userStore.initializeAuthListener();
});