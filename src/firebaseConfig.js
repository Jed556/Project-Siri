import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "siri-proj.firebaseapp.com",
    projectId: "siri-proj",
    storageBucket: "siri-proj.firebasestorage.app",
    messagingSenderId: "374395662936",
    appId: "1:374395662936:web:f87881cf90b45f28ced02d",
    measurementId: "G-HEMGD31S5J",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
