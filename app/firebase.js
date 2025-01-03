import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDkGZQPmFPVsSLEth7BuCj0-MveqKP9mEA",
    authDomain: "chat-app-b9d5a.firebaseapp.com",
    projectId: "chat-app-b9d5a",
    storageBucket: "chat-app-b9d5a.firebasestorage.app",
    messagingSenderId: "127269026077",
    appId: "1:127269026077:web:8727f294e7f7961a1849f4",
    measurementId: "G-6BVW1JCSDV"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
