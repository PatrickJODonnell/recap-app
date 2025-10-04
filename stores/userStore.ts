import type { User } from "~/types/User";
import { onSnapshot, query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDb } from '../composables/useDb';

export const useUserStore = defineStore("UserStore", () => {
    const birthDate = ref<string | null>(null);
    const email = ref<string | null>(null);
    const firstName = ref<string | null>(null);
    const lastName = ref<string | null>(null);
    const plan = ref<string | null>(null);
    const signUpDate = ref<string | null>(null);
    const interests = ref<string[]>([]);
    const uid = ref<string | null>(null);

    let unsubscribe: (() => void) | null = null;

    const clearStore = () => {
        birthDate.value = null;
        email.value = null;
        firstName.value = null;
        lastName.value = null;
        plan.value = null;
        signUpDate.value = null;
        interests.value = [];
        uid.value = null;

        // Stop Firestore listener
        if (unsubscribe) {
            unsubscribe();
            unsubscribe = null;
        }
    }

    // Initialize Firestore listener
    async function initFirestoreListener(userId: string) {
        const db = useDb();
        const usersCollection = db.users;
        const userQuery = query(usersCollection, where('uid', '==', userId));

        // Set up a Firestore real-time listener
        unsubscribe = onSnapshot(userQuery, (querySnapshot) => {

            if (!querySnapshot.empty && querySnapshot.docs[0] !== undefined) {
                // Assuming only one document matches the query
                const userDoc = querySnapshot.docs[0];
                const data = userDoc.data();

                console.log('data', data);

                // Update store state
                birthDate.value = data.birthDate;
                email.value = data.email;
                firstName.value = data.firstName;
                lastName.value = data.lastName;
                plan.value = data.plan;
                signUpDate.value = data.signUpDate;
                interests.value = data.interests;
                uid.value = data.uid;
            } else {
                console.warn("User document does not exist for the given UID!");
            }
        }, (error) => {
            console.error('Error in User Firestore listener:', error);
        });
    }

    // Initialize the onAuthStateChanged listener (re-adds the firestore listener when auth state is regained)
    function initializeAuthListener() {
        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            console.log('auth state changed', user);
            if (user) {
                initFirestoreListener(user.uid);
            } else {
                console.warn("No user authenticated, clearing store.");
                clearStore();
            }
        });
    }

    const populateStore = (data: User) => {
        birthDate.value = data.birthDate;
        email.value = data.email;
        firstName.value = data.firstName;
        lastName.value = data.lastName;
        plan.value = data.plan;
        signUpDate.value = data.signUpDate;
        interests.value = data.interests;
        uid.value = data.uid;
        initializeAuthListener();
    }

    return {
        birthDate,
        email,
        firstName,
        lastName,
        plan,
        signUpDate,
        interests,
        uid,
        clearStore,
        populateStore,
        initializeAuthListener
    };
}, {
    persist: true,
});