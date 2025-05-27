import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getAnalytics } from "firebase/analytics";
import { getRemoteConfig } from "firebase/remote-config";
import { getStorage } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check"

export default defineNuxtPlugin(async () => {
    let appId: string = "G-MBX6JF38Z4";
    let measurementId: string = "1:740503294886:web:789dd013e69242ca613567";

    const firebaseConfig = {
        apiKey: "AIzaSyBomeNtnzSimFOHdM33blfESkiQ5N3Jp1U",
        authDomain: "recap-9dbae.firebaseapp.com",
        projectId: "recap-9dbae",
        storageBucket: "recap-9dbae.firebasestorage.app",
        messagingSenderId: "995335293723",
        appId: "1:995335293723:web:e482c16d7b587bac36e1be"
    };
    let app;
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
        console.log('Firebase app initialized');
    } else {
        app = getApp();
        console.log('Using existing Firebase app');
    }
    const auth = getAuth(app);
    setPersistence(auth, browserSessionPersistence);
    const firestore = getFirestore(app);

    return {
        provide: {
            firebaseApp: app,
            auth,
            firestore
        }
    };

});